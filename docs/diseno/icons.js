(function () {
  if (customElements.get('fv-icon')) return;
  const pending = new Set();
  function toKey(n) { return n.replace(/(^|-)([a-z0-9])/g, (m, a, b) => b.toUpperCase()); }
  function paint(el) {
    if (!window.lucide || !window.lucide.icons) { pending.add(el); return; }
    const node = window.lucide.icons[toKey(el.getAttribute('name') || '')];
    if (!node) return;
    const svg = window.lucide.createElement(node);
    const s = el.getAttribute('size') || '18';
    svg.setAttribute('width', s); svg.setAttribute('height', s);
    svg.setAttribute('stroke-width', el.getAttribute('stroke') || '1.75');
    svg.style.display = 'block';
    const root = el.shadowRoot || el.attachShadow({ mode: 'open' });
    root.replaceChildren(svg);
  }
  (function wait() {
    if (window.lucide && window.lucide.icons) { pending.forEach(paint); pending.clear(); }
    else setTimeout(wait, 60);
  })();
  customElements.define('fv-icon', class extends HTMLElement {
    static get observedAttributes() { return ['name', 'size', 'stroke']; }
    connectedCallback() { this.style.display = 'inline-flex'; this.style.flexShrink = '0'; paint(this); }
    attributeChangedCallback() { if (this.isConnected) paint(this); }
  });
})();
