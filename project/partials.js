// Shared masthead + footer for ahmedabad.blog

window.AHM_PARTIALS = {
  masthead(activeCat) {
    const cats = window.AHM_DATA.categories;
    const navItems = cats.map(c =>
      `<a href="category.html?cat=${c.slug}" class="${activeCat === c.slug ? 'active' : ''}">${c.name}</a>`
    ).join('');

    return `
    <header class="masthead">
      <div class="container-wide">
        <div class="masthead-top">
          <div class="left">
            <span>Mon · 05 May 2026</span>
            <span class="muted">28°C, hazy</span>
          </div>
          <div class="right">
            <a href="advertise.html">Advertise</a>
            <a href="#">Newsletter</a>
            <a href="#">Submit a Tip</a>
          </div>
        </div>
        <div class="wordmark-row">
          <a href="index.html" class="wordmark">
            <span>ahmedabad<span class="dot"></span></span><span class="tld">blog</span>
            <span class="gj">અમદાવાદ</span>
          </a>
          <div class="issue-meta">
            <div><span class="num">${window.AHM_DATA.issue.num}</span></div>
            <div>${window.AHM_DATA.issue.date}</div>
          </div>
        </div>
        <nav class="nav-cats">
          <a href="index.html" class="${!activeCat ? 'active' : ''}">The Index</a>
          ${navItems}
        </nav>
      </div>
    </header>
    `;
  },

  footer() {
    return `
    <footer class="site-footer">
      <div class="container-wide">
        <div class="footer-grid">
          <div>
            <div class="footer-wordmark">
              ahmedabad<span class="tld">.blog</span>
            </div>
            <p class="footer-tagline">A curated guide to the city — written by people who actually live here. We rank, we visit, we don't take money for rankings.</p>
          </div>
          <div>
            <h4>Sections</h4>
            <ul>
              <li><a href="category.html?cat=cafes">Cafés</a></li>
              <li><a href="category.html?cat=coworking">Coworking</a></li>
              <li><a href="category.html?cat=restaurants">Restaurants</a></li>
              <li><a href="category.html?cat=weekend">Weekend</a></li>
            </ul>
          </div>
          <div>
            <h4>For Businesses</h4>
            <ul>
              <li><a href="advertise.html">Get Featured</a></li>
              <li><a href="advertise.html#leads">Buy Leads</a></li>
              <li><a href="advertise.html#claim">Claim a Listing</a></li>
              <li><a href="advertise.html#rates">Rate Card</a></li>
            </ul>
          </div>
          <div>
            <h4>About</h4>
            <ul>
              <li><a href="#">Our Method</a></li>
              <li><a href="#">Editorial Standards</a></li>
              <li><a href="#">The Team</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 ahmedabad.blog · made in અમદાવાદ</span>
          <span>ISSN 3024-1188</span>
        </div>
      </div>
    </footer>
    `;
  }
};
