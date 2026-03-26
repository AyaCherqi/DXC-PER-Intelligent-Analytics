// ============================================
// Resource Scheduling & Gate Assignment Module
// ============================================
import { el } from '../utils/helpers.js';
import { createSparkline } from '../utils/charts.js';
import { kpiData } from '../data/mockData.js';

export function initResourceScheduling(container) {
    const d = kpiData.resourceScheduling;

    // Operational metrics
    const opHeader = el('div', { style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-cyan)', fontWeight: '600', marginBottom: 'var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }, textContent: '◉ Operational' });
    container.appendChild(opHeader);

    container.appendChild(metricWithBar('Staff Efficiency', `${d.staffEfficiency}%`, d.staffEfficiency, 'green'));
    container.appendChild(metricWithBar('On-Time Boarding', `${d.onTimeBoardingRate}%`, d.onTimeBoardingRate, 'green'));
    container.appendChild(metricWithBar('On-Time Departure', `${d.onTimeDepartureRate}%`, d.onTimeDepartureRate, d.onTimeDepartureRate > 85 ? 'green' : 'amber'));

    // Sparkline
    const sparkContainer = el('div', { className: 'chart-container short', style: { marginTop: 'var(--sp-2)' } });
    const sparkCanvas = el('canvas');
    sparkContainer.appendChild(sparkCanvas);
    container.appendChild(sparkContainer);

    // Predictive
    const predHeader = el('div', { style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-cyan)', fontWeight: '600', margin: 'var(--sp-3) 0 var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }, textContent: 'PREDICTIVE' });
    container.appendChild(predHeader);

    container.appendChild(metricRow('Turnaround Forecast', `${d.turnaroundForecast} ${d.turnaroundUnit}`, 'good'));
    container.appendChild(metricRow('Gate Reassignment', `${d.gateReassignmentScore}/100`, d.gateReassignmentScore > 70 ? 'warning' : 'good'));
    container.appendChild(metricRow('Delay Propagation', `${d.delayPropagation} min`, d.delayPropagation > 15 ? 'warning' : 'good'));

    setTimeout(() => {
        createSparkline(sparkCanvas, d.sparklineData, '#22d3ee');
    }, 150);
}

function metricRow(label, value, status = '') {
    return el('div', { className: 'metric-row' }, [
        el('span', { className: 'metric-label', textContent: label }),
        el('span', { className: `metric-value ${status}`, textContent: value })
    ]);
}

function metricWithBar(label, value, pct, color) {
    return el('div', { style: { marginBottom: 'var(--sp-2)' } }, [
        el('div', { className: 'metric-row', style: { borderBottom: 'none', paddingBottom: '2px' } }, [
            el('span', { className: 'metric-label', textContent: label }),
            el('span', { className: `metric-value ${color === 'green' ? 'good' : 'warning'}`, textContent: value })
        ]),
        el('div', { className: 'progress-bar' }, [
            el('div', { className: `progress-fill ${color}`, style: { width: `${pct}%` } })
        ])
    ]);
}
