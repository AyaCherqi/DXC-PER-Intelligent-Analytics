// ============================================
// PER Smart Airport – Notifications Panel
// ============================================
import { el, $, icons, bus, formatTime, getSeverityBadgeClass, getAlertStatusLabel } from '../utils/helpers.js';
import { alerts } from '../data/mockData.js';

let isVisible = false;

export function initNotifications() {
    const portal = $('#notification-portal');
    portal.innerHTML = '';

    const panel = el('div', { className: 'notification-panel', id: 'notification-panel' });

    // Header
    const header = el('div', { className: 'notification-header' }, [
        el('span', { style: { fontWeight: '600', fontSize: 'var(--fs-sm)', color: 'var(--text-primary)' }, textContent: 'Recent Alerts' }),
        el('span', { style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-cyan)', cursor: 'pointer' }, textContent: 'View All', onClick: () => { window.location.hash = 'alerts'; hidePanel(); } })
    ]);
    panel.appendChild(header);

    // List
    const list = el('div', { className: 'notification-list' });
    alerts.slice(0, 5).forEach(alert => {
        const item = el('div', { className: 'notification-item' }, [
            el('div', { className: `alert-dot ${alert.severity}`, style: { marginTop: '6px' } }),
            el('div', { style: { flex: '1', minWidth: '0' } }, [
                el('div', { style: { fontSize: 'var(--fs-sm)', fontWeight: '500', color: 'var(--text-primary)', marginBottom: '2px' }, className: 'truncate', textContent: alert.description.slice(0, 80) + '…' }),
                el('div', { style: { display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginTop: '4px' } }, [
                    el('span', { className: `badge ${getSeverityBadgeClass(alert.severity)}`, textContent: alert.severity.toUpperCase() }),
                    el('span', { style: { fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }, textContent: formatTime(alert.timestamp) }),
                ]),
                el('div', { style: { display: 'flex', gap: 'var(--sp-2)', marginTop: '6px' } }, [
                    el('button', { className: 'btn btn-sm btn-primary', textContent: 'Acknowledge', onClick: (e) => { e.stopPropagation(); } }),
                    el('button', { className: 'btn btn-sm', textContent: 'Details', onClick: (e) => { e.stopPropagation(); window.location.hash = 'alerts'; hidePanel(); } }),
                ])
            ])
        ]);
        list.appendChild(item);
    });
    panel.appendChild(list);
    portal.appendChild(panel);

    // Toggle
    bus.on('notifications:toggle', () => {
        isVisible = !isVisible;
        if (isVisible) showPanel(); else hidePanel();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (isVisible && !panel.contains(e.target) && !e.target.closest('#bell-wrapper')) {
            hidePanel();
        }
    });
}

function showPanel() {
    const panel = $('#notification-panel');
    panel.classList.add('visible');
    isVisible = true;
}

function hidePanel() {
    const panel = $('#notification-panel');
    panel.classList.remove('visible');
    isVisible = false;
}
