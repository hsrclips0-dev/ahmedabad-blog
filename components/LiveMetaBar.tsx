'use client'

import { useEffect, useState } from 'react'

interface WeatherState {
  temp: number
  desc: string
}

function wmoToDesc(code: number): string {
  if (code === 0) return 'clear'
  if (code <= 3) return 'partly cloudy'
  if (code <= 48) return 'foggy'
  if (code <= 57) return 'drizzle'
  if (code <= 67) return 'rainy'
  if (code <= 77) return 'cold'
  if (code <= 82) return 'showers'
  return 'stormy'
}

export default function LiveMetaBar() {
  const [mounted, setMounted] = useState(false)
  const [now, setNow] = useState<Date>(new Date())
  const [weather, setWeather] = useState<WeatherState | null>(null)

  useEffect(() => {
    setMounted(true)
    const tick = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(tick)
  }, [])

  useEffect(() => {
    const fetchWeather = () => {
      fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=23.0225&longitude=72.5714&current=temperature_2m,weathercode&timezone=Asia%2FKolkata'
      )
        .then((r) => r.json())
        .then((d) => {
          setWeather({
            temp: Math.round(d.current.temperature_2m),
            desc: wmoToDesc(d.current.weathercode),
          })
        })
        .catch(() => {})
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, 15 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return (
      <>
        <span>Ahmedabad</span>
        <span className="muted">—</span>
      </>
    )
  }

  const dateStr = now.toLocaleDateString('en-IN', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

  const timeStr = now.toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <>
      <span>{dateStr} · {timeStr} IST</span>
      {weather && (
        <span className="muted">{weather.temp}°C, {weather.desc}</span>
      )}
    </>
  )
}
