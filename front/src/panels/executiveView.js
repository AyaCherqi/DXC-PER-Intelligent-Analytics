// ============================================
// Executive Strategic View Module
// ============================================
import { el } from '../utils/helpers.js';
import { createDoughnut } from '../utils/charts.js';
import { kpiData } from '../data/mockData.js';

export function initExecutiveView(container) {
    const d = kpiData.executive;

    // Health Score Ring
    const scoreRing = el('div', { className: 'exec-score-ring' });
    const scoreCanvas = el('canvas', { width: '160', height: '160' });
    scoreRing.appendChild(scoreCanvas);
    const scoreValue = el('div', { style: { position: 'absolute', textAlign: 'center' } }, [
        el('div', { className: 'exec-score-value', textContent: `${d.healthScore}` }),
        el('div', { className: 'exec-score-label', textContent: 'Airport Health' })
    ]);
    scoreRing.appendChild(scoreValue);
    container.appendChild(scoreRing);

    // Grid Cards
    const grid = el('div', { className: 'exec-grid' });

    grid.appendChild(execCard('Risk Index', `${d.riskIndex}`, d.riskIndex > 50 ? 'var(--accent-red)' : 'var(--accent-amber)'));
    grid.appendChild(execCard('Revenue', d.revenuePerformance, 'var(--accent-green-bright)'));
    grid.appendChild(execCard('Sustainability', `${d.sustainabilityScore}%`, 'var(--accent-purple)'));
    grid.appendChild(execCard('24h Stress', `${d.predictedStressIndex}%`, d.predictedStressIndex > 60 ? 'var(--accent-amber)' : 'var(--accent-green-bright)'));

    container.appendChild(grid);

    // Active Alerts Summary
    const alertHeader = el('div', { style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-amber)', fontWeight: '600', margin: 'var(--sp-4) 0 var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }, textContent: 'ACTIVE ALERTS' });
    container.appendChild(alertHeader);

    const alertGrid = el('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-2)' } });
    alertGrid.appendChild(alertChip('Critical', d.activeAlerts.critical, 'var(--accent-red)'));
    alertGrid.appendChild(alertChip('High', d.activeAlerts.high, 'var(--accent-amber)'));
    alertGrid.appendChild(alertChip('Medium', d.activeAlerts.medium, 'var(--accent-cyan)'));
    alertGrid.appendChild(alertChip('Low', d.activeAlerts.low, 'var(--accent-green-bright)'));
    container.appendChild(alertGrid);

    // Strategic Recommendations Summary
    const recHeader = el('div', { style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-cyan)', fontWeight: '600', margin: 'var(--sp-4) 0 var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }, textContent: 'DECISION LOG' });
    container.appendChild(recHeader);

    d.decisionLog.forEach(log => {
        const row = el('div', {
            style: {
                display: 'flex', gap: 'var(--sp-2)',
                padding: 'var(--sp-2) 0',
                borderBottom: '1px solid rgba(255,255,255,0.03)',
                fontSize: 'var(--fs-xs)'
            }
        }, [
            el('span', { style: { color: 'var(--accent-cyan)', fontWeight: '600', whiteSpace: 'nowrap' }, textContent: log.time }),
            el('span', { style: { color: 'var(--text-secondary)', flex: '1' }, textContent: log.decision }),
        ]);
        container.appendChild(row);
    });

    setTimeout(() => {
        const color = d.healthScore > 70 ? '#4ade80' : d.healthScore > 40 ? '#fbbf24' : '#ef4444';
        createDoughnut(scoreCanvas, d.healthScore, 100, color);
    }, 100);
}

function execCard(label, value, color) {
    return el('div', { className: 'exec-card' }, [
        el('div', { className: 'exec-card-value', style: { color } }, [document.createTextNode(value)]),
        el('div', { className: 'exec-card-label', textContent: label })
    ]);
}

function alertChip(label, count, color) {
    return el('div', {
        style: {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: 'var(--sp-2) var(--sp-3)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-secondary)',
            borderRadius: 'var(--radius-md)'
        }
    }, [
        el('span', { style: { fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }, textContent: label }),
        el('span', { style: { fontSize: 'var(--fs-md)', fontWeight: '700', color, fontFamily: 'var(--font-display)' }, textContent: `${count}` })
    ]);
}
