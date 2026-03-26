// ============================================
// Perth Airport – Passenger & Vehicle Flow
// Particle paths aligned with corrected layout
// ============================================
import * as THREE from 'three';
import { bus } from '../utils/helpers.js';

const PARTICLE_COUNT = 400;
let particles;
let particleVelocities = [];

export function createParticles(scene) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors    = new Float32Array(PARTICLE_COUNT * 3);
    particleVelocities = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const path = getRandomPath();
        positions[i * 3]     = path.x;
        positions[i * 3 + 1] = path.y;
        positions[i * 3 + 2] = path.z;

        // Colour varies by path type (passenger=cyan, vehicle=amber, shuttle=green)
        const pathDef = paths[path.pathId];
        const [r, g, b] = pathDef.color || [0.14, 0.74, 0.97];
        colors[i * 3]     = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;

        particleVelocities.push({
            path: path.pathId,
            progress: Math.random(),
            speed: 0.0008 + Math.random() * 0.002,
        });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.35,
        transparent: true,
        opacity: 0.85,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    bus.on('scene:frame', animateParticles);
}

// ============================================
// FLOW PATHS — all positions match buildings.js
// color: [r, g, b] 0-1 range
// ============================================
const paths = [
    // ── EAST PRECINCT — Passengers ──

    // 0: Transport Hub East → T1 International (main arrivals flow)
    { id: 0, color: [0.14, 0.74, 0.97], points: [
        [60, 1.5, -8], [58, 1.5, -12], [55, 1.5, -16], [50, 1.5, -18],
    ]},

    // 1: Airport Central Station → T1 via Skybridge
    { id: 1, color: [0.14, 0.74, 0.97], points: [
        [56, 1.5, -36], [55, 1.5, -30], [54, 1.5, -24], [52, 1.5, -20],
    ]},

    // 2: T1 International → T1 Domestic Pier (Gates 50-56)
    { id: 2, color: [0.56, 0.85, 0.97], points: [
        [50, 1.5, -18], [46, 1.5, -18], [40, 1.5, -18], [34, 1.5, -18],
    ]},

    // 3: T1 → aircraft apron (boarding)
    { id: 3, color: [0.30, 0.87, 0.55], points: [
        [44, 1.5, -18], [40, 1.5, -20], [34, 1.5, -22], [28, 1.5, -22],
    ]},

    // 4: T1 ↔ T2 walkway connection
    { id: 4, color: [0.14, 0.74, 0.97], points: [
        [52, 1.5, -5], [51, 1.5, 0], [50, 1.5, 6], [50, 1.5, 12],
    ]},

    // 5: Transport Hub East → T2
    { id: 5, color: [0.20, 0.88, 0.40], points: [
        [60, 1.5, -8], [58, 1.5, 0], [54, 1.5, 8], [50, 1.5, 14],
    ]},

    // 6: T2 → SW pier (Gates 1-7)
    { id: 6, color: [0.20, 0.88, 0.40], points: [
        [44, 1.5, 14], [42, 1.5, 16], [38, 1.5, 20], [34, 1.5, 24],
    ]},

    // 7: Security East (T1) flow
    { id: 7, color: [0.94, 0.28, 0.28], points: [
        [50, 1.5, -4], [50, 1.5, -8], [50, 1.5, -12], [50, 1.5, -16],
    ]},

    // ── WEST PRECINCT — Passengers ──

    // 8: Transport Hub West → T3
    { id: 8, color: [0.98, 0.75, 0.14], points: [
        [-34, 1.5, -8], [-38, 1.5, -6], [-42, 1.5, -2], [-44, 1.5, 0],
    ]},

    // 9: Transport Hub West → T4
    { id: 9, color: [0.98, 0.75, 0.14], points: [
        [-34, 1.5, -8], [-38, 1.5, -12], [-42, 1.5, -18], [-44, 1.5, -22],
    ]},

    // 10: T4 → Gates 7-15 pier (NE direction)
    { id: 10, color: [0.94, 0.55, 0.14], points: [
        [-44, 1.5, -22], [-42, 1.5, -26], [-36, 1.5, -30], [-30, 1.5, -34],
    ]},

    // 11: T3 → North Pier (Gates 16-17C)
    { id: 11, color: [0.98, 0.75, 0.14], points: [
        [-44, 1.5, -1], [-44, 1.5, -6], [-44, 1.5, -10], [-44, 1.5, -14],
    ]},

    // 12: T3 → South Pier (Gates 18-35)
    { id: 12, color: [0.98, 0.75, 0.14], points: [
        [-44, 1.5, -1], [-44, 1.5, 5], [-44, 1.5, 12], [-44, 1.5, 20],
    ]},

    // 13: Security West flow
    { id: 13, color: [0.94, 0.28, 0.28], points: [
        [-44, 1.5, -10], [-44, 1.5, -14], [-44, 1.5, -18], [-44, 1.5, -22],
    ]},

    // ── SHUTTLE — East ↔ West precinct ──

    // 14: E→W shuttle along Airport Drive
    { id: 14, color: [0.27, 0.92, 0.45], points: [
        [58, 1.5, 34], [30, 1.5, 34], [0, 1.5, 34], [-30, 1.5, 34],
    ]},

    // 15: W→E shuttle return
    { id: 15, color: [0.27, 0.92, 0.45], points: [
        [-30, 1.5, 30], [0, 1.5, 30], [30, 1.5, 30], [58, 1.5, 30],
    ]},

    // ── CARGO & FIFO ──

    // 16: Cargo apron flow
    { id: 16, color: [0.65, 0.55, 0.97], points: [
        [6, 1.5, 44], [10, 1.5, 42], [14, 1.5, 40], [20, 1.5, 38],
    ]},

    // 17: FIFO charter flow
    { id: 17, color: [0.65, 0.55, 0.97], points: [
        [-50, 1.5, 32], [-50, 1.5, 28], [-50, 1.5, 26], [-44, 1.5, 22],
    ]},

    // ── AIRCRAFT TAXI FLOW (on main taxiways) ──

    // 18: Aircraft taxiing east (toward T1 apron) — follows east parallel taxiway
    { id: 18, color: [0.55, 0.55, 0.65], points: [
        [8, 1.5, -40], [10, 1.5, -20], [12, 1.5, 0], [14, 1.5, 20],
    ]},

    // 19: Aircraft taxiing west (toward T3 apron) — follows west parallel taxiway
    { id: 19, color: [0.55, 0.55, 0.65], points: [
        [-8, 1.5, 30], [-8, 1.5, 10], [-8, 1.5, -10], [-8, 1.5, -30],
    ]},

    // 20: Vehicles on T1/T2 access road (north-south, east side)
    { id: 20, color: [0.36, 0.74, 0.97], points: [
        [60, 1.5, -28], [60, 1.5, -18], [60, 1.5, -8], [60, 1.5, 2],
    ]},

    // 21: Vehicles on T3/T4 access road (west side)
    { id: 21, color: [0.98, 0.75, 0.14], points: [
        [-34, 1.5, -26], [-34, 1.5, -16], [-34, 1.5, -6], [-34, 1.5, 4],
    ]},
];

function getRandomPath() {
    const pathDef = paths[Math.floor(Math.random() * paths.length)];
    const t = Math.random();
    const pts = pathDef.points;
    const segIdx = Math.min(Math.floor(t * (pts.length - 1)), pts.length - 2);
    const localT = (t * (pts.length - 1)) - segIdx;
    const p1 = pts[segIdx];
    const p2 = pts[segIdx + 1];

    return {
        x: p1[0] + (p2[0] - p1[0]) * localT + (Math.random() - 0.5) * 2.5,
        y: p1[1] + (Math.random() - 0.5) * 0.4,
        z: p1[2] + (p2[2] - p1[2]) * localT + (Math.random() - 0.5) * 2.5,
        pathId: pathDef.id,
    };
}

function animateParticles() {
    if (!particles) return;
    const positions = particles.geometry.attributes.position.array;
    const t = Date.now();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const vel = particleVelocities[i];
        const pathDef = paths[vel.path];
        vel.progress += vel.speed;

        if (vel.progress >= 1) {
            vel.progress = 0;
            vel.path = Math.floor(Math.random() * paths.length);
        }

        const pts = pathDef.points;
        const segIdx = Math.min(Math.floor(vel.progress * (pts.length - 1)), pts.length - 2);
        const localT = vel.progress * (pts.length - 1) - segIdx;
        const p1 = pts[segIdx];
        const p2 = pts[segIdx + 1];

        positions[i * 3]     = p1[0] + (p2[0] - p1[0]) * localT + Math.sin(t * 0.001 + i) * 0.28;
        positions[i * 3 + 1] = p1[1] + Math.sin(t * 0.002 + i) * 0.18;
        positions[i * 3 + 2] = p1[2] + (p2[2] - p1[2]) * localT + Math.cos(t * 0.001 + i) * 0.28;
    }

    particles.geometry.attributes.position.needsUpdate = true;
}
