// ============================================
// KSIA Smart Airport – Alert Intelligence Center
// ============================================
import { el, $, icons, bus, formatTime, getSeverityBadgeClass, getAlertStatusLabel } from '../utils/helpers.js';
import { createLineChart } from '../utils/charts.js';
import { alerts } from '../data/mockData.js';

let filteredAlerts = [...alerts];
let sortBy = 'newest';

export function initAlertCenter(container) {
    container.innerHTML = '';
    container.classList.add('full-page');

    // Page Header
    const pageHeader = el('div', {
        style: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 'var(--sp-6)'
        }
    }, [
        el('div', {}, [
            el('h1', {
                style: {
                    fontFamily: 'var(--font-display)', fontSize: 'var(--fs-2xl)',
                    fontWeight: '700', color: 'var(--text-primary)', marginBottom: 'var(--sp-1)'
                },
                textContent: 'Alert Intelligence Center'
            }),
            el('p', {
                style: { fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' },
                textContent: 'Security Operations Center • Real-time Threat & Operational Monitoring'
            })
        ]),
        el('div', { style: { display: 'flex', gap: 'var(--sp-2)' } }, [
            el('button', { className: 'btn btn-primary', innerHTML: `<span style="width:14px;height:14px;display:inline-flex">${icons.download}</span> Export CSV` }),
            el('button', { className: 'btn', innerHTML: `<span style="width:14px;height:14px;display:inline-flex">${icons.download}</span> Export PDF` }),
        ])
    ]);
    container.appendChild(pageHeader);

    // Stats Row
    const statsRow = el('div', {
        style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 'var(--sp-3)',
            marginBottom: 'var(--sp-4)'
        }
    });

    const stats = [
        { label: 'Total Alerts', value: alerts.length, color: 'var(--text-primary)' },
        { label: 'Critical', value: alerts.filter(a => a.severity === 'critical').length, color: 'var(--accent-red)' },
        { label: 'High', value: alerts.filter(a => a.severity === 'high').length, color: 'var(--accent-amber)' },
        { label: 'Active', value: alerts.filter(a => a.status !== 'resolved').length, color: 'var(--accent-cyan)' },
        { label: 'Resolved', value: alerts.filter(a => a.status === 'resolved').length, color: 'var(--accent-green-bright)' },
    ];

    stats.forEach(stat => {
        statsRow.appendChild(el('div', { className: 'card' }, [
            el('div', { className: 'card-value', style: { color: stat.color, fontSize: 'var(--fs-xl)' }, textContent: stat.value }),
            el('div', { className: 'card-subtitle', textContent: stat.label })
        ]));
    });
    container.appendChild(statsRow);

    // Alert Trend Chart
    const trendCard = el('div', { className: 'card', style: { marginBottom: 'var(--sp-4)' } });
    trendCard.appendChild(el('div', { className: 'card-header' }, [
        el('span', { className: 'card-title', textContent: 'Alert Trend (24h)' }),
        el('span', { style: { fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }, textContent: 'Historical Alert Activity' })
    ]));
    const trendContainer = el('div', { className: 'chart-container tall' });
    const trendCanvas = el('canvas');
    trendContainer.appendChild(trendCanvas);
    trendCard.appendChild(trendContainer);
    container.appendChild(trendCard);

    // Filter Bar
    const filterBar = el('div', { className: 'filter-bar' });

    const searchInput = el('input', {
        className: 'filter-search',
        type: 'text',
        placeholder: 'Search alerts…',
        onInput: (e) => filterAlerts(e.target.value, container)
    });
    filterBar.appendChild(searchInput);

    const severityFilter = createSelect('Severity', ['All', 'Critical', 'High', 'Medium', 'Low'], (val) => {
        filterBySeverity(val.toLowerCase(), container);
    });
    filterBar.appendChild(severityFilter);

    const statusFilter = createSelect('Status', ['All', 'New', 'Acknowledged', 'In Progress', 'Resolved', 'Escalated'], (val) => {
        filterByStatus(val.toLowerCase().replace(' ', '_'), container);
    });
    filterBar.appendChild(statusFilter);

    const categoryFilter = createSelect('Category', ['All', 'Security', 'Congestion', 'Resource Conflict', 'Energy Risk', 'Retail Demand Surge', 'System Anomaly'], (val) => {
        filterByCategory(val, container);
    });
    filterBar.appendChild(categoryFilter);

    const sortSelect = createSelect('Sort', ['Newest', 'Severity', 'Zone'], (val) => {
        sortBy = val.toLowerCase();
        renderAlertList(container);
    });
    filterBar.appendChild(sortSelect);

    container.appendChild(filterBar);

    // Alert List
    const alertList = el('div', { id: 'alert-list' });
    container.appendChild(alertList);
    renderAlertList(container);

    // Init chart
    setTimeout(() => {
        const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
        const alertCounts = hours.map(() => Math.floor(Math.random() * 8) + 1);
        const criticalCounts = hours.map(() => Math.floor(Math.random() * 3));
        createLineChart(trendCanvas, hours, [
            { label: 'All Alerts', data: alertCounts, borderColor: '#38bdf8', backgroundColor: 'rgba(56,189,248,0.1)', fill: true },
            { label: 'Critical', data: criticalCounts, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', fill: true },
        ], true);
    }, 200);
}

function renderAlertList(container) {
    const list = container.querySelector('#alert-list') || el('div', { id: 'alert-list' });
    list.innerHTML = '';

    let sorted = [...filteredAlerts];
    if (sortBy === 'newest') sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    else if (sortBy === 'severity') {
        const order = { critical: 0, high: 1, medium: 2, low: 3 };
        sorted.sort((a, b) => order[a.severity] - order[b.severity]);
    }
    else if (sortBy === 'zone') sorted.sort((a, b) => a.zone.localeCompare(b.zone));

    sorted.forEach((alert, idx) => {
        const card = el('div', {
            className: `alert-card ${alert.severity === 'critical' ? 'severity-critical' : alert.severity === 'high' ? 'severity-high' : alert.severity === 'medium' ? 'severity-medium' : 'severity-low'}`,
            style: { animationDelay: `${idx * 50}ms` }
        });

        const dot = el('div', { className: `alert-dot ${alert.severity}` });

        const content = el('div', { style: { flex: '1', minWidth: '0' } });

        // Header row
        const headerRow = el('div', { style: { display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', marginBottom: 'var(--sp-1)', flexWrap: 'wrap' } });
        headerRow.appendChild(el('span', { style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-cyan)', fontWeight: '600', fontFamily: 'monospace' }, textContent: alert.id }));
        headerRow.appendChild(el('span', { className: `badge ${getSeverityBadgeClass(alert.severity)}`, textContent: alert.severity.toUpperCase() }));
        headerRow.appendChild(el('span', { style: { fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }, textContent: formatTime(alert.timestamp) }));
        headerRow.appendChild(el('span', { style: { fontSize: 'var(--fs-xs)', color: 'var(--text-tertiary)', marginLeft: 'auto' }, textContent: alert.zone }));
        content.appendChild(headerRow);

        // Description
        content.appendChild(el('div', {
            style: { fontSize: 'var(--fs-sm)', color: 'var(--text-primary)', marginBottom: 'var(--sp-1)', lineHeight: '1.5' },
            textContent: alert.description
        }));

        // Meta
        const metaRow = el('div', { style: { display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 'var(--sp-2)', flexWrap: 'wrap' } });
        metaRow.appendChild(el('span', { style: { fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }, textContent: `Source: ${alert.source}` }));
        metaRow.appendChild(el('span', { style: { fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }, textContent: `Category: ${alert.category}` }));
        content.appendChild(metaRow);

        // Recommended Action
        content.appendChild(el('div', {
            style: {
                fontSize: 'var(--fs-xs)', color: 'var(--accent-green-bright)',
                padding: 'var(--sp-2)',
                background: 'rgba(74,222,128,0.05)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: 'var(--sp-2)'
            },
            textContent: `Recommended: ${alert.action}`
        }));

        // Actions
        const actions = el('div', { style: { display: 'flex', alignItems: 'center', gap: 'var(--sp-2)', flexWrap: 'wrap' } });

        // Status dropdown
        const statusSelect = el('select', { className: 'filter-select', style: { minWidth: '130px', fontSize: 'var(--fs-xs)', padding: '4px 8px' } });
        ['new', 'acknowledged', 'in_progress', 'resolved', 'escalated'].forEach(s => {
            const opt = el('option', { value: s, textContent: getAlertStatusLabel(s) });
            if (s === alert.status) opt.selected = true;
            statusSelect.appendChild(opt);
        });
        statusSelect.addEventListener('change', (e) => {
            alert.status = e.target.value;
        });
        actions.appendChild(statusSelect);

        actions.appendChild(el('button', { className: 'btn btn-sm btn-primary', textContent: 'Acknowledge' }));
        actions.appendChild(el('button', { className: 'btn btn-sm btn-danger', textContent: 'Escalate' }));
        content.appendChild(actions);

        card.append(dot, content);
        list.appendChild(card);
    });
}

function filterAlerts(query, container) {
    const q = query.toLowerCase();
    filteredAlerts = alerts.filter(a =>
        a.description.toLowerCase().includes(q) ||
        a.zone.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.source.toLowerCase().includes(q)
    );
    renderAlertList(container);
}

function filterBySeverity(severity, container) {
    filteredAlerts = severity === 'all' ? [...alerts] : alerts.filter(a => a.severity === severity);
    renderAlertList(container);
}

function filterByStatus(status, container) {
    filteredAlerts = status === 'all' ? [...alerts] : alerts.filter(a => a.status === status);
    renderAlertList(container);
}

function filterByCategory(category, container) {
    filteredAlerts = category === 'All' ? [...alerts] : alerts.filter(a => a.category === category);
    renderAlertList(container);
}

function createSelect(label, options, onChange) {
    const select = el('select', { className: 'filter-select' });
    options.forEach(opt => {
        select.appendChild(el('option', { value: opt, textContent: opt === 'All' ? `${label}: All` : opt }));
    });
    select.addEventListener('change', (e) => onChange(e.target.value));
    return select;
}
