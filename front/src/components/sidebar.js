// ============================================
// PER Smart Airport – Sidebar Component
// ============================================
import { el, $, $$, icons, bus } from '../utils/helpers.js';

const navItems = [
    { id: 'dashboard', icon: icons.dashboard, label: 'Dashboard', route: '#dashboard' },
    { id: 'alerts', icon: icons.alerts, label: 'Alert Center', route: '#alerts' },
    { id: 'terminal-kpis', icon: icons.analytics, label: 'Terminal Analytics', route: '#terminal-kpis' },
];

export function initSidebar() {
    const sidebar = $('#sidebar');
    sidebar.innerHTML = '';

    // Logo
    const logo = el('div', { className: 'sidebar-logo' }, [
        el('img', {
            src: '/assets/per-logo.png',
            alt: 'Perth Airport',
            style: { width: '38px', height: '38px', objectFit: 'contain', borderRadius: '50%' }
        }),
    ]);
    sidebar.appendChild(logo);

    // Nav
    const nav = el('div', { className: 'sidebar-nav' });
    navItems.forEach(item => {
        const navItem = el('div', {
            className: `sidebar-nav-item tooltip ${item.id === 'dashboard' ? 'active' : ''}`,
            innerHTML: `<div style="width:20px;height:20px">${item.icon}</div>`,
            dataset: { tooltip: item.label, nav: item.id },
            onClick: () => {
                $$('.sidebar-nav-item').forEach(n => n.classList.remove('active'));
                navItem.classList.add('active');
                if (item.route) {
                    window.location.hash = item.route.replace('#', '');
                }
                bus.emit('nav:change', item.id);
            }
        });
        nav.appendChild(navItem);
    });
    sidebar.appendChild(nav);

    // Bottom
    const bottom = el('div', { className: 'sidebar-bottom' }, [
        el('div', {
            className: 'sidebar-nav-item tooltip',
            innerHTML: `<div style="width:20px;height:20px">${icons.settings}</div>`,
            dataset: { tooltip: 'Settings' }
        }),
        el('div', {
            className: 'sidebar-nav-item tooltip',
            innerHTML: `<div style="width:20px;height:20px">${icons.user}</div>`,
            dataset: { tooltip: 'Profile' },
            style: { borderRadius: 'var(--radius-full)', background: 'rgba(56,189,248,0.1)' }
        })
    ]);
    sidebar.appendChild(bottom);

    // Listen for route changes
    bus.on('route:change', (route) => {
        $$('.sidebar-nav-item').forEach(n => n.classList.remove('active'));
        const routeMap = { alerts: 'alerts', 'terminal-kpis': 'terminal-kpis' };
        const activeId = routeMap[route] || 'dashboard';
        const activeEl = $(`[data-nav="${activeId}"]`);
        if (activeEl) activeEl.classList.add('active');
    });
}
