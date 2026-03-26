// ============================================
// Baggage & Threat Detection Module
// ============================================
import { el } from '../utils/helpers.js';
import { createSparkline, createDoughnut } from '../utils/charts.js';
import { kpiData } from '../data/mockData.js';

export function initBaggageThreat(container) {
    const d = kpiData.baggageThreat;

    // Alert indicator
    const alertBanner = el('div', {
        style: {
            display: 'flex', alignItems: 'center', gap: 'var(--sp-2)',
            padding: 'var(--sp-2) var(--sp-3)',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--sp-3)',
            fontSize: 'var(--fs-xs)', color: 'var(--accent-red)'
        }
    }, [
        el('span', { style: { width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-red)', animation: 'pulse 1.5s infinite' } }),
        document.createTextNode(`${d.intrusionsDetected} intrusion${d.intrusionsDetected !== 1 ? 's' : ''} detected • ${d.suspiciousBehavior} suspicious behavior`)
    ]);
    container.appendChild(alertBanner);

    // Operational
    const opHeader = el('div', { style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-red)', fontWeight: '600', marginBottom: 'var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }, textContent: '◉ Operational' });
    container.appendChild(opHeader);

    container.appendChild(metricRow('Bags at Risk', `${d.bagsAtRisk}%`, d.bagsAtRisk > 2 ? 'critical' : 'warning'));
    container.appendChild(metricRow('False Positive Rate', `${d.falsePositiveRate}%`, 'good'));
    container.appendChild(metricRow('Intrusions', `${d.intrusionsDetected}`, d.intrusionsDetected > 0 ? 'critical' : 'good'));
    container.appendChild(metricRow('Suspicious Behavior', `${d.suspiciousBehavior}`, d.suspiciousBehavior > 0 ? 'warning' : 'good'));

    // Threat Risk Gauge
    const gaugeRow = el('div', { style: { display: 'flex', alignItems: 'center', gap: 'var(--sp-4)', margin: 'var(--sp-3) 0' } });
    const gaugeWrapper = el('div', { style: { width: '70px', height: '70px', position: 'relative' } });
    const gaugeCanvas = el('canvas', { width: '70', height: '70' });
    gaugeWrapper.appendChild(gaugeCanvas);
    const gaugeLabel = el('div', { style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' } }, [
        el('div', { style: { fontFamily: 'var(--font-display)', fontSize: 'var(--fs-md)', fontWeight: '700', color: 'var(--accent-amber)' }, textContent: `${d.threatRiskScore}` }),
        el('div', { style: { fontSize: '7px', color: 'var(--text-muted)' }, textContent: 'RISK' })
    ]);
    gaugeWrapper.appendChild(gaugeLabel);
    gaugeRow.appendChild(gaugeWrapper);
    gaugeRow.appendChild(el('div', { style: { flex: '1' } }, [
        metricRow('Resolution Forecast', `${d.resolutionTimeForecast} ${d.resolutionUnit}`, 'warning')
    ]));
    container.appendChild(gaugeRow);

    // Sparkline
    const sparkContainer = el('div', { className: 'chart-container short' });
    const sparkCanvas = el('canvas');
    sparkContainer.appendChild(sparkCanvas);
    container.appendChild(sparkContainer);

    setTimeout(() => {
        createDoughnut(gaugeCanvas, d.threatRiskScore, 100, '#fbbf24');
        createSparkline(sparkCanvas, d.sparklineData, '#ef4444');
    }, 200);
}

function metricRow(label, value, status = '') {
    return el('div', { className: 'metric-row' }, [
        el('span', { className: 'metric-label', textContent: label }),
        el('span', { className: `metric-value ${status}`, textContent: value })
    ]);
}
