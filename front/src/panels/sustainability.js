// ============================================
// Sustainability & Energy Optimization Module
// ============================================
import { el, bus } from '../utils/helpers.js';
import { createBarChart, createSparkline } from '../utils/charts.js';
import { kpiData } from '../data/mockData.js';

export function initSustainability(container) {
    const d = kpiData.sustainability;

    // Carbon footprint highlight
    const carbonCard = el('div', {
        style: {
            display: 'flex', alignItems: 'center', gap: 'var(--sp-3)',
            padding: 'var(--sp-3)',
            background: 'rgba(167,139,250,0.06)',
            border: '1px solid rgba(167,139,250,0.15)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--sp-3)'
        }
    }, [
        el('div', { style: { fontSize: 'var(--fs-xl)', fontFamily: 'var(--font-display)', fontWeight: '700', color: 'var(--accent-purple)' }, textContent: `${d.carbonFootprint}` }),
        el('div', {}, [
            el('div', { style: { fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }, textContent: d.carbonUnit }),
            el('div', { style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-green-bright)' }, textContent: `↓ ${d.costSavings}% cost savings` })
        ])
    ]);
    container.appendChild(carbonCard);

    // Energy Per Terminal Bar Chart
    const chartLabel = el('div', { style: { fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--sp-1)' }, textContent: 'Energy per Terminal (MW)' });
    container.appendChild(chartLabel);

    const chartContainer = el('div', { className: 'chart-container', style: { height: '90px' } });
    const chartCanvas = el('canvas');
    chartContainer.appendChild(chartCanvas);
    container.appendChild(chartContainer);

    // Operational
    container.appendChild(metricRow('Power Demand', `${d.powerDemand} MW`, 'good'));

    // Predictive
    const predHeader = el('div', { style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-cyan)', fontWeight: '600', margin: 'var(--sp-3) 0 var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }, textContent: 'PREDICTIVE' });
    container.appendChild(predHeader);

    container.appendChild(metricRow('Peak +30m', `${d.energyPeak30} MW`, d.energyPeak30 > 11 ? 'warning' : 'good'));
    container.appendChild(metricRow('Peak +60m', `${d.energyPeak60} MW`, d.energyPeak60 > 12 ? 'critical' : 'warning'));
    container.appendChild(metricRow('Overconsumption Risk', `${d.overconsumptionRisk}%`, d.overconsumptionRisk > 20 ? 'warning' : 'good'));

    // Energy Overlay Toggle
    const overlayToggle = el('div', { className: 'toggle-switch', style: { marginTop: 'var(--sp-3)' } });
    const overlayLabel = el('span', { className: 'toggle-label', textContent: 'Energy Map Overlay' });
    const overlayTrack = el('div', { className: 'toggle-track' }, [el('div', { className: 'toggle-thumb' })]);
    overlayToggle.append(overlayLabel, overlayTrack);
    overlayToggle.addEventListener('click', () => {
        overlayTrack.classList.toggle('active');
        bus.emit('overlay:energy', overlayTrack.classList.contains('active'));
    });
    container.appendChild(overlayToggle);

    // Sparkline
    const sparkContainer = el('div', { className: 'chart-container short', style: { marginTop: 'var(--sp-2)' } });
    const sparkCanvas = el('canvas');
    sparkContainer.appendChild(sparkCanvas);
    container.appendChild(sparkContainer);

    setTimeout(() => {
        const terms = Object.keys(d.energyPerTerminal);
        const vals = Object.values(d.energyPerTerminal);
        createBarChart(chartCanvas, terms, vals, ['#a78bfa', '#38bdf8', '#22d3ee', '#4ade80', '#fbbf24']);
        createSparkline(sparkCanvas, d.sparklineData, '#a78bfa');
    }, 250);
}

function metricRow(label, value, status = '') {
    return el('div', { className: 'metric-row' }, [
        el('span', { className: 'metric-label', textContent: label }),
        el('span', { className: `metric-value ${status}`, textContent: value })
    ]);
}
