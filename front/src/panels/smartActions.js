// ============================================
// Smart Actions – Orchestrator Panel
// ============================================
import { el } from '../utils/helpers.js';
import { smartActions } from '../data/mockData.js';

export function initSmartActions(container) {
    // Panel intro
    const intro = el('div', {
        style: {
            padding: 'var(--sp-2) var(--sp-3)',
            background: 'rgba(167,139,250,0.06)',
            border: '1px solid rgba(167,139,250,0.15)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--sp-3)',
            fontSize: 'var(--fs-xs)', color: 'var(--accent-purple)'
        },
        innerHTML: '<strong>Orchestrator AI</strong> — Cross-domain strategic recommendations'
    });
    container.appendChild(intro);

    smartActions.forEach((action, idx) => {
        const card = el('div', { className: 'action-card', style: { animationDelay: `${idx * 100}ms` } });

        // Priority & Title
        const priorityRow = el('div', { className: 'action-priority' }, [
            el('span', { className: 'action-score', textContent: action.priority }),
            el('span', {
                style: {
                    fontSize: 'var(--fs-xs)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-sm)',
                    background: getImpactBg(action.impact),
                    color: getImpactColor(action.impact)
                },
                textContent: action.impact
            })
        ]);
        card.appendChild(priorityRow);

        // Title
        card.appendChild(el('div', {
            style: { fontSize: 'var(--fs-sm)', fontWeight: '600', color: 'var(--text-primary)', marginBottom: 'var(--sp-2)', lineHeight: '1.4' },
            textContent: action.title
        }));

        // Description
        card.appendChild(el('div', {
            style: { fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)', marginBottom: 'var(--sp-2)', lineHeight: '1.5' },
            textContent: action.description
        }));

        // Meta
        const meta = el('div', { className: 'action-meta' });
        meta.appendChild(metaItem('Confidence', `${action.confidence}%`));
        meta.appendChild(metaItem('Zones', action.zones.join(', ')));
        meta.appendChild(metaItem('Alerts', action.linkedAlerts.join(', ')));
        card.appendChild(meta);

        // Benefit
        card.appendChild(el('div', {
            style: {
                fontSize: 'var(--fs-xs)', color: 'var(--accent-green-bright)',
                padding: 'var(--sp-2) var(--sp-3)',
                background: 'rgba(74,222,128,0.06)',
                borderRadius: 'var(--radius-sm)',
                marginTop: 'var(--sp-2)'
            },
            textContent: `↑ ${action.benefit}`
        }));

        // Action Buttons
        const buttons = el('div', { className: 'action-buttons' });
        buttons.appendChild(el('button', { className: 'btn btn-sm btn-success', textContent: 'Accept', onClick: () => acceptAction(card, action) }));
        buttons.appendChild(el('button', { className: 'btn btn-sm btn-primary', textContent: 'Modify' }));
        buttons.appendChild(el('button', { className: 'btn btn-sm', textContent: 'Dismiss' }));
        buttons.appendChild(el('button', { className: 'btn btn-sm btn-danger', textContent: 'Escalate' }));
        card.appendChild(buttons);

        container.appendChild(card);
    });
}

function metaItem(label, value) {
    return el('div', { className: 'action-meta-item' }, [
        el('span', { style: { color: 'var(--text-muted)' }, textContent: `${label}: ` }),
        document.createTextNode(value)
    ]);
}

function getImpactBg(impact) {
    const map = {
        'Operational': 'rgba(56,189,248,0.1)',
        'Financial': 'rgba(74,222,128,0.1)',
        'Security': 'rgba(239,68,68,0.1)',
        'Strategic': 'rgba(167,139,250,0.1)'
    };
    return map[impact] || map.Operational;
}

function getImpactColor(impact) {
    const map = {
        'Operational': 'var(--accent-cyan)',
        'Financial': 'var(--accent-green-bright)',
        'Security': 'var(--accent-red)',
        'Strategic': 'var(--accent-purple)'
    };
    return map[impact] || map.Operational;
}

function acceptAction(card, action) {
    card.style.borderColor = 'var(--accent-green-bright)';
    card.style.opacity = '0.7';
    const badge = el('div', {
        style: {
            position: 'absolute', top: 'var(--sp-2)', right: 'var(--sp-2)',
            background: 'var(--accent-green-bright)', color: 'var(--bg-primary)',
            padding: '2px 8px', borderRadius: 'var(--radius-sm)',
            fontSize: 'var(--fs-xs)', fontWeight: '600'
        },
        textContent: 'ACCEPTED'
    });
    card.appendChild(badge);
}
