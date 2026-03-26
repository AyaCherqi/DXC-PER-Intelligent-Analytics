// ============================================
// KSIA Smart Airport – Chart.js Helpers
// ============================================
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const gridColor = 'rgba(255,255,255,0.04)';
const tickColor = 'rgba(148,163,184,0.6)';
const fontFamily = "'Inter', sans-serif";

const defaultScales = {
    x: { display: false },
    y: { display: false }
};

function baseOptions(opts = {}) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 600, easing: 'easeOutQuart' },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(17,24,39,0.95)',
                titleFont: { family: fontFamily, size: 11 },
                bodyFont: { family: fontFamily, size: 11 },
                borderColor: 'rgba(56,189,248,0.2)',
                borderWidth: 1,
                padding: 8,
                cornerRadius: 6,
                displayColors: false,
            },
            ...opts.plugins,
        },
        scales: opts.scales || defaultScales,
        ...opts,
    };
}

export function createSparkline(canvas, data, color = '#38bdf8', showYAxis = false) {
    return new Chart(canvas, {
        type: 'line',
        data: {
            labels: data.map((_, i) => i),
            datasets: [{
                data,
                borderColor: color,
                borderWidth: 1.5,
                pointRadius: 0,
                pointHoverRadius: 3,
                pointHoverBackgroundColor: color,
                fill: true,
                backgroundColor: createGradient(canvas, color),
                tension: 0.4,
            }]
        },
        options: baseOptions({
            scales: showYAxis ? {
                x: { display: false },
                y: { 
                    display: true, 
                    grid: { color: gridColor, drawBorder: false }, 
                    ticks: { color: tickColor, font: { family: fontFamily, size: 8 }, maxTicksLimit: 3 } 
                }
            } : defaultScales
        })
    });
}

export function createLineChart(canvas, labels, datasets, showAxes = true) {
    return new Chart(canvas, {
        type: 'line',
        data: {
            labels, datasets: datasets.map(ds => ({
                ...ds,
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 4,
                tension: 0.4,
                fill: ds.fill !== undefined ? ds.fill : false,
            }))
        },
        options: baseOptions({
            scales: showAxes ? {
                x: { grid: { color: gridColor }, ticks: { color: tickColor, font: { family: fontFamily, size: 9 } } },
                y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { family: fontFamily, size: 9 } } }
            } : defaultScales
        })
    });
}

export function createBarChart(canvas, labels, data, colors = []) {
    const defaultColors = ['#38bdf8', '#22d3ee', '#4ade80', '#fbbf24', '#a78bfa'];
    return new Chart(canvas, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: colors.length ? colors : data.map((_, i) => defaultColors[i % defaultColors.length]),
                borderRadius: 4,
                borderSkipped: false,
                barThickness: 18,
            }]
        },
        options: baseOptions({
            scales: {
                x: { grid: { display: false }, ticks: { color: tickColor, font: { family: fontFamily, size: 9 } } },
                y: { grid: { color: gridColor }, ticks: { color: tickColor, font: { family: fontFamily, size: 9 } } }
            }
        })
    });
}

export function createDoughnut(canvas, value, max = 100, color = '#38bdf8') {
    return new Chart(canvas, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [value, max - value],
                backgroundColor: [color, 'rgba(255,255,255,0.05)'],
                borderWidth: 0,
                cutout: '78%',
            }]
        },
        options: baseOptions({
            plugins: {
                tooltip: { enabled: false },
            }
        })
    });
}

function createGradient(canvas, color) {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.parentElement?.clientHeight || 80);
    gradient.addColorStop(0, hexToRgba(color, 0.2));
    gradient.addColorStop(1, hexToRgba(color, 0));
    return gradient;
}

function hexToRgba(hex, alpha) {
    if (hex.startsWith('#')) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r},${g},${b},${alpha})`;
    }
    return hex.replace('rgb', 'rgba').replace(')', `,${alpha})`);
}
