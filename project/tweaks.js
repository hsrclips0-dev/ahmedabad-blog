// Shared color theme tweak — persists via localStorage + integrates with host editmode

(function() {
  const THEMES = ['warm', 'cool', 'mono'];
  const KEY = 'ahm-theme';

  function applyTheme(t) {
    if (!THEMES.includes(t)) t = 'warm';
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem(KEY, t);
    document.querySelectorAll('.theme-option').forEach(el => {
      el.classList.toggle('active', el.dataset.theme === t);
    });
  }

  // initial
  const saved = localStorage.getItem(KEY) || 'warm';
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(saved);
    mountTweaks();
  });

  function mountTweaks() {
    if (document.querySelector('.tweaks-fab')) return;

    const fab = document.createElement('button');
    fab.className = 'tweaks-fab';
    fab.innerHTML = '✦';
    fab.title = 'Tweaks';
    document.body.appendChild(fab);

    const panel = document.createElement('div');
    panel.className = 'tweaks-panel';
    panel.innerHTML = `
      <h5>Color Theme</h5>
      <div class="theme-options">
        <button class="theme-option" data-theme="warm">
          <div class="swatch-row"><span style="background:#F5F0E6"></span><span style="background:#C5421B"></span><span style="background:#1A1612"></span></div>
          Warm
        </button>
        <button class="theme-option" data-theme="cool">
          <div class="swatch-row"><span style="background:#EEF1F2"></span><span style="background:#2A3A5C"></span><span style="background:#0F1A24"></span></div>
          Cool
        </button>
        <button class="theme-option" data-theme="mono">
          <div class="swatch-row"><span style="background:#F2F1EE"></span><span style="background:#6B6B6B"></span><span style="background:#111111"></span></div>
          Mono
        </button>
      </div>
    `;
    document.body.appendChild(panel);

    fab.addEventListener('click', () => {
      panel.classList.toggle('open');
    });

    panel.querySelectorAll('.theme-option').forEach(btn => {
      btn.addEventListener('click', () => {
        applyTheme(btn.dataset.theme);
      });
    });

    // Apply current
    applyTheme(localStorage.getItem(KEY) || 'warm');
  }

  // Edit-mode integration with host
  window.addEventListener('message', (e) => {
    if (!e.data || !e.data.type) return;
    if (e.data.type === '__activate_edit_mode') {
      document.querySelector('.tweaks-panel')?.classList.add('open');
    }
    if (e.data.type === '__deactivate_edit_mode') {
      document.querySelector('.tweaks-panel')?.classList.remove('open');
    }
  });

  // signal availability AFTER listener is registered
  setTimeout(() => {
    window.parent.postMessage({type: '__edit_mode_available'}, '*');
  }, 100);
})();
