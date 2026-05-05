'use client'

import { useEffect, useRef, useState } from 'react'

type Theme = 'warm' | 'cool' | 'mono'

const THEMES: { id: Theme; label: string; swatches: string[] }[] = [
  { id: 'warm', label: 'Warm', swatches: ['#F5F0E6', '#C5421B', '#1A1612'] },
  { id: 'cool', label: 'Cool', swatches: ['#EEF1F2', '#2A3A5C', '#0F1A24'] },
  { id: 'mono', label: 'Mono', swatches: ['#F2F1EE', '#6B6B6B', '#111111'] },
]

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>('warm')
  const panelRef = useRef<HTMLDivElement>(null)
  const fabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const t =
      (document.documentElement.getAttribute('data-theme') as Theme) ||
      (localStorage.getItem('ahm-theme') as Theme) ||
      'warm'
    setTheme(t)
  }, [])

  useEffect(() => {
    if (!open) return
    function handler(e: MouseEvent) {
      const target = e.target as Node
      if (!panelRef.current?.contains(target) && !fabRef.current?.contains(target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  function applyTheme(t: Theme) {
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('ahm-theme', t)
    setTheme(t)
  }

  return (
    <>
      <button
        ref={fabRef}
        className="tweaks-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label="Color theme"
        title="Tweaks"
      >
        ✦
      </button>

      <div ref={panelRef} className={`tweaks-panel ${open ? 'open' : ''}`}>
        <h5>Color Theme</h5>
        <div className="theme-options">
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={`theme-option ${theme === t.id ? 'active' : ''}`}
              onClick={() => applyTheme(t.id)}
            >
              <div className="swatch-row">
                {t.swatches.map((s, i) => (
                  <span key={i} style={{ background: s }} />
                ))}
              </div>
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
