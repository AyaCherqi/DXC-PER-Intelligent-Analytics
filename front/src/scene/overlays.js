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
    { id: 't1-international', position: [50, 0.5, -18], size: [22, 15], intensity: 0.65, color: 0xfbbf24, label: 'T1 International' },
    { id: 't1-pier',          position: [34, 0.5, -18], size: [24, 6],  intensity: 0.55, color: 0xfbbf24, label: 'T1 Gates 50-56' },
    { id: 't2-regional',      position: [44, 0.5, 14],  size: [12, 8],  intensity: 0.45, color: 0x4ade80, label: 'T2 Regional' },
    { id: 'security-east',    position: [50, 0.5, -8],  size: [8, 4],   intensity: 0.90, color: 0xef4444, label: 'Security East' },
    { id: 'airport-central',  position: [56, 0.5, -36], size: [10, 8],  intensity: 0.50, color: 0x38bdf8, label: 'Airport Central Station' },

    // === WEST PRECINCT ===
    { id: 't4-qantas',        position: [-44, 0.5, -22], size: [14, 10], intensity: 0.55, color: 0xfbbf24, label: 'T4 Qantas' },
    { id: 't3-qantas',        position: [-44, 0.5, -1],  size: [16, 12], intensity: 0.60, color: 0xfbbf24, label: 'T3 Qantas' },
    { id: 'security-west',    position: [-44, 0.5, -16], size: [8, 4],   intensity: 0.80, color: 0xef4444, label: 'Security West' },

    // === TRANSPORT ===
    { id: 'transport-east',   position: [60, 0.5, -8],  size: [8, 5],   intensity: 0.45, color: 0x38bdf8, label: 'Transport Hub East' },
    { id: 'transport-west',   position: [-34, 0.5, -8], size: [8, 5],   intensity: 0.40, color: 0x38bdf8, label: 'Transport Hub West' },

    // === SUPPORT ===
    { id: 'cargo-area',       position: [14, 0.5, 40],  size: [16, 9],  intensity: 0.35, color: 0xa78bfa, label: 'Cargo & Freight' },
    { id: 'fifo-terminal',    position: [-50, 0.5, 26], size: [11, 7],  intensity: 0.45, color: 0xfbbf24, label: 'FIFO Charter Terminal' },
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
        // Terminals
        { name: 'T1 International',         pos: new THREE.Vector3(50, 10, -18),  type: 'terminal' },
        { name: 'T1 Gates 50-56',            pos: new THREE.Vector3(34,  6, -18),  type: 'pier' },
        { name: 'T2 Regional',               pos: new THREE.Vector3(44,  8,  14),  type: 'terminal' },
        { name: 'T3 Qantas',                 pos: new THREE.Vector3(-44,  9,  -1), type: 'terminal' },
        { name: 'T4 Qantas',                 pos: new THREE.Vector3(-44,  8, -22), type: 'terminal' },
        // Gates
        { name: 'T3 Gates 16-17C',           pos: new THREE.Vector3(-44,  6, -14), type: 'pier' },
        { name: 'T3 Gates 18-35',            pos: new THREE.Vector3(-44,  6,  14), type: 'pier' },
        { name: 'T4 Gates 7-15',             pos: new THREE.Vector3(-28,  6, -34), type: 'pier' },
        // Infrastructure
        { name: 'Control Tower',             pos: new THREE.Vector3(46, 26, -30),  type: 'atc' },
        { name: 'Airport Central Station',   pos: new THREE.Vector3(56,  7, -36),  type: 'zone' },
        { name: 'Redcliffe Station',         pos: new THREE.Vector3(-74,  6,   6), type: 'zone' },
        // Security
        { name: 'Security East',             pos: new THREE.Vector3(50,  5,  -8),  type: 'alert' },
        { name: 'Security West',             pos: new THREE.Vector3(-44,  5, -16), type: 'alert' },
        // Transport
        { name: 'Transport Hub East',        pos: new THREE.Vector3(60,  5,  -8),  type: 'zone' },
        { name: 'Transport Hub West',        pos: new THREE.Vector3(-34,  5,  -8), type: 'zone' },
        // Support
        { name: 'FIFO Charter Terminal',     pos: new THREE.Vector3(-50,  6,  26), type: 'zone' },
        { name: 'Cargo & Freight',           pos: new THREE.Vector3( 14,  6,  40), type: 'zone' },
        { name: 'Maintenance Hangar',        pos: new THREE.Vector3(-60,  8,  12), type: 'zone' },
        // Runways
        { name: 'Runway 03/21  (3,444m)',    pos: new THREE.Vector3(  0,  3, -55), type: 'runway' },
        { name: 'Runway 06/24  (2,163m)',    pos: new THREE.Vector3(-28,  3,  30), type: 'runway' },
        { name: 'New Runway 03R/21L (2029)', pos: new THREE.Vector3( 14,  3, -50), type: 'construction' },
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
