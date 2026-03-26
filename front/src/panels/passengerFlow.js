// ============================================
// Passenger Flow & Queue Management Module
// ============================================
import { el } from '../utils/helpers.js';
import { createSparkline, createDoughnut } from '../utils/charts.js';
import { kpiData } from '../data/mockData.js';

export function initPassengerFlow(container) {
    const d = kpiData.passengerFlow;

    // Congestion Score Gauge
    const gaugeRow = el('div', { style: { display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', marginBottom: 'var(--sp-3)' } });

    const gaugeWrapper = el('div', { style: { width: '80px', height: '80px', position: 'relative' } });
    const gaugeCanvas = el('canvas', { width: '80', height: '80' });
    gaugeWrapper.appendChild(gaugeCanvas);
    const gaugeLabel = el('div', { style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' } }, [
        el('div', { style: { fontFamily: 'var(--font-display)', fontSize: 'var(--fs-lg)', fontWeight: '700', color: d.congestionScore > 70 ? 'var(--accent-amber)' : 'var(--accent-green-bright)' }, textContent: `${d.congestionScore}` }),
        el('div', { style: { fontSize: '8px', color: 'var(--text-muted)', textTransform: 'uppercase' }, textContent: 'Congestion' })
    ]);
    gaugeWrapper.appendChild(gaugeLabel);
    gaugeRow.appendChild(gaugeWrapper);

    const metricsCol = el('div', { style: { flex: '1' } }, [
        metricRow('Density', `${d.density} ${d.densityUnit}`, d.density > 3.5 ? 'warning' : 'good'),
        metricRow('Flow Rate', `${d.flowRate} ${d.flowRateUnit}`, 'good'),
        metricRow('Avg Wait', `${d.avgWaitTime} ${d.waitTimeUnit}`, d.avgWaitTime > 8 ? 'warning' : 'good'),
    ]);
    gaugeRow.appendChild(metricsCol);
    container.appendChild(gaugeRow);

    // Sparkline
    const sparkContainer = el('div', { className: 'chart-container short' });
    const sparkCanvas = el('canvas');
    sparkContainer.appendChild(sparkCanvas);
    container.appendChild(sparkContainer);

    // Predictive Section
    const predHeader = el('div', { style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-cyan)', fontWeight: '600', margin: 'var(--sp-3) 0 var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }, textContent: 'PREDICTIVE' });
    container.appendChild(predHeader);

    container.appendChild(metricRow('Occupancy +30m', `${d.predictedOccupancy30}%`, d.predictedOccupancy30 > 80 ? 'warning' : 'good'));
    container.appendChild(metricRow('Occupancy +60m', `${d.predictedOccupancy60}%`, d.predictedOccupancy60 > 80 ? 'critical' : 'warning'));
    container.appendChild(metricRow('Required Lanes', `${d.requiredLanes}`, 'good'));
    container.appendChild(metricRow('Staffing Forecast', `${d.staffingForecast} agents`, 'good'));
    container.appendChild(metricRow('Avoided Delay', `${d.avoidedDelayMin} min`, 'good'));

    // Init charts
    setTimeout(() => {
        createDoughnut(gaugeCanvas, d.congestionScore, 100, d.congestionScore > 70 ? '#fbbf24' : '#4ade80');
        createSparkline(sparkCanvas, d.sparklineData, '#38bdf8');
    }, 100);
}

function metricRow(label, value, status = '') {
    return el('div', { className: 'metric-row' }, [
        el('span', { className: 'metric-label', textContent: label }),
        el('span', { className: `metric-value ${status}`, textContent: value })
    ]);
}
