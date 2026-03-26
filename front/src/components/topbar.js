// ============================================
// Perth Airport – Top Bar Component
// ============================================
import { el, $, icons, bus } from '../utils/helpers.js';

const suggestions = [
    'Show congestion risk in next 30 minutes',
    'Predict gate conflicts for Terminal 1',
    'Display energy peak forecast for T3',
    'Show FIFO charter terminal demand',
    'Predict baggage handling bottlenecks',
    'Show passenger flow for T1 Immigration',
];

let isExecMode = false;

export function initTopbar() {
    const topbar = $('#topbar');
    topbar.innerHTML = '';

    // NLQ Bar
    const nlqBar = el('div', { className: 'nlq-bar' });
    const nlqIcon = el('span', { className: 'nlq-icon', innerHTML: `<span style="width:16px;height:16px;display:inline-flex">${icons.search}</span>` });
    const nlqInput = el('input', {
        className: 'nlq-input',
        type: 'text',
        placeholder: 'Ask the Airport AI…',
        id: 'nlq-input'
    });

    const nlqSuggestions = el('div', { className: 'nlq-suggestions', id: 'nlq-suggestions' });
    suggestions.forEach(s => {
        const item = el('div', { className: 'nlq-suggestion-item' }, [
            el('span', { className: 'nlq-hint', textContent: '→ ' }),
            document.createTextNode(s)
        ]);
        item.addEventListener('click', () => {
            nlqInput.value = s;
            nlqSuggestions.classList.remove('visible');
            bus.emit('nlq:query', s);
        });
        nlqSuggestions.appendChild(item);
    });

    nlqInput.addEventListener('focus', () => nlqSuggestions.classList.add('visible'));
    nlqInput.addEventListener('blur', () => setTimeout(() => nlqSuggestions.classList.remove('visible'), 200));
    nlqInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && nlqInput.value.trim()) {
            nlqSuggestions.classList.remove('visible');
            bus.emit('nlq:query', nlqInput.value.trim());
        }
    });

    nlqBar.append(nlqIcon, nlqInput, nlqSuggestions);
    topbar.appendChild(nlqBar);

    // Spacer
    topbar.appendChild(el('div', { style: { flex: '1' } }));

    // Executive Mode Toggle
    const execToggle = el('div', { className: 'toggle-switch', id: 'exec-toggle' });
    const execLabel = el('span', { className: 'toggle-label', textContent: 'Executive' });
    const execTrack = el('div', { className: 'toggle-track' }, [
        el('div', { className: 'toggle-thumb' })
    ]);
    execToggle.append(execLabel, execTrack);
    execToggle.addEventListener('click', () => {
        isExecMode = !isExecMode;
        execTrack.classList.toggle('active', isExecMode);
        bus.emit('mode:toggle', isExecMode ? 'executive' : 'operational');
    });
    topbar.appendChild(execToggle);

    // Notification Bell
    const bellWrapper = el('div', { style: { position: 'relative', cursor: 'pointer' }, id: 'bell-wrapper' });
    const bellBtn = el('div', {
        className: 'btn-icon',
        innerHTML: `<div style="width:18px;height:18px;color:var(--text-secondary)">${icons.bell}</div>`,
        style: { display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }
    });
    const bellBadge = el('span', { className: 'badge-counter', textContent: '5', id: 'bell-badge' });
    bellWrapper.append(bellBtn, bellBadge);
    bellWrapper.addEventListener('click', (e) => {
        e.stopPropagation();
        bus.emit('notifications:toggle');
    });
    topbar.appendChild(bellWrapper);

    // User Avatar
    const avatar = el('div', {
        style: {
            width: '32px', height: '32px', borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, #38bdf8, #a78bfa)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 'var(--fs-sm)', fontWeight: '600', cursor: 'pointer'
        },
        textContent: 'PA'
    });
    topbar.appendChild(avatar);
}
