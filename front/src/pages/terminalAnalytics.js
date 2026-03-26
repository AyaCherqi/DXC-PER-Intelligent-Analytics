// ============================================
// Perth Airport – Terminal Analytics Page
// Full KPI Coverage: All 36 KPIs × 5 Domains × 5 Terminals
// ============================================
import { el, $, icons, bus } from '../utils/helpers.js';
import { createSparkline, createDoughnut, createBarChart } from '../utils/charts.js';
import { zones } from '../data/mockData.js';
import { terminalKpiData } from '../data/terminalKpiData.js';

const terminals = [
    { id: 't1-international', label: 'T1 International', color: '#38bdf8' },
    { id: 't1-domestic', label: 'T1 Domestic', color: '#22d3ee' },
    { id: 't2-regional', label: 'T2 Regional', color: '#a78bfa' },
    { id: 't3-qantas', label: 'T3 Qantas', color: '#4ade80' },
    { id: 't4-qantas', label: 'T4 Qantas', color: '#fbbf24' },
];

let activeTerminal = 't1-international';
let chartInstances = [];

export function initTerminalAnalytics(container, terminalId) {
    if (terminalId && terminals.find(t => t.id === terminalId)) {
        activeTerminal = terminalId;
    }
    container.innerHTML = '';
    container.classList.add('full-page');

    // Page Header
    container.appendChild(el('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--sp-4)' }
    }, [
        el('div', {}, [
            el('h1', {
                style: { fontFamily: 'var(--font-display)', fontSize: 'var(--fs-2xl)', fontWeight: '700', color: 'var(--text-primary)', marginBottom: 'var(--sp-1)' },
                textContent: 'Terminal Analytics'
            }),
            el('p', {
                style: { fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' },
                textContent: 'KPI Intelligence by Domain • Operational & Predictive per Terminal'
            })
        ]),
        el('span', {
            style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '6px' },
            innerHTML: `<span style="width:6px;height:6px;border-radius:50%;background:var(--accent-green-bright);display:inline-block;animation:pulse 2s infinite"></span> Live Data`
        })
    ]));

    // Terminal Tabs
    const tabBar = el('div', { className: 'terminal-tabs', id: 'terminal-tab-bar' });
    terminals.forEach(t => {
        const zone = zones.find(z => z.id === t.id);
        const paxPct = zone ? Math.round((zone.pax / zone.capacity) * 100) : 0;
        const paxColor = paxPct > 80 ? '#ef4444' : paxPct > 60 ? '#fbbf24' : '#4ade80';
        const tab = el('button', {
            className: `terminal-tab ${t.id === activeTerminal ? 'active' : ''}`,
            dataset: { terminal: t.id },
            style: { '--tab-color': t.color },
            onClick: () => {
                activeTerminal = t.id;
                tabBar.querySelectorAll('.terminal-tab').forEach(b => b.classList.remove('active'));
                tab.classList.add('active');
                renderContent(container);
            }
        });
        tab.innerHTML = `<div class="terminal-tab-name">${t.label}</div><div class="terminal-tab-meta"><span style="color:${paxColor};font-weight:700;font-size:11px;">${paxPct}%</span><span style="color:var(--text-muted);font-size:10px;">load</span></div>`;
        tabBar.appendChild(tab);
    });
    container.appendChild(tabBar);

    const contentArea = el('div', { id: 'terminal-content-area' });
    container.appendChild(contentArea);
    renderContent(container);
}

function renderContent(container) {
    chartInstances.forEach(c => { try { c.destroy(); } catch(e) {} });
    chartInstances = [];

    const area = container.querySelector('#terminal-content-area');
    area.innerHTML = '';

    const data = terminalKpiData[activeTerminal];
    if (!data) {
        area.appendChild(el('div', { style: { padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }, textContent: 'No data available.' }));
        return;
    }

    const domains = [
        { key: 'passengerFlow', title: 'Passenger Flow & Queue Management', dot: 'green', icon: '👥', render: renderPassengerFlow },
        { key: 'resourceScheduling', title: 'Resource Scheduling & Gate Assignment', dot: 'cyan', icon: '🛫', render: renderResourceScheduling },
        { key: 'baggageThreat', title: 'Threat Detection & Abandoned Baggage', dot: 'red', icon: '🛡', render: renderBaggageThreat },
        { key: 'sustainability', title: 'Sustainability & Energy Optimization', dot: 'purple', icon: '⚡', render: renderSustainability },
        { key: 'customerExperience', title: 'Customer Experience & Retail', dot: 'amber', icon: '🛍', render: renderCustomerExperience },
    ];

    domains.forEach(d => {
        if (data[d.key]) {
            const section = el('div', { className: 'domain-section' });

            // Domain header
            const header = el('div', { className: 'domain-section-header' });
            header.innerHTML = `<span class="section-dot ${d.dot}"></span><span>${d.title}</span>`;
            section.appendChild(header);

            // Content: operational + predictive columns
            const content = el('div', { className: 'domain-section-content' });
            d.render(content, data[d.key]);
            section.appendChild(content);
            area.appendChild(section);
        }
    });
}

// ════════════════════════════════════════════
// DOMAIN 1: Passenger Flow
// ════════════════════════════════════════════
function renderPassengerFlow(container, data) {
    const op = data.operational;
    const pr = data.predictive;

    const grid = el('div', { className: 'kpi-two-col' });

    // ── Operational Column ──
    const opCol = el('div', { className: 'kpi-column' });
    opCol.appendChild(columnHeader('Operational', 'var(--accent-green-bright)'));

    // Congestion gauge
    const gaugeRow = el('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' } });
    const gaugeW = el('div', { style: { width: '76px', height: '76px', position: 'relative', flexShrink: '0' } });
    const gC = el('canvas', { width: '76', height: '76' });
    gaugeW.appendChild(gC);
    const gColor = statusColor(op.congestionScore.status);
    gaugeW.appendChild(el('div', {
        style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' },
        innerHTML: `<div style="font-family:var(--font-display);font-size:18px;font-weight:700;color:${gColor}">${op.congestionScore.value}</div><div style="font-size:7px;color:var(--text-muted)">SCORE</div>`
    }));
    gaugeRow.appendChild(gaugeW);
    const mCol = el('div', { style: { flex: '1' } });
    mCol.appendChild(kpiRow('KPI 1.1 — Density', `${op.density.value} ${op.density.unit}`, op.density.status));
    mCol.appendChild(kpiRow('KPI 1.2 — Flow Rate', `${op.flowRate.value} ${op.flowRate.unit}`, op.flowRate.status));
    mCol.appendChild(kpiRow('KPI 1.3 — Avg Wait', `${op.avgWaitTime.value} ${op.avgWaitTime.unit}`, op.avgWaitTime.status));
    gaugeRow.appendChild(mCol);
    opCol.appendChild(gaugeRow);

    opCol.appendChild(kpiRow('KPI 1.4 — Congestion', `${op.congestionScore.value}/100`, op.congestionScore.status));

    // Thresholds display
    opCol.appendChild(thresholdBar(op.congestionScore.value, op.congestionScore.bands));

    // Sparkline
    if (op.congestionScore.sparkline) {
        const sc = el('div', { className: 'chart-container short' });
        const cv = el('canvas');
        sc.appendChild(cv);
        opCol.appendChild(sc);
        setTimeout(() => {
            chartInstances.push(createSparkline(cv, op.congestionScore.sparkline, gColor));
            chartInstances.push(createDoughnut(gC, op.congestionScore.value, 100, gColor));
        }, 100);
    }

    grid.appendChild(opCol);

    // ── Predictive Column ──
    const prCol = el('div', { className: 'kpi-column' });
    prCol.appendChild(columnHeader('Predictive', 'var(--accent-cyan)'));
    prCol.appendChild(kpiRow('KPI 1.5 — Occupancy +30m', `${pr.predictedOccupancy30.value}%`, pr.predictedOccupancy30.status, pr.predictedOccupancy30.confidence));
    prCol.appendChild(kpiRow('KPI 1.6 — Occupancy +60m', `${pr.predictedOccupancy60.value}%`, pr.predictedOccupancy60.status, pr.predictedOccupancy60.confidence));
    prCol.appendChild(kpiRow('KPI 1.7 — Required Lanes', `${pr.requiredLanes.value}`, 'good', `Current: ${pr.requiredLanes.current}`));
    prCol.appendChild(kpiRow('KPI 1.8 — Staffing Fcst', `${pr.staffingForecast.value} ${pr.staffingForecast.unit}`, pr.staffingForecast.status, pr.staffingForecast.multiplier));
    prCol.appendChild(kpiRow('KPI 1.9 — Avoided Delay', `${pr.avoidedDelayMin.value} ${pr.avoidedDelayMin.unit}`, 'good'));

    // Occupancy bar chart
    const bc = el('div', { className: 'chart-container', style: { height: '90px', marginTop: '8px' } });
    const bv = el('canvas');
    bc.appendChild(bv);
    prCol.appendChild(bc);
    setTimeout(() => {
        chartInstances.push(createBarChart(bv,
            ['+30m', '+60m', 'Lanes', 'Staff'],
            [pr.predictedOccupancy30.value, pr.predictedOccupancy60.value, pr.requiredLanes.value * 8, pr.staffingForecast.value],
            ['#38bdf8', '#22d3ee', '#4ade80', '#fbbf24']
        ));
    }, 200);

    grid.appendChild(prCol);
    container.appendChild(grid);
}

// ════════════════════════════════════════════
// DOMAIN 2: Resource Scheduling
// ════════════════════════════════════════════
function renderResourceScheduling(container, data) {
    const op = data.operational;
    const pr = data.predictive;
    const grid = el('div', { className: 'kpi-two-col' });

    const opCol = el('div', { className: 'kpi-column' });
    opCol.appendChild(columnHeader('Operational', 'var(--accent-green-bright)'));
    opCol.appendChild(kpiRowBar('KPI 2.1 — Staff Efficiency', `${op.staffEfficiency.value}%`, op.staffEfficiency.value, op.staffEfficiency.status));
    opCol.appendChild(kpiRowBar('KPI 2.2 — On-Time Boarding', `${op.onTimeBoardingRate.value}%`, op.onTimeBoardingRate.value, op.onTimeBoardingRate.status));
    opCol.appendChild(kpiRowBar('KPI 2.3 — On-Time Departure', `${op.onTimeDepartureRate.value}%`, op.onTimeDepartureRate.value, op.onTimeDepartureRate.status));

    if (op.staffEfficiency.sparkline) {
        const sc = el('div', { className: 'chart-container short', style: { marginTop: '8px' } });
        const cv = el('canvas');
        sc.appendChild(cv);
        opCol.appendChild(sc);
        setTimeout(() => { chartInstances.push(createSparkline(cv, op.staffEfficiency.sparkline, '#22d3ee')); }, 150);
    }

    grid.appendChild(opCol);

    const prCol = el('div', { className: 'kpi-column' });
    prCol.appendChild(columnHeader('Predictive', 'var(--accent-cyan)'));
    prCol.appendChild(kpiRow('KPI 2.4 — Turnaround Fcst', `${pr.turnaroundForecast.value} ${pr.turnaroundForecast.unit}`, pr.turnaroundForecast.status, `MAE: ${pr.turnaroundForecast.mae} min`));
    prCol.appendChild(kpiRow('KPI 2.5 — Gate Reassign', `${pr.gateReassignmentScore.value} ${pr.gateReassignmentScore.unit}`, pr.gateReassignmentScore.status));
    prCol.appendChild(kpiRow('KPI 2.6 — Delay Propagation', `${pr.delayPropagation.value} ${pr.delayPropagation.unit}`, pr.delayPropagation.status, `Threshold: ${pr.delayPropagation.threshold}`));

    const bc = el('div', { className: 'chart-container', style: { height: '90px', marginTop: '8px' } });
    const bv = el('canvas');
    bc.appendChild(bv);
    prCol.appendChild(bc);
    setTimeout(() => {
        chartInstances.push(createBarChart(bv,
            ['Turnaround', 'Gate Score', 'Delay'],
            [pr.turnaroundForecast.value, pr.gateReassignmentScore.value, pr.delayPropagation.value / 10],
            ['#38bdf8', '#4ade80', pr.delayPropagation.status === 'critical' ? '#ef4444' : '#fbbf24']
        ));
    }, 250);

    grid.appendChild(prCol);
    container.appendChild(grid);
}

// ════════════════════════════════════════════
// DOMAIN 3: Threat Detection
// ════════════════════════════════════════════
function renderBaggageThreat(container, data) {
    const op = data.operational;
    const pr = data.predictive;
    const grid = el('div', { className: 'kpi-two-col' });

    const opCol = el('div', { className: 'kpi-column' });
    opCol.appendChild(columnHeader('Operational', 'var(--accent-green-bright)'));

    // Alert banner if intrusions
    if (op.intrusionsDetected.value > 0) {
        const banner = el('div', { className: 'kpi-alert-banner' });
        banner.innerHTML = `<span style="width:8px;height:8px;border-radius:50%;background:var(--accent-red);animation:pulse 1.5s infinite"></span> ${op.intrusionsDetected.value} intrusion(s) • ${op.suspiciousBehavior.value} suspicious behavior`;
        opCol.appendChild(banner);
    }

    opCol.appendChild(kpiRow('KPI 3.1 — Bags at Risk', `${op.bagsAtRisk.value}%`, op.bagsAtRisk.status));
    opCol.appendChild(kpiRow('KPI 3.2 — Intrusions', `${op.intrusionsDetected.value}`, op.intrusionsDetected.status));
    opCol.appendChild(kpiRow('KPI 3.3 — Suspicious Behavior', `${op.suspiciousBehavior.value}`, op.suspiciousBehavior.status));

    if (op.bagsAtRisk.sparkline) {
        const sc = el('div', { className: 'chart-container short', style: { marginTop: '8px' } });
        const cv = el('canvas');
        sc.appendChild(cv);
        opCol.appendChild(sc);
        setTimeout(() => { chartInstances.push(createSparkline(cv, op.bagsAtRisk.sparkline, '#ef4444')); }, 200);
    }

    grid.appendChild(opCol);

    const prCol = el('div', { className: 'kpi-column' });
    prCol.appendChild(columnHeader('Predictive', 'var(--accent-cyan)'));

    // Threat risk gauge
    const gaugeRow = el('div', { style: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' } });
    const gW = el('div', { style: { width: '76px', height: '76px', position: 'relative', flexShrink: '0' } });
    const gCv = el('canvas', { width: '76', height: '76' });
    gW.appendChild(gCv);
    const tColor = pr.threatRiskScore.value > 50 ? '#ef4444' : pr.threatRiskScore.value > 25 ? '#fbbf24' : '#4ade80';
    gW.appendChild(el('div', {
        style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' },
        innerHTML: `<div style="font-family:var(--font-display);font-size:16px;font-weight:700;color:${tColor}">${pr.threatRiskScore.value}</div><div style="font-size:7px;color:var(--text-muted)">RISK</div>`
    }));
    gaugeRow.appendChild(gW);
    const tCol = el('div', { style: { flex: '1' } });
    tCol.appendChild(kpiRow('KPI 3.4 — Threat Risk', `${pr.threatRiskScore.value}/100`, pr.threatRiskScore.status));
    tCol.appendChild(kpiRow('KPI 3.5 — Resolution Time', `${pr.avgResolutionTime.value} ${pr.avgResolutionTime.unit}`, pr.avgResolutionTime.status));
    gaugeRow.appendChild(tCol);
    prCol.appendChild(gaugeRow);

    setTimeout(() => { chartInstances.push(createDoughnut(gCv, pr.threatRiskScore.value, 100, tColor)); }, 300);

    prCol.appendChild(thresholdBar(pr.threatRiskScore.value, pr.threatRiskScore.bands));

    grid.appendChild(prCol);
    container.appendChild(grid);
}

// ════════════════════════════════════════════
// DOMAIN 4: Sustainability
// ════════════════════════════════════════════
function renderSustainability(container, data) {
    const op = data.operational;
    const pr = data.predictive;
    const grid = el('div', { className: 'kpi-two-col' });

    const opCol = el('div', { className: 'kpi-column' });
    opCol.appendChild(columnHeader('Operational', 'var(--accent-green-bright)'));

    // Carbon banner
    const cBanner = el('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.15)', borderRadius: '8px', marginBottom: '10px' } });
    cBanner.innerHTML = `<div style="font-size:20px;font-weight:700;color:#a78bfa;font-family:var(--font-display)">${op.carbonFootprint.value}</div><div><div style="font-size:10px;color:var(--text-secondary)">${op.carbonFootprint.unit}</div><div style="font-size:10px;color:var(--text-muted)">Grid: ${op.carbonFootprint.gridFactor} kgCO₂/kWh</div></div>`;
    opCol.appendChild(cBanner);

    opCol.appendChild(kpiRow('KPI 4.1 — Carbon Footprint', `${op.carbonFootprint.value} ${op.carbonFootprint.unit}`, op.carbonFootprint.status));
    opCol.appendChild(kpiRow('KPI 4.2 — Energy', `${op.energyConsumption.value} ${op.energyConsumption.unit}`, 'good', `Peak: ${op.energyConsumption.peak} MW`));
    opCol.appendChild(kpiRowBar('HVAC Share', `${op.energyConsumption.hvacShare}%`, op.energyConsumption.hvacShare, op.energyConsumption.hvacShare > 55 ? 'warning' : 'good'));
    opCol.appendChild(kpiRow('KPI 4.3 — Power Demand', `${op.powerDemand.value} ${op.powerDemand.unit}`, op.powerDemand.status, `PF: ${op.powerDemand.powerFactor}`));

    if (op.energyConsumption.sparkline) {
        const sc = el('div', { className: 'chart-container short', style: { marginTop: '8px' } });
        const cv = el('canvas');
        sc.appendChild(cv);
        opCol.appendChild(sc);
        setTimeout(() => { chartInstances.push(createSparkline(cv, op.energyConsumption.sparkline, '#a78bfa')); }, 250);
    }

    grid.appendChild(opCol);

    const prCol = el('div', { className: 'kpi-column' });
    prCol.appendChild(columnHeader('Predictive', 'var(--accent-cyan)'));
    prCol.appendChild(kpiRow('KPI 4.4 — Peak +30m', `${pr.energyPeak30.value} ${pr.energyPeak30.unit}`, pr.energyPeak30.status));
    prCol.appendChild(kpiRow('KPI 4.4 — Peak +60m', `${pr.energyPeak60.value} ${pr.energyPeak60.unit}`, pr.energyPeak60.status));
    prCol.appendChild(kpiRow('KPI 4.5 — Overconsumption', `${pr.overconsumptionRisk.value}%`, pr.overconsumptionRisk.status, `Threshold: ${pr.overconsumptionRisk.threshold}%`));
    prCol.appendChild(kpiRow('KPI 4.6 — Cost Savings', `${pr.costSavings.value}%`, pr.costSavings.status, `Target: ≥${pr.costSavings.target}%`));

    const bc = el('div', { className: 'chart-container', style: { height: '90px', marginTop: '8px' } });
    const bv = el('canvas');
    bc.appendChild(bv);
    prCol.appendChild(bc);
    setTimeout(() => {
        chartInstances.push(createBarChart(bv,
            ['Now', '+30m', '+60m', 'Risk%'],
            [op.energyConsumption.value * 100, pr.energyPeak30.value * 100, pr.energyPeak60.value * 100, pr.overconsumptionRisk.value],
            ['#a78bfa', '#38bdf8', '#22d3ee', pr.overconsumptionRisk.status === 'warning' ? '#fbbf24' : '#4ade80']
        ));
    }, 350);

    grid.appendChild(prCol);
    container.appendChild(grid);
}

// ════════════════════════════════════════════
// DOMAIN 5: Customer Experience
// ════════════════════════════════════════════
function renderCustomerExperience(container, data) {
    const op = data.operational;
    const pr = data.predictive;
    const grid = el('div', { className: 'kpi-two-col' });

    const opCol = el('div', { className: 'kpi-column' });
    opCol.appendChild(columnHeader('Operational', 'var(--accent-green-bright)'));
    opCol.appendChild(kpiRow('KPI 5.1 — Chatbot Time', `${op.chatbotResponseTime.value} ${op.chatbotResponseTime.unit}`, op.chatbotResponseTime.status, `P99: ${op.chatbotResponseTime.p99}s`));
    opCol.appendChild(kpiRowBar('KPI 5.2 — Resolution Rate', `${op.resolutionRate.value}%`, op.resolutionRate.value, op.resolutionRate.status));
    opCol.appendChild(kpiRow('KPI 5.3 — Engagement', `${op.engagementRate.value}%`, op.engagementRate.status, `DAU/MAU: ${op.engagementRate.dauMau}%`));
    opCol.appendChild(kpiRow('KPI 5.4 — Retail Footfall', `${op.retailFootfall.value.toLocaleString()} ${op.retailFootfall.unit}`, op.retailFootfall.status, `Conv: ${op.retailFootfall.conversion}%`));
    opCol.appendChild(kpiRow('KPI 5.5 — Ad Performance', `${op.adPerformance.value} ${op.adPerformance.unit}`, op.adPerformance.status, `Fill: ${op.adPerformance.fillRate}%`));
    opCol.appendChild(kpiRow('KPI 5.6 — CTR', `${op.ctr.interactive}% / ${op.ctr.passive}%`, op.ctr.status, 'Interactive / Passive'));

    grid.appendChild(opCol);

    const prCol = el('div', { className: 'kpi-column' });
    prCol.appendChild(columnHeader('Predictive', 'var(--accent-cyan)'));
    prCol.appendChild(kpiRow('KPI 5.7 — Retail Traffic', pr.predictedRetailTraffic.value, pr.predictedRetailTraffic.status, pr.predictedRetailTraffic.event));
    prCol.appendChild(kpiRow('KPI 5.8 — Event Demand', pr.eventDemandForecast.value, pr.eventDemandForecast.status, `Scenario: ${pr.eventDemandForecast.scenario}`));
    prCol.appendChild(kpiRow('KPI 5.9 — Conv. Probability', `${pr.conversionProbability.value}%`, pr.conversionProbability.status, `Target: >${pr.conversionProbability.target}%`));
    prCol.appendChild(kpiRow('KPI 5.10 — Revenue Uplift', `${pr.revenueUplift.value}%`, pr.revenueUplift.status, `p${pr.revenueUplift.pValue}`));

    // Satisfaction gauge
    const gaugeR = el('div', { style: { display: 'flex', justifyContent: 'center', marginTop: '12px' } });
    const gW = el('div', { style: { width: '80px', height: '80px', position: 'relative' } });
    const gCv = el('canvas', { width: '80', height: '80' });
    gW.appendChild(gCv);
    const rColor = pr.revenueUplift.value >= pr.revenueUplift.target ? '#4ade80' : '#fbbf24';
    gW.appendChild(el('div', {
        style: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' },
        innerHTML: `<div style="font-family:var(--font-display);font-size:14px;font-weight:700;color:${rColor}">${pr.revenueUplift.value}%</div><div style="font-size:7px;color:var(--text-muted)">UPLIFT</div>`
    }));
    gaugeR.appendChild(gW);
    prCol.appendChild(gaugeR);
    setTimeout(() => { chartInstances.push(createDoughnut(gCv, pr.revenueUplift.value, 30, rColor)); }, 400);

    grid.appendChild(prCol);
    container.appendChild(grid);
}

// ════════════════════════════════════════════
// Shared UI Helpers
// ════════════════════════════════════════════

function columnHeader(text, color) {
    return el('div', {
        style: { fontSize: '10px', color, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' },
        innerHTML: `<span style="width:6px;height:6px;border-radius:50%;background:${color}"></span> ${text}`
    });
}

function kpiRow(label, value, status = '', subtitle = '') {
    const row = el('div', { className: 'metric-row' }, [
        el('div', { style: { flex: '1', minWidth: '0' } }, [
            el('span', { className: 'metric-label', textContent: label }),
            ...(subtitle ? [el('div', { style: { fontSize: '9px', color: 'var(--text-muted)', marginTop: '1px' }, textContent: subtitle })] : [])
        ]),
        el('span', { className: `metric-value ${mapStatus(status)}`, textContent: value || '—' })
    ]);
    return row;
}

function kpiRowBar(label, value, pct, status) {
    return el('div', { style: { marginBottom: '6px' } }, [
        el('div', { className: 'metric-row', style: { borderBottom: 'none', paddingBottom: '2px' } }, [
            el('span', { className: 'metric-label', textContent: label }),
            el('span', { className: `metric-value ${mapStatus(status)}`, textContent: value })
        ]),
        el('div', { className: 'progress-bar' }, [
            el('div', { className: `progress-fill ${barColor(status)}`, style: { width: `${Math.min(pct, 100)}%` } })
        ])
    ]);
}

function thresholdBar(value, bands) {
    const bar = el('div', { style: { display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden', marginTop: '6px', marginBottom: '6px', gap: '1px' } });
    const greenPct = bands.green;
    const amberPct = bands.amber - bands.green;
    const redPct = bands.high ? bands.high - bands.amber : 100 - bands.amber;
    bar.innerHTML = `
        <div style="flex:${greenPct};background:#4ade80;border-radius:3px 0 0 3px;position:relative">
            ${value <= bands.green ? `<div style="position:absolute;right:0;top:-2px;width:2px;height:10px;background:white;border-radius:1px"></div>` : ''}
        </div>
        <div style="flex:${amberPct};background:#fbbf24;position:relative">
            ${value > bands.green && value <= bands.amber ? `<div style="position:absolute;left:${((value-bands.green)/amberPct)*100}%;top:-2px;width:2px;height:10px;background:white;border-radius:1px"></div>` : ''}
        </div>
        <div style="flex:${redPct};background:#ef4444;border-radius:0 3px 3px 0;position:relative">
            ${value > bands.amber ? `<div style="position:absolute;left:${Math.min(((value-bands.amber)/redPct)*100, 95)}%;top:-2px;width:2px;height:10px;background:white;border-radius:1px"></div>` : ''}
        </div>
    `;
    const labels = el('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: 'var(--text-muted)', marginTop: '2px' } });
    labels.innerHTML = `<span>0</span><span>${bands.green}</span><span>${bands.amber}</span><span>${bands.high || 100}</span>`;
    const wrapper = el('div');
    wrapper.appendChild(bar);
    wrapper.appendChild(labels);
    return wrapper;
}

function statusColor(status) {
    const map = { good: '#4ade80', warning: '#fbbf24', critical: '#ef4444', red: '#ef4444', amber: '#fbbf24' };
    return map[status] || '#4ade80';
}

function mapStatus(status) {
    const map = { good: 'good', warning: 'warning', critical: 'critical', red: 'critical', amber: 'warning' };
    return map[status] || '';
}

function barColor(status) {
    const map = { good: 'green', warning: 'amber', critical: 'red', red: 'red', amber: 'amber' };
    return map[status] || 'green';
}
