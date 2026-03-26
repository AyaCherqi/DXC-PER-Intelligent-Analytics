// ============================================
// KSIA Smart Airport – Timeline Component
// ============================================
import { el, $, icons, bus } from '../utils/helpers.js';
import { timelineData } from '../data/mockData.js';

export function initTimeline() {
    const timeline = $('#timeline');
    timeline.innerHTML = '';

    // Label
    timeline.appendChild(el('div', { className: 'timeline-label' }, [
        el('span', { innerHTML: `<span style="width:14px;height:14px;display:inline-flex;vertical-align:middle;margin-right:4px">${icons.clock}</span>` }),
        document.createTextNode('Prediction')
    ]));

    // Track
    const trackWrapper = el('div', { style: { flex: '1', position: 'relative', padding: '0 8px' } });
    const track = el('div', { className: 'timeline-track' });
    const fill = el('div', { className: 'timeline-fill' }, [
        el('div', { className: 'timeline-handle' })
    ]);
    track.appendChild(fill);

    // Markers
    const markers = el('div', { className: 'timeline-markers' });
    timelineData.labels.forEach(label => {
        markers.appendChild(el('span', { className: 'timeline-marker', textContent: label }));
    });
    track.appendChild(markers);

    trackWrapper.appendChild(track);
    timeline.appendChild(trackWrapper);

    // Predictions
    const predictions = el('div', { style: { display: 'flex', gap: 'var(--sp-3)', alignItems: 'center' } });
    predictions.appendChild(el('div', { className: 'timeline-prediction' }, [
        document.createTextNode(`Congestion: ${timelineData.congestion[3]}%`)
    ]));
    predictions.appendChild(el('div', { className: 'timeline-prediction', style: { color: 'var(--accent-amber)' } }, [
        document.createTextNode(`Energy: ${timelineData.energy[3]} MW`)
    ]));
    predictions.appendChild(el('div', { className: 'timeline-prediction', style: { color: 'var(--accent-red)' } }, [
        document.createTextNode(`Risk: ${timelineData.risk[3]}`)
    ]));
    timeline.appendChild(predictions);

    // Make track interactive
    track.addEventListener('click', (e) => {
        const rect = track.getBoundingClientRect();
        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        fill.style.width = `${pct * 100}%`;
        const idx = Math.round(pct * (timelineData.labels.length - 1));
        bus.emit('timeline:change', {
            index: idx,
            label: timelineData.labels[idx],
            congestion: timelineData.congestion[idx],
            energy: timelineData.energy[idx],
            risk: timelineData.risk[idx]
        });
    });
}
