// ============================================
// Perth Airport – 3D Overlays
// Heatmap zones + 3D labels — aligned with
// corrected buildings.js positions
// ============================================
import * as THREE from 'three';
import { bus } from '../utils/helpers.js';

let heatmapMeshes = [];
let heatmapVisible = false;
let labelElements = [];
let labelsVisible = false;
let labelContainer = null;
let cameraRef = null;
let rendererRef = null;

// Heatmap zones — positions must match buildings.js exactly
const heatmapZones = [
    // === EAST PRECINCT ===
    // T1 Intl at [50, 0, -30], size [18,7,12]
    { id: 't1-international', position: [50,  0.5, -30], size: [20, 14], intensity: 0.65, color: 0xfbbf24, label: 'T1 International' },
    // T1 Domestic at [44, 0, -16], size [14,6,10]
    { id: 't1-domestic',      position: [44,  0.5, -16], size: [16, 12], intensity: 0.55, color: 0x38bdf8, label: 'T1 Domestic' },
    // T1 pier extends east from [-44, -22] → x range [38→18]
    { id: 't1-pier',          position: [28,  0.5, -22], size: [22,  5], intensity: 0.50, color: 0xfbbf24, label: 'T1 Gates 50-56' },
    // T2 at [44, 0, 12]
    { id: 't2-regional',      position: [44,  0.5,  12], size: [12,  8], intensity: 0.45, color: 0x4ade80, label: 'T2 Regional' },
    // Security East at [52, 0, -10]
    { id: 'security-east',    position: [52,  0.5, -10], size: [8,   4], intensity: 0.90, color: 0xef4444, label: 'Security East' },
    // Airport Central at [64, 0, -14]
    { id: 'airport-central',  position: [64,  0.5, -14], size: [10,  8], intensity: 0.50, color: 0x38bdf8, label: 'Airport Central Station' },

    // === WEST PRECINCT ===
    // T4 at [-50, 0, -22], size [12,5,9]
    { id: 't4-qantas',        position: [-50, 0.5, -22], size: [14, 10], intensity: 0.55, color: 0xfbbf24, label: 'T4 Qantas' },
    // T3 at [-50, 0, -7], size [14,5.5,11]
    { id: 't3-qantas',        position: [-50, 0.5,  -7], size: [16, 12], intensity: 0.60, color: 0xfbbf24, label: 'T3 Qantas' },
    // T4 pier: x-pos from [-44,-22], length 16 → center at [-36,-22]
    { id: 't4-pier',          position: [-36, 0.5, -22], size: [18,  5], intensity: 0.50, color: 0xfbbf24, label: 'T4 Gates 7-15' },
    // T3 north pier: x-pos from [-43,-10], length 12 → center at [-37,-10]
    { id: 't3-pier-north',    position: [-37, 0.5, -10], size: [13,  4], intensity: 0.45, color: 0xfbbf24, label: 'T3 Gates 16-17C' },
    // T3 south pier: x-pos from [-43,-3], length 20 → center at [-33,-3]
    { id: 't3-pier-south',    position: [-33, 0.5,  -3], size: [21,  5], intensity: 0.55, color: 0xfbbf24, label: 'T3 Gates 18-35' },
    // Security West at [-50, 0, -18]
    { id: 'security-west',    position: [-50, 0.5, -18], size: [ 8,  4], intensity: 0.80, color: 0xef4444, label: 'Security West' },

    // === TRANSPORT ===
    { id: 'transport-east',   position: [66,  0.5,  -6], size: [ 8,  5], intensity: 0.45, color: 0x38bdf8, label: 'Transport Hub East' },
    { id: 'transport-west',   position: [-37, 0.5,  -4], size: [ 8,  5], intensity: 0.40, color: 0x38bdf8, label: 'Transport Hub West' },

    // === SUPPORT ===
    { id: 'cargo-area',       position: [14,  0.5,  40], size: [16,  9], intensity: 0.35, color: 0xa78bfa, label: 'Cargo & Freight' },
    { id: 'fifo-terminal',    position: [-50, 0.5,  26], size: [11,  7], intensity: 0.45, color: 0xfbbf24, label: 'FIFO Charter Terminal' },
];

export function createOverlays(scene, zoneObjects) {
    heatmapZones.forEach(zone => {
        const geo = new THREE.PlaneGeometry(zone.size[0], zone.size[1]);
        const mat = new THREE.MeshBasicMaterial({
            color: zone.color,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            depthWrite: false,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(zone.position[0], zone.position[1], zone.position[2]);
        mesh.userData = {
            intensity: zone.intensity,
            targetOpacity: zone.intensity * 0.6,
            label: zone.label,
        };
        scene.add(mesh);
        heatmapMeshes.push(mesh);
    });

    bus.on('overlay:heatmap', (visible) => {
        heatmapVisible = visible;
        heatmapMeshes.forEach(mesh => {
            mesh.material.opacity = visible ? mesh.userData.targetOpacity : 0;
        });
    });

    bus.on('scene:frame', () => {
        if (heatmapVisible) {
            const t = Date.now() * 0.002;
            heatmapMeshes.forEach((mesh, i) => {
                const base = mesh.userData.targetOpacity;
                mesh.material.opacity = base + Math.sin(t + i * 0.8) * 0.07;
            });
        }
        if (labelsVisible && cameraRef && rendererRef) {
            updateLabelPositions();
        }
    });

    bus.on('overlay:labels', (visible) => {
        labelsVisible = visible;
        if (visible && !labelContainer) createLabelOverlay();
        if (labelContainer) labelContainer.style.display = visible ? 'block' : 'none';
    });
}

export function setLabelRefs(camera, renderer) {
    cameraRef = camera;
    rendererRef = renderer;
}

function createLabelOverlay() {
    const viewport = document.getElementById('viewport');
    if (!viewport) return;

    labelContainer = document.createElement('div');
    labelContainer.style.cssText = `
        position:absolute;top:0;left:0;width:100%;height:100%;
        pointer-events:none;overflow:hidden;z-index:5;
    `;
    viewport.style.position = 'relative';
    viewport.appendChild(labelContainer);

    const labelDefs = [
        // Terminals — East Precinct
        { name: 'T1 International',         pos: new THREE.Vector3(50, 10, -30),  type: 'terminal' },
        { name: 'T1 Domestic (Virgin)',      pos: new THREE.Vector3(44,  9, -16),  type: 'terminal' },
        { name: 'T1 Gates 50-56',            pos: new THREE.Vector3(28,  6, -22),  type: 'pier' },
        { name: 'T2 Regional',               pos: new THREE.Vector3(44,  8,  12),  type: 'terminal' },
        // Terminals — West Precinct
        { name: 'T4 Qantas',                 pos: new THREE.Vector3(-50,  8, -22), type: 'terminal' },
        { name: 'T3 Qantas',                 pos: new THREE.Vector3(-50,  9,  -7), type: 'terminal' },
        // Gates — West Precinct (piers extend east now)
        { name: 'T4 Gates 7-15',             pos: new THREE.Vector3(-36,  6, -22), type: 'pier' },
        { name: 'T3 Gates 16-17C',           pos: new THREE.Vector3(-37,  6, -10), type: 'pier' },
        { name: 'T3 Gates 18-35',            pos: new THREE.Vector3(-33,  6,  -3), type: 'pier' },
        // Infrastructure
        { name: 'Control Tower',             pos: new THREE.Vector3(54, 28, -18),  type: 'atc' },
        { name: 'Airport Central Station',   pos: new THREE.Vector3(64,  7, -14),  type: 'zone' },
        { name: 'Redcliffe Station',         pos: new THREE.Vector3(-74,  6,   6), type: 'zone' },
        // Security
        { name: 'Security East',             pos: new THREE.Vector3(52,  5, -10),  type: 'alert' },
        { name: 'Security West',             pos: new THREE.Vector3(-50,  5, -18), type: 'alert' },
        // Transport
        { name: 'Transport Hub East',        pos: new THREE.Vector3(66,  5,  -6),  type: 'zone' },
        { name: 'Transport Hub West',        pos: new THREE.Vector3(-37,  5,  -4), type: 'zone' },
        // Support
        { name: 'FIFO Charter Terminal',     pos: new THREE.Vector3(-50,  6,  26), type: 'zone' },
        { name: 'Cargo & Freight',           pos: new THREE.Vector3( 14,  6,  40), type: 'zone' },
        { name: 'Maintenance Hangar',        pos: new THREE.Vector3(-60,  8,  12), type: 'zone' },
        // Runways — all N-S parallel
        { name: 'Runway 03/21  (3,444m)',    pos: new THREE.Vector3(  0,  3, -50), type: 'runway' },
        { name: 'Runway 06/24  (2,163m)',    pos: new THREE.Vector3( -7,  3, -34), type: 'runway' },
        { name: 'New Runway 03R/21L (2029)', pos: new THREE.Vector3(  9,  3, -46), type: 'construction' },
        // Roads
        { name: 'Airport Drive',             pos: new THREE.Vector3(  0,  3,  36), type: 'zone' },
    ];

    const colorMap = {
        terminal:     '#38bdf8',
        pier:         '#60c8f0',
        atc:          '#fbbf24',
        runway:       '#4ade80',
        construction: '#fbbf24',
        alert:        '#ef4444',
        zone:         '#94a3b8',
    };

    labelDefs.forEach(def => {
        const label = document.createElement('div');
        label.textContent = def.name;
        label.style.cssText = `
            position:absolute;
            font-family:var(--font-display,'Inter',sans-serif);
            font-size:${def.type === 'terminal' ? '11px' : '9px'};
            font-weight:${def.type === 'terminal' ? '700' : '500'};
            color:${colorMap[def.type] || '#94a3b8'};
            background:rgba(10,14,26,${def.type === 'terminal' ? '0.88' : '0.72'});
            padding:2px 6px;border-radius:3px;
            border:1px solid ${colorMap[def.type] ? colorMap[def.type] + '55' : 'rgba(148,163,184,0.2)'};
            white-space:nowrap;pointer-events:none;
            transform:translate(-50%,-50%);
            letter-spacing:0.03em;text-transform:uppercase;
            transition:opacity 0.2s;
        `;
        labelContainer.appendChild(label);
        labelElements.push({ el: label, pos: def.pos });
    });
}

function updateLabelPositions() {
    if (!cameraRef || !rendererRef || !labelContainer) return;
    const w = rendererRef.domElement.clientWidth;
    const h = rendererRef.domElement.clientHeight;

    labelElements.forEach(({ el, pos }) => {
        const p = pos.clone().project(cameraRef);
        if (p.z > 1) { el.style.display = 'none'; return; }
        const x = (p.x * 0.5 + 0.5) * w;
        const y = (-p.y * 0.5 + 0.5) * h;
        if (x < -60 || x > w + 60 || y < -20 || y > h + 20) { el.style.display = 'none'; return; }
        el.style.display = 'block';
        el.style.left = `${x}px`;
        el.style.top  = `${y}px`;
    });
}
