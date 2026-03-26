// ============================================
// PER Smart Airport – KPI Panel (Right Side)
// ============================================
import { el, $, bus, icons } from '../utils/helpers.js';
import { initPassengerFlow } from './passengerFlow.js';
import { initResourceScheduling } from './resourceScheduling.js';
import { initBaggageThreat } from './baggageThreat.js';
import { initSustainability } from './sustainability.js';
import { initCustomerExperience } from './customerExperience.js';
import { initExecutiveView } from './executiveView.js';
import { initSmartActions } from './smartActions.js';

let currentMode = 'operational';

export function initKpiPanel() {
    renderOperational();

    bus.on('mode:toggle', (mode) => {
        currentMode = mode;
        if (mode === 'executive') renderExecutive();
        else renderOperational();
    });
}

function renderOperational() {
    const panel = $('#right-panel');
    panel.innerHTML = '';

    // Panel header
    const header = el('div', {
        style: {
            padding: 'var(--sp-3) var(--sp-4)',
            borderBottom: '1px solid var(--border-secondary)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }
    }, [
        el('span', {
            style: { fontFamily: 'var(--font-display)', fontSize: 'var(--fs-sm)', fontWeight: '600', color: 'var(--text-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' },
            textContent: 'Operations Intelligence'
        }),
        el('span', {
            style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '4px' },
            innerHTML: `<span style="width:6px;height:6px;border-radius:50%;background:var(--accent-green-bright);display:inline-block;animation:pulse 2s infinite"></span> Live`
        })
    ]);
    panel.appendChild(header);

    // Modules container
    const modules = el('div', { id: 'kpi-modules' });

    // Create collapsible sections
    const sections = [
        { id: 'passenger-flow', title: 'Passenger Flow & Queue', dot: 'green', init: initPassengerFlow, open: true },
        { id: 'resource-scheduling', title: 'Resource & Gate Ops', dot: 'cyan', init: initResourceScheduling, open: false },
        { id: 'baggage-threat', title: 'Baggage & Threat Detection', dot: 'red', init: initBaggageThreat, open: false },
        { id: 'sustainability', title: 'Sustainability & Energy', dot: 'purple', init: initSustainability, open: false },
        { id: 'customer-exp', title: 'Customer & Retail', dot: 'amber', init: initCustomerExperience, open: false },
        { id: 'smart-actions', title: 'Smart Actions', dot: 'purple', init: initSmartActions, open: false },
    ];

    sections.forEach((sec, idx) => {
        const collapsible = el('div', { className: `collapsible ${sec.open ? 'open' : ''}`, id: `section-${sec.id}` });
        const headerEl = el('div', { className: 'collapsible-header' }, [
            el('div', { className: 'collapsible-title' }, [
                el('span', { className: `section-dot ${sec.dot}` }),
                document.createTextNode(sec.title)
            ]),
            el('span', { className: 'collapsible-icon', innerHTML: icons.chevronDown, style: { width: '14px', height: '14px' } })
        ]);
        const body = el('div', { className: 'collapsible-body' });
        const content = el('div', { className: 'collapsible-content', id: `content-${sec.id}` });
        body.appendChild(content);

        headerEl.addEventListener('click', () => {
            collapsible.classList.toggle('open');
        });

        collapsible.append(headerEl, body);
        modules.appendChild(collapsible);

        // Init content
        setTimeout(() => sec.init(content), idx * 50);
    });

    panel.appendChild(modules);
}

function renderExecutive() {
    const panel = $('#right-panel');
    panel.innerHTML = '';

    const header = el('div', {
        style: {
            padding: 'var(--sp-3) var(--sp-4)',
            borderBottom: '1px solid var(--border-secondary)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }
    }, [
        el('span', {
            style: { fontFamily: 'var(--font-display)', fontSize: 'var(--fs-sm)', fontWeight: '600', color: 'var(--accent-amber)', letterSpacing: '0.05em', textTransform: 'uppercase' },
            textContent: 'Executive Intelligence'
        }),
        el('span', {
            style: { fontSize: 'var(--fs-xs)', color: 'var(--accent-amber)' },
            textContent: 'Strategic View'
        })
    ]);
    panel.appendChild(header);

    const content = el('div', { style: { padding: 'var(--sp-4)' }, id: 'exec-content' });
    panel.appendChild(content);
    initExecutiveView(content);
}
