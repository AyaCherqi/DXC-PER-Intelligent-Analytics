// ============================================
// PER Smart Airport – 3D Airport Scene
// ============================================
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { bus } from '../utils/helpers.js';
import { createBuildings } from './buildings.js';
import { createParticles } from './particles.js';
import { createOverlays, setLabelRefs } from './overlays.js';
import { zones } from '../data/mockData.js';

let scene, camera, renderer, controls, raycaster, mouse;
let zoneObjects = {};
let animationId;

export function initAirportScene(container) {
    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e1a, 0.002);

    // Camera
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 2000);
    camera.position.set(90, 80, 90);
    camera.lookAt(0, 0, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;
    container.appendChild(renderer.domElement);

    // Controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 20;
    controls.maxDistance = 200;
    controls.maxPolarAngle = Math.PI / 2.2;
    controls.target.set(0, 0, 0);

    // Lighting – bright enough to clearly see all structures
    const hemiLight = new THREE.HemisphereLight(0x88bbff, 0x223344, 1.5);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0x99bbdd, 2.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xaaccff, 3.0);
    dirLight.position.set(40, 60, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 150;
    dirLight.shadow.camera.left = -80;
    dirLight.shadow.camera.right = 80;
    dirLight.shadow.camera.top = 80;
    dirLight.shadow.camera.bottom = -80;
    scene.add(dirLight);

    // Back fill light for depth
    const dirLight2 = new THREE.DirectionalLight(0x6688bb, 1.5);
    dirLight2.position.set(-30, 40, -20);
    scene.add(dirLight2);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 3.0, 150);
    pointLight1.position.set(-20, 20, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x22d3ee, 2.0, 120);
    pointLight2.position.set(20, 15, -15);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x4ade80, 1.5, 100);
    pointLight3.position.set(0, 18, -30);
    scene.add(pointLight3);

    const pointLight4 = new THREE.PointLight(0xa78bfa, 1.5, 100);
    pointLight4.position.set(-30, 15, 20);
    scene.add(pointLight4);

    const groundGeo = new THREE.PlaneGeometry(400, 400);
    const groundMat = new THREE.MeshStandardMaterial({
        color: 0x1a2030,
        roughness: 0.85,
        metalness: 0.15
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid – much more visible
    const gridHelper = new THREE.GridHelper(300, 60, 0x3a5070, 0x253545);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // Buildings
    zoneObjects = createBuildings(scene);

    // Particles
    createParticles(scene);

    // Overlays
    createOverlays(scene, zoneObjects);
    setLabelRefs(camera, renderer);

    // Raycasting
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    renderer.domElement.addEventListener('click', onSceneClick);
    renderer.domElement.addEventListener('mousemove', onSceneHover);

    // Hover tooltip
    const tooltip = document.createElement('div');
    tooltip.id = 'scene-hover-tooltip';
    tooltip.style.cssText = `
      position: absolute; pointer-events: none; display: none;
      background: rgba(10,14,26,0.92); border: 1px solid rgba(56,189,248,0.4);
      border-radius: 6px; padding: 6px 12px; z-index: 10;
      font-family: var(--font-display, 'Inter', sans-serif);
      font-size: 11px; font-weight: 600; color: #38bdf8;
      letter-spacing: 0.04em; text-transform: uppercase;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      transition: opacity 0.15s;
    `;
    container.style.position = 'relative';
    container.appendChild(tooltip);

    // Viewport controls overlay
    addViewportControls(container);

    // Resize handler
    const resizeObserver = new ResizeObserver(() => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    resizeObserver.observe(container);

    // Animate
    animate();

    // Status overlay
    addStatusOverlay(container);
}

function animate() {
    animationId = requestAnimationFrame(animate);
    controls.update();
    bus.emit('scene:frame', { scene, camera });
    renderer.render(scene, camera);
}

// ─── Hover state ───
let hoveredObject = null;
let hoveredZoneId = null;
let originalEmissives = new Map();

function onSceneHover(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const allMeshes = Object.values(zoneObjects).map(z => z.mesh || z);
    const intersects = raycaster.intersectObjects(allMeshes, true);

    const tooltip = document.getElementById('scene-hover-tooltip');

    if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData.zoneId && obj.parent) {
            obj = obj.parent;
        }

        if (obj?.userData?.zoneId) {
            const zone = zones.find(z => z.id === obj.userData.zoneId);

            // Unhighlight previous
            if (hoveredObject && hoveredObject !== obj) {
                clearHighlight(hoveredObject);
                bus.emit('zone:unhover');
            }

            // Highlight new
            if (hoveredObject !== obj) {
                hoveredObject = obj;
                hoveredZoneId = obj.userData.zoneId;
                applyHighlight(obj);
                if (zone) bus.emit('zone:hover', zone);
            }

            // Tooltip
            if (tooltip && zone) {
                const statusDot = zone.status === 'critical' ? '#ef4444' : zone.status === 'warning' ? '#fbbf24' : '#4ade80';
                tooltip.innerHTML = `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${statusDot};margin-right:6px;"></span>${zone.name}`;
                tooltip.style.display = 'block';
                const containerRect = renderer.domElement.parentElement.getBoundingClientRect();
                tooltip.style.left = `${event.clientX - containerRect.left + 16}px`;
                tooltip.style.top = `${event.clientY - containerRect.top - 12}px`;
            }

            renderer.domElement.style.cursor = 'pointer';
            return;
        }
    }

    // Nothing hovered
    if (hoveredObject) {
        clearHighlight(hoveredObject);
        hoveredObject = null;
        hoveredZoneId = null;
        bus.emit('zone:unhover');
    }
    if (tooltip) tooltip.style.display = 'none';
    renderer.domElement.style.cursor = 'grab';
}

function applyHighlight(group) {
    group.traverse(child => {
        if (child.isMesh && child.material) {
            const mat = child.material;
            if (!originalEmissives.has(child.uuid)) {
                originalEmissives.set(child.uuid, {
                    emissive: mat.emissive ? mat.emissive.clone() : null,
                    emissiveIntensity: mat.emissiveIntensity || 0
                });
            }
            if (mat.emissive) {
                mat.emissive.set(0x38bdf8);
                mat.emissiveIntensity = 0.6;
            }
        }
    });
}

function clearHighlight(group) {
    group.traverse(child => {
        if (child.isMesh && child.material && originalEmissives.has(child.uuid)) {
            const orig = originalEmissives.get(child.uuid);
            if (orig.emissive && child.material.emissive) {
                child.material.emissive.copy(orig.emissive);
                child.material.emissiveIntensity = orig.emissiveIntensity;
            }
            originalEmissives.delete(child.uuid);
        }
    });
}

function onSceneClick(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(Object.values(zoneObjects).map(z => z.mesh || z), true);

    if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj && !obj.userData.zoneId && obj.parent) {
            obj = obj.parent;
        }
        if (obj?.userData?.zoneId) {
            const zone = zones.find(z => z.id === obj.userData.zoneId);
            if (zone) bus.emit('zone:select', zone);
            return;
        }
    }

    // Clicked on empty space — dismiss pinned panel
    bus.emit('zone:dismiss');
}

function addViewportControls(container) {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'viewport-controls';
    controlsDiv.innerHTML = `
    <button class="viewport-btn tooltip" data-tooltip="Reset View" id="btn-reset-view">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0"/><path d="M3 12h18"/></svg>
    </button>
    <button class="viewport-btn tooltip" data-tooltip="Toggle Heatmap" id="btn-heatmap">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><rect x="7" y="7" width="3" height="3"/><rect x="14" y="7" width="3" height="3"/><rect x="7" y="14" width="3" height="3"/><rect x="14" y="14" width="3" height="3"/></svg>
    </button>
    <button class="viewport-btn tooltip" data-tooltip="Toggle Labels" id="btn-labels">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
    </button>
  `;
    container.appendChild(controlsDiv);

    document.getElementById('btn-reset-view')?.addEventListener('click', () => {
        camera.position.set(90, 80, 90);
        controls.target.set(0, 0, 0);
        controls.update();
    });

    document.getElementById('btn-heatmap')?.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('active');
        bus.emit('overlay:heatmap', e.currentTarget.classList.contains('active'));
    });

    document.getElementById('btn-labels')?.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('active');
        bus.emit('overlay:labels', e.currentTarget.classList.contains('active'));
    });
}

function addStatusOverlay(container) {
    const overlay = document.createElement('div');
    overlay.className = 'viewport-overlay-label';
    overlay.innerHTML = `
    <span class="viewport-status-dot"></span>
    <span class="viewport-overlay-text">Digital Twin • Real-time • 3D Mode</span>
  `;
    container.appendChild(overlay);
}

export function destroyScene() {
    if (animationId) cancelAnimationFrame(animationId);
    renderer?.dispose();
}
