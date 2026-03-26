// ============================================
// Perth Airport – Main Entry Point
// ============================================

// Styles
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';

// Components
import { initSidebar } from './components/sidebar.js';
import { initTopbar } from './components/topbar.js';
import { initNotifications } from './components/notifications.js';
import { initTimeline } from './components/timeline.js';

// Panels
import { initKpiPanel } from './panels/kpiPanel.js';

// Scene
import { initAirportScene, destroyScene } from './scene/airport.js';

// Pages
import { initAlertCenter } from './pages/alertCenter.js';

// Router
import { registerRoute, initRouter } from './router.js';

// Utils
import { bus, el, $ } from './utils/helpers.js';
import { zones, zoneKpis } from './data/mockData.js';

// ============================================
// Initialize Application
// ============================================

function init() {
  // Layout components (always present)
  initSidebar();
  initTopbar();
  initNotifications();

  // Register routes
  registerRoute('dashboard', showDashboard);
  registerRoute('alerts', showAlerts);

  // Initialize router (triggers initial route)
  initRouter();

  // Listen for zone interactions
  bus.on('zone:select', (zone) => showZonePanel(zone, true));
  bus.on('zone:hover', (zone) => showZonePanel(zone, false));
  bus.on('zone:unhover', dismissIfTransient);
  bus.on('zone:dismiss', dismissPanel);

  // Listen for NLQ queries
  bus.on('nlq:query', handleNLQ);
}

// ============================================
// Dashboard View
// ============================================
let sceneInitialized = false;

function showDashboard() {
  const viewport = $('#viewport');
  const rightPanel = $('#right-panel');
  const timeline = $('#timeline');

  viewport.innerHTML = '';
  viewport.classList.remove('full-page');
  rightPanel.classList.remove('hidden');
  rightPanel.innerHTML = '';
  timeline.classList.remove('hidden');
  timeline.innerHTML = '';

  // 3D Scene
  initAirportScene(viewport);
  sceneInitialized = true;

  // KPI Panel
  initKpiPanel();

  // Timeline
  initTimeline();
}

// ============================================
// Alert Center View
// ============================================
function showAlerts() {
  const viewport = $('#viewport');
  const rightPanel = $('#right-panel');
  const timeline = $('#timeline');

  // Destroy 3D scene
  destroyScene();
  sceneInitialized = false;

  // Hide right panel and timeline for full-page view
  rightPanel.classList.add('hidden');
  timeline.classList.add('hidden');

  // Render alert center
  initAlertCenter(viewport);
}

// ============================================
// Zone KPI Analytics Panel
// ============================================
let currentPanel = null;
let panelPinned = false;
let hoverTimer = null;

function dismissPanel() {
  if (currentPanel) {
    currentPanel.style.opacity = '0';
    currentPanel.style.transform = 'translateY(10px)';
    setTimeout(() => {
      currentPanel?.remove();
      currentPanel = null;
      panelPinned = false;
    }, 200);
  }
}

function dismissIfTransient() {
  if (!panelPinned) {
    clearTimeout(hoverTimer);
    hoverTimer = setTimeout(dismissPanel, 120);
  }
}

function showZonePanel(zone, pin) {
  clearTimeout(hoverTimer);

  if (panelPinned && !pin) return;

  if (pin && panelPinned && currentPanel?.dataset?.zoneId === zone.id) {
    dismissPanel();
    return;
  }

  if (currentPanel) {
    currentPanel.remove();
    currentPanel = null;
  }

  panelPinned = pin;
  showZoneInfo(zone);
}

function showZoneInfo(zone) {
  const viewport = $('#viewport');
  const kpi = zoneKpis[zone.id];
  const popup = el('div', { className: 'zone-kpi-panel', id: 'zone-info-popup' });
  popup.dataset.zoneId = zone.id;

  // ── Header ──
  const statusColors = { critical: '#ef4444', warning: '#fbbf24', operational: '#4ade80' };
  const statusColor = statusColors[zone.status] || '#4ade80';

  const header = el('div', { className: 'zkp-header' });
  header.innerHTML = `
    <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;">
      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${statusColor};flex-shrink:0;"></span>
      <span class="zkp-title">${zone.name}</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;">
      <span class="zkp-status" style="color:${statusColor}">${zone.status.toUpperCase()}</span>
      ${panelPinned ? '<span class="zkp-pin-badge">PINNED</span>' : ''}
      <div class="zkp-close" id="zkp-close-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
    </div>
  `;
  popup.appendChild(header);

  if (!kpi) {
    popup.appendChild(el('div', { style: { padding: '16px', color: 'var(--text-secondary)', fontSize: '12px' }, textContent: 'No detailed analytics available for this zone.' }));
    finishPopup(popup, viewport);
    return;
  }

  // ── KPI Grid ──
  const grid = el('div', { className: 'zkp-grid' });

  if (kpi.congestion) {
    const c = kpi.congestion;
    const gaugeColor = c.score > 80 ? '#ef4444' : c.score > 60 ? '#fbbf24' : '#4ade80';
    grid.appendChild(kpiCard(c.label || 'Congestion', `${c.score}%`, c.density, gaugeColor, c.score));
  }

  if (kpi.energy) {
    const e = kpi.energy;
    grid.appendChild(kpiCard('Energy', e.consumption, `Peak: ${e.peak}`, '#a78bfa', e.efficiency));
  }

  if (kpi.satisfaction) {
    const s = kpi.satisfaction;
    const satColor = s.score > 90 ? '#4ade80' : s.score > 75 ? '#fbbf24' : '#ef4444';
    grid.appendChild(kpiCard('Satisfaction', `${s.score}%`, `Wait: ${s.avgWait}`, satColor, s.score));
  }

  if (kpi.security) {
    const sec = kpi.security;
    const threatColors = { Low: '#4ade80', Medium: '#fbbf24', Elevated: '#fb923c', High: '#ef4444' };
    grid.appendChild(kpiCard('Security', sec.threatLevel, `${sec.cameras} cameras`, threatColors[sec.threatLevel] || '#4ade80', sec.uptime));
  }

  popup.appendChild(grid);

  // ── Details Section ──
  const details = el('div', { className: 'zkp-details' });

  if (kpi.flights) {
    const f = kpi.flights;
    const flightRow = el('div', { className: 'zkp-detail-section' });
    flightRow.innerHTML = `
      <div class="zkp-detail-title">FLIGHT OPERATIONS</div>
      <div class="zkp-detail-grid">
        <div class="zkp-metric"><span class="zkp-metric-val">${f.departures}</span><span class="zkp-metric-lbl">Departures</span></div>
        <div class="zkp-metric"><span class="zkp-metric-val">${f.arrivals}</span><span class="zkp-metric-lbl">Arrivals</span></div>
        <div class="zkp-metric"><span class="zkp-metric-val" style="color:${f.delayed > 3 ? '#fbbf24' : '#4ade80'}">${f.delayed}</span><span class="zkp-metric-lbl">Delayed</span></div>
        <div class="zkp-metric"><span class="zkp-metric-val" style="color:${f.onTime > 90 ? '#4ade80' : '#fbbf24'}">${f.onTime}%</span><span class="zkp-metric-lbl">On-time</span></div>
      </div>
    `;
    details.appendChild(flightRow);
  }

  if (kpi.revenue) {
    const r = kpi.revenue;
    const revRow = el('div', { className: 'zkp-detail-section' });
    let revHTML = `<div class="zkp-detail-title">REVENUE</div><div class="zkp-detail-grid">`;
    revHTML += `<div class="zkp-metric"><span class="zkp-metric-val" style="color:#4ade80">${r.daily}</span><span class="zkp-metric-lbl">Daily</span></div>`;
    if (r.retail) revHTML += `<div class="zkp-metric"><span class="zkp-metric-val">${r.retail}</span><span class="zkp-metric-lbl">Retail</span></div>`;
    if (r.dutyfree) revHTML += `<div class="zkp-metric"><span class="zkp-metric-val">${r.dutyfree}</span><span class="zkp-metric-lbl">Duty Free</span></div>`;
    if (r.fAndB) revHTML += `<div class="zkp-metric"><span class="zkp-metric-val">${r.fAndB}</span><span class="zkp-metric-lbl">F&B</span></div>`;
    if (r.conversion) revHTML += `<div class="zkp-metric"><span class="zkp-metric-val">${r.conversion}</span><span class="zkp-metric-lbl">Conversion</span></div>`;
    if (r.trend) revHTML += `<div class="zkp-metric"><span class="zkp-metric-val" style="color:#4ade80">${r.trend}</span><span class="zkp-metric-lbl">Trend</span></div>`;
    revHTML += `</div>`;
    revRow.innerHTML = revHTML;
    details.appendChild(revRow);
  }

  if (zone.gates !== undefined) {
    const gateRow = el('div', { className: 'zkp-detail-section' });
    const util = Math.round(zone.occupied / zone.gates * 100);
    const utilColor = util > 85 ? '#ef4444' : util > 65 ? '#fbbf24' : '#4ade80';
    gateRow.innerHTML = `
      <div class="zkp-detail-title">GATE UTILIZATION</div>
      <div style="display:flex;align-items:center;gap:12px;margin-top:6px;">
        <div style="flex:1;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="font-size:11px;color:var(--text-secondary)">${zone.occupied} / ${zone.gates} gates occupied</span>
            <span style="font-size:11px;font-weight:700;color:${utilColor}">${util}%</span>
          </div>
          <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden;">
            <div style="width:${util}%;height:100%;background:${utilColor};border-radius:4px;transition:width 0.5s;"></div>
          </div>
        </div>
      </div>
    `;
    details.appendChild(gateRow);
  }

  if (zone.pax !== undefined) {
    const paxRow = el('div', { className: 'zkp-detail-section' });
    const paxUtil = Math.round(zone.pax / zone.capacity * 100);
    const paxColor = paxUtil > 80 ? '#ef4444' : paxUtil > 60 ? '#fbbf24' : '#4ade80';
    paxRow.innerHTML = `
      <div class="zkp-detail-title">PASSENGER LOAD</div>
      <div style="display:flex;align-items:center;gap:12px;margin-top:6px;">
        <div style="flex:1;">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
            <span style="font-size:11px;color:var(--text-secondary)">${zone.pax.toLocaleString()} / ${zone.capacity.toLocaleString()} pax</span>
            <span style="font-size:11px;font-weight:700;color:${paxColor}">${paxUtil}%</span>
          </div>
          <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:4px;overflow:hidden;">
            <div style="width:${paxUtil}%;height:100%;background:${paxColor};border-radius:4px;transition:width 0.5s;"></div>
          </div>
        </div>
      </div>
    `;
    details.appendChild(paxRow);
  }

  if (kpi.trend) {
    const sparkRow = el('div', { className: 'zkp-detail-section' });
    sparkRow.innerHTML = `<div class="zkp-detail-title">60-MIN TREND</div>`;
    const canvas = document.createElement('canvas');
    canvas.width = 280;
    canvas.height = 48;
    canvas.style.cssText = 'width:100%;height:48px;margin-top:6px;';
    sparkRow.appendChild(canvas);
    details.appendChild(sparkRow);
    setTimeout(() => drawSparkline(canvas, kpi.trend), 50);
  }

  if (kpi.activeAlerts > 0) {
    const alertRow = el('div', { className: 'zkp-detail-section' });
    alertRow.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;">
        <div class="zkp-detail-title" style="margin:0">ACTIVE ALERTS</div>
        <span style="background:rgba(239,68,68,0.15);color:#ef4444;padding:2px 10px;border-radius:10px;font-size:11px;font-weight:700;">${kpi.activeAlerts}</span>
      </div>
    `;
    details.appendChild(alertRow);
  }

  popup.appendChild(details);
  finishPopup(popup, viewport);
}

function finishPopup(popup, viewport) {
  viewport.appendChild(popup);
  currentPanel = popup;
  document.getElementById('zkp-close-btn')?.addEventListener('click', (e) => {
    e.stopPropagation();
    dismissPanel();
  });
}

function kpiCard(title, value, subtitle, color, percent) {
  const card = document.createElement('div');
  card.className = 'zkp-card';
  const pct = Math.min(Math.max(percent || 0, 0), 100);
  card.innerHTML = `
    <div class="zkp-card-title">${title}</div>
    <div class="zkp-card-value" style="color:${color}">${value}</div>
    <div class="zkp-card-bar">
      <div class="zkp-card-bar-fill" style="width:${pct}%;background:${color};"></div>
    </div>
    <div class="zkp-card-sub">${subtitle}</div>
  `;
  return card;
}

function drawSparkline(canvas, data) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pad = 4;

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(56,189,248,0.3)');
  grad.addColorStop(1, 'rgba(56,189,248,0)');

  ctx.clearRect(0, 0, w, h);

  ctx.beginPath();
  data.forEach((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.lineTo(w - pad, h - pad);
  ctx.lineTo(pad, h - pad);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  data.forEach((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 2;
  ctx.stroke();

  const lastX = w - pad;
  const lastY = pad + (1 - (data[data.length - 1] - min) / range) * (h - pad * 2);
  ctx.beginPath();
  ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
  ctx.fillStyle = '#38bdf8';
  ctx.fill();
}

// ============================================
// NLQ Handler
// ============================================
function handleNLQ(query) {
  const q = query.toLowerCase();

  if (q.includes('congestion') || q.includes('passenger') || q.includes('flow')) {
    const section = $('#section-passenger-flow');
    if (section && !section.classList.contains('open')) section.classList.add('open');
    bus.emit('overlay:heatmap', true);
    const btn = document.getElementById('btn-heatmap');
    if (btn) btn.classList.add('active');
  }
  else if (q.includes('gate') || q.includes('conflict') || q.includes('resource')) {
    const section = $('#section-resource-scheduling');
    if (section && !section.classList.contains('open')) section.classList.add('open');
  }
  else if (q.includes('energy') || q.includes('peak') || q.includes('sustainability')) {
    const section = $('#section-sustainability');
    if (section && !section.classList.contains('open')) section.classList.add('open');
    bus.emit('overlay:energy', true);
  }
  else if (q.includes('fifo') || q.includes('charter') || q.includes('demand') || q.includes('retail')) {
    const section = $('#section-customer-exp');
    if (section && !section.classList.contains('open')) section.classList.add('open');
  }
  else if (q.includes('threat') || q.includes('baggage') || q.includes('security')) {
    const section = $('#section-baggage-threat');
    if (section && !section.classList.contains('open')) section.classList.add('open');
  }

  showAIResponse(query);
}

function showAIResponse(query) {
  const existing = document.getElementById('ai-response-toast');
  if (existing) existing.remove();

  const toast = el('div', {
    id: 'ai-response-toast',
    style: {
      position: 'fixed', bottom: '70px', left: '50%', transform: 'translateX(-50%)',
      background: 'rgba(17,24,39,0.95)',
      border: '1px solid rgba(56,189,248,0.3)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--sp-3) var(--sp-6)',
      color: 'var(--text-primary)',
      fontSize: 'var(--fs-sm)',
      zIndex: '600',
      animation: 'fadeInUp 0.3s ease forwards',
      maxWidth: '600px',
      boxShadow: '0 0 30px rgba(56,189,248,0.1)'
    }
  }, [
    el('div', { style: { display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: 'var(--sp-2)' } }, [
      el('span', { style: { color: 'var(--accent-cyan)', fontWeight: '600', fontSize: 'var(--fs-xs)' }, textContent: 'AIRPORT AI' }),
      el('span', { style: { fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }, textContent: 'Processing…' })
    ]),
    el('div', { style: { color: 'var(--text-secondary)', lineHeight: '1.5' }, textContent: `Analyzing: "${query}". Relevant panels updated. Heatmap and overlays adjusted based on query context.` })
  ]);

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.5s';
    setTimeout(() => toast.remove(), 500);
  }, 5000);
}

// ============================================
// Start App
// ============================================
document.addEventListener('DOMContentLoaded', init);
