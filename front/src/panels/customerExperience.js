// ============================================
// Customer Experience & Retail Module
// Perth Airport context
// ============================================
import { el, bus } from '../utils/helpers.js';
import { createSparkline } from '../utils/charts.js';
import { kpiData } from '../data/mockData.js';

let eventMode = 'normal';

export function initCustomerExperience(container) {
    const d = kpiData.customerExperience;

    // Event Mode Toggle
    const modeGroup = el('div', { className: 'event-mode-group', style: { marginBottom: 'var(--sp-3)' } });
    ['Normal', 'FIFO Peak', 'Holiday Surge'].forEach(mode => {
        const btn = el('button', {
            className: `event-mode-btn ${mode.toLowerCase() === 'normal' ? 'active' : ''}`,
            textContent: mode,
            onClick: () => {
                modeGroup.querySelectorAll('.event-mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                eventMode = mode.toLowerCase();
                bus.emit('event:mode', mode);
            }
        });
        modeGroup.appendChild(btn);
    });
    container.appendChild(modeGroup);

    // Operational
    const opHeader = el('div', { style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-amber)', fontWeight: '600', marginBottom: 'var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }, textContent: '◉ Operational' });
    container.appendChild(opHeader);

    container.appendChild(metricRow('Chatbot Response', `${d.chatbotResponseTime} ${d.chatbotUnit}`, 'good'));
    container.appendChild(metricRow('Resolution Rate', `${d.resolutionRate}%`, 'good'));
    container.appendChild(metricRow('Engagement Rate', `${d.engagementRate}%`, 'good'));

    // Retail footfall
    const retailHeader = el('div', { style: { fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', margin: 'var(--sp-3) 0 var(--sp-2)' }, textContent: 'Retail Footfall' });
    container.appendChild(retailHeader);

    Object.entries(d.retailFootfall).forEach(([zone, count]) => {
        container.appendChild(metricRow(zone, `${count.toLocaleString()} visitors`, 'good'));
    });

    container.appendChild(metricRow('Ad Performance', `${d.adPerformance} ${d.adUnit}`, 'good'));

    // Predictive
    const predHeader = el('div', { style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-cyan)', fontWeight: '600', margin: 'var(--sp-3) 0 var(--sp-2)', textTransform: 'uppercase', letterSpacing: '0.08em' }, textContent: 'PREDICTIVE' });
    container.appendChild(predHeader);

    container.appendChild(metricRow('Traffic Forecast', d.retailForecast, 'warning'));
    container.appendChild(metricRow('Event Demand', d.eventDemand, 'warning'));
    container.appendChild(metricRow('Conversion Prob.', `${d.conversionProbability}%`, 'good'));
    container.appendChild(metricRow('Revenue Uplift', `${d.revenueUplift}%`, 'good'));

    // Sparkline
    const sparkContainer = el('div', { className: 'chart-container short', style: { marginTop: 'var(--sp-2)' } });
    const sparkCanvas = el('canvas');
    sparkContainer.appendChild(sparkCanvas);
    container.appendChild(sparkContainer);

    setTimeout(() => {
        createSparkline(sparkCanvas, d.sparklineData, '#fbbf24');
    }, 300);
}

function metricRow(label, value, status = '') {
    return el('div', { className: 'metric-row' }, [
        el('span', { className: 'metric-label', textContent: label }),
        el('span', { className: `metric-value ${status}`, textContent: value })
    ]);
}
