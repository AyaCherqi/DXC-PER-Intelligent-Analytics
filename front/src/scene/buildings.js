// ============================================
// Perth Airport – 3D Scene
// Accurate layout based on PER official maps
//
// COORDINATE SYSTEM: 1 unit ≈ 40m real world
//   +X = East   -X = West
//   -Z = North  +Z = South
//
// RUNWAYS:
//   03/21: 3,444m × 45m, runs NNE-SSW (030°/210°), rot = PI/6
//   06/24: 2,163m × 45m, runs ENE-WSW (060°/240°), rot = PI/3
//   03R/21L (under construction): parallel to 03/21, east of it
//
// EAST PRECINCT (positive X):
//   T1 International – main body + domestic pier (Gates 50-56) going west
//   T2 Regional      – long thin SW finger (Gates 1-7)
//   T1-T2 covered walkway connecting them
//   Airport Central Station + Skybridge (280m) to T1
//   Control Tower adjacent to Airport Central
//
// WEST PRECINCT (negative X):
//   T4 Qantas (north, Gates 7-15) – pier going NE
//   T3 Qantas (south, Gates 16-35) – two piers: short north + long south
//   T3-T4 shared landside connector
//   Redcliffe Station far west
// ============================================

import * as THREE from 'three';

const C = {
    t1: 0x2a5a8f,        // T1 – deep blue
    t2: 0x3a7050,        // T2 – dark green
    t3: 0x7a4a2a,        // T3 – warm brown (Qantas)
    t4: 0x6a3a20,        // T4 – darker Qantas
    pier: 0x2a4560,      // Pier corridors
    runway: 0x1e2535,    // Runway asphalt
    taxiway: 0x1a2230,   // Taxiway asphalt
    parking: 0x1e2535,   // Parking structures
    glass: 0x70d8ff,     // Terminal glass
    accent: 0x38bdf8,    // Cyan highlight
    accentGreen: 0x4ade80,
    accentAmber: 0xfbbf24,
    white: 0xeef2f7,
    support: 0x303d50,
    station: 0x4a5068,
    cargo: 0x2a4050,
    road: 0x1e2228,
};

export function createBuildings(scene) {
    const zoneObjects = {};

    // =========================================
    // RUNWAYS — all parallel N-S, offset in X
    // Main 03/21: 3,444m, Cross 06/24: 2,163m (shorter), New 03R/21L: under construction
    // =========================================

    // Main runway 03/21 — N-S, centered between precincts
    zoneObjects['runway-main'] = createRunway(scene, [0, 0, 0], 90, 0, 'runway-main', 'Runway 03/21');

    // Cross runway 06/24 — NOW PARALLEL (N-S), shorter, offset west
    zoneObjects['runway-cross'] = createRunway(scene, [-7, 0, 0], 58, 0, 'runway-cross', 'Runway 06/24');

    // New runway 03R/21L (construction 2025–2029) — parallel, east of main
    zoneObjects['runway-new'] = createRunwayUnderConstruction(scene, [9, 0, 0], 80, 0, 'runway-new', 'Runway 03R/21L (Under Construction)');

    // =========================================
    // APRONS
    // =========================================

    // East apron (T1 gates area)
    zoneObjects['apron-east'] = createApron(scene, [32, 0, -20], [20, 28], 'apron-east', 'East Apron (T1)');
    // East apron extension (T2 gates area)
    zoneObjects['apron-t2'] = createApron(scene, [28, 0, 14], [16, 22], 'apron-t2', 'East Apron (T2)');
    // West apron — EAST face of T3/T4, facing runway (not behind terminals)
    zoneObjects['apron-west'] = createApron(scene, [-32, 0, -8], [20, 42], 'apron-west', 'West Apron (T3/T4)');

    // =========================================
    // EAST PRECINCT
    // Layout from official map:
    //   T1 International (north, large) | T1 Domestic (west, adjacent)
    //   Control Tower in center of circular road loop
    //   Airport Central Station southeast, skybridge to T1 Intl
    // =========================================

    // --- T1 International (NORTH / top block) ---
    zoneObjects['t1-international'] = createTerminal(scene, {
        id: 't1-international',
        position: [50, 0, -30],
        size: [18, 7, 12],
        color: C.t1,
        label: 'T1 International',
    });

    // --- T1 Domestic (SOUTH / below T1 Intl, directly adjacent) ---
    zoneObjects['t1-domestic'] = createTerminal(scene, {
        id: 't1-domestic',
        position: [44, 0, -16],
        size: [14, 6, 10],
        color: 0x1e4a80,
        label: 'T1 Domestic (Virgin)',
    });

    // Covered connector between T1 Intl and T1 Domestic
    createSkybridge(scene, [50, 4, -24], [46, 4, -21]);

    // T1 pier — Gates 50-56, west from T1 Domestic
    zoneObjects['t1-pier'] = createStraightPier(scene, {
        id: 't1-pier',
        position: [38, 0, -16],
        length: 20,
        axis: 'x-neg',
        width: 4,
        height: 3.5,
        gateCount: 7,
        color: C.t1,
        label: 'T1 Gates 50-56',
    });

    // T1 aircraft at gates (west face of pier)
    [
        [26, 0, -22], [22, 0, -20], [18, 0, -18], [14, 0, -16],
        [26, 0, -10], [22, 0, -12], [18, 0, -14], [30, 0, -24],
    ].forEach(p => createAircraft(scene, p));

    // T1 Pick-up / Drop-off (east kerb)
    zoneObjects['t1-pickup'] = createBox(scene, {
        id: 't1-pickup',
        position: [64, 0, -24],
        size: [5, 1.5, 10],
        color: 0x2a5050,
        label: 'T1 Drop-off & Pick-up',
    });

    // --- T2 Regional ---
    zoneObjects['t2-regional'] = createTerminal(scene, {
        id: 't2-regional',
        position: [44, 0, 12],
        size: [10, 5, 7],
        color: C.t2,
        label: 'T2 Regional',
    });

    // T2 SW finger pier — Gates 1-7
    zoneObjects['t2-pier'] = createAngledPier(scene, {
        id: 't2-pier',
        startPos: [39, 0, 16],
        angle: -Math.PI / 4,
        length: 28,
        gateCount: 7,
        color: C.t2,
        label: 'T2 Gates 1-7',
    });

    // T2 aircraft
    [
        [30, 0, 20], [26, 0, 24], [22, 0, 28],
        [18, 0, 32], [28, 0, 14], [24, 0, 18],
    ].forEach(p => createAircraft(scene, p));

    // T2 Pick-up / Drop-off
    zoneObjects['t2-pickup'] = createBox(scene, {
        id: 't2-pickup',
        position: [54, 0, 18],
        size: [5, 1.5, 8],
        color: 0x2a5050,
        label: 'T2 Drop-off & Pick-up',
    });

    // --- T1 ↔ T2 Covered Walkway ---
    zoneObjects['t1-t2-walkway'] = createSkybridgeZone(scene, [50, 3, -10], [48, 3, 6], 't1-t2-walkway', 'T1–T2 Covered Walkway');

    // ─── CIRCULAR ROAD CLUSTER ───
    // Control Tower: center of road loop between T1 Intl and T1 Domestic
    // Airport Central Station: southeast of T1, skybridge arcs to T1 Intl

    // --- Control Tower ---
    zoneObjects['control-tower'] = createControlTower(scene, [54, 0, -18]);

    // --- Airport Central Station ---
    zoneObjects['airport-central'] = createBox(scene, {
        id: 'airport-central',
        position: [64, 0, -14],
        size: [8, 4, 7],
        color: C.station,
        emissiveColor: C.accent,
        emissiveIntensity: 0.4,
        label: 'Airport Central Station',
    });

    // Skybridge — station → T1 International
    zoneObjects['skybridge-station'] = createSkybridgeZone(scene, [62, 4.5, -16], [58, 4.5, -22], 'skybridge-station', 'Airport Central Skybridge');
    createSkybridge(scene, [58, 4.5, -22], [55, 4, -27]);
    createSkybridge(scene, [55, 4, -27], [52, 3.5, -30]);

    // --- Security East ---
    zoneObjects['security-east'] = createBox(scene, {
        id: 'security-east',
        position: [52, 0, -10],
        size: [6, 2.5, 3],
        color: 0x5a3030,
        label: 'Security East (T1/T2)',
    });

    // --- Lounges (East) ---
    zoneObjects['virgin-lounge'] = createBox(scene, {
        id: 'virgin-lounge',
        position: [38, 0, -30],
        size: [4, 2.5, 3],
        color: 0x6a3070,
        emissiveColor: 0xa78bfa,
        emissiveIntensity: 0.2,
        label: 'Virgin Australia Lounge',
    });
    zoneObjects['aspire-lounge'] = createBox(scene, {
        id: 'aspire-lounge',
        position: [54, 0, -30],
        size: [4, 2.5, 3],
        color: 0x3a5a3a,
        emissiveColor: 0x4ade80,
        emissiveIntensity: 0.2,
        label: 'Plaza Premium Lounge',
    });
    zoneObjects['alliance-lounge'] = createBox(scene, {
        id: 'alliance-lounge',
        position: [50, 0, 8],
        size: [3.5, 2, 2.5],
        color: 0x4a5a3a,
        label: 'Alliance Lounge (T2)',
    });

    // --- Transport Hub East ---
    zoneObjects['transport-east'] = createBox(scene, {
        id: 'transport-east',
        position: [66, 0, -6],
        size: [6, 2, 4],
        color: 0x2a5050,
        label: 'Transport Hub East',
    });

    // --- Car Rental (inside circular road, per map) ---
    zoneObjects['car-rental'] = createBox(scene, {
        id: 'car-rental',
        position: [56, 0, -14],
        size: [5, 1.5, 4],
        color: 0x3a4a3a,
        label: 'Car Rental',
    });

    // --- Parking (East Precinct) ---
    zoneObjects['parking-east-p1'] = createParkingStructure(scene, [68, 0, -20], 8, 5, 6, 'parking-east-p1', 'Parking P1 (Short Stay)');
    zoneObjects['parking-east-p2'] = createParkingStructure(scene, [68, 0, -8],  9, 4, 5, 'parking-east-p2', 'Parking P2 (Long Stay)');
    zoneObjects['parking-east-p3'] = createParkingStructure(scene, [68, 0, 6],   9, 3, 4, 'parking-east-p3', 'Parking P3 (Value)');

    // =========================================
    // WEST PRECINCT — T3 and T4
    //
    // Layout (top = north = -Z):
    //   T4  [-50, z=-22]  south face z=-17.5
    //   connector          z=-15  (thin flush strip)
    //   T3  [-50, z=-7]   north face z=-12.5
    //
    // ALL piers extend EAST (+X) from east face of each terminal
    //   T4 east face  = x = -50+6 = -44  → pier starts [-44, 0, -22]
    //   T3 east face  = x = -50+7 = -43  → piers start [-43, 0, ...]
    //
    // Apron on east side, between terminals and runways
    // =========================================

    // West apron — east face of T3/T4 cluster facing runway
    zoneObjects['apron-west'] = createApron(scene, [-38, 0, -10], [16, 40], 'apron-west', 'West Apron (T3/T4)');

    // ── T4 Qantas (NORTH) ──
    // size [12, 5, 9]: x-width=12, z-depth=9 → south face at z = -22+4.5 = -17.5
    zoneObjects['t4-qantas'] = createTerminal(scene, {
        id: 't4-qantas',
        position: [-50, 0, -22],
        size: [12, 5, 9],
        color: C.t4,
        label: 'T4 Qantas',
    });

    // T4 pier — Gates 7-15, extends EAST (+X) from east face [-44, 0, -22]
    zoneObjects['t4-pier'] = createStraightPier(scene, {
        id: 't4-pier',
        position: [-44, 0, -22],
        length: 16,
        axis: 'x-pos',
        width: 4,
        height: 3.5,
        gateCount: 9,
        color: C.t4,
        label: 'T4 Gates 7-15',
    });

    // T4 aircraft on east/apron side
    [
        [-34, 0, -26], [-30, 0, -26], [-26, 0, -26],
        [-34, 0, -18], [-30, 0, -18], [-26, 0, -18],
    ].forEach(p => createAircraft(scene, p));

    // ── T3/T4 CONNECTOR — flush strip between terminals ──
    // Same x-position and x-width as T4, filling the gap
    // z from -16.5 to -13.5 (3 units, bridging gap between terminals)
    zoneObjects['t3-t4-connector'] = createBox(scene, {
        id: 't3-t4-connector',
        position: [-50, 0, -15],
        size: [12, 4.5, 3],
        color: 0x4a3820,
        label: 'T3–T4 Connector',
    });

    // ── T3 Qantas (SOUTH) ──
    // size [14, 5.5, 11]: x-width=14, z-depth=11 → north face at z = -7-5.5 = -12.5
    // (touches connector south face at z = -15+1.5 = -13.5, 1-unit gap = corridor)
    zoneObjects['t3-qantas'] = createTerminal(scene, {
        id: 't3-qantas',
        position: [-50, 0, -7],
        size: [14, 5.5, 11],
        color: C.t3,
        label: 'T3 Qantas',
    });

    // T3 North Pier — Gates 16-17C, extends EAST from north section of T3
    // east face of T3 = -50+7 = -43, north part of T3 center at z=-10
    zoneObjects['t3-pier-north'] = createStraightPier(scene, {
        id: 't3-pier-north',
        position: [-43, 0, -10],
        length: 12,
        axis: 'x-pos',
        width: 3.5,
        height: 3.5,
        gateCount: 4,
        color: C.t3,
        label: 'T3 Gates 16-17C',
    });

    // T3 South Pier — Gates 18-35, extends EAST from south section of T3
    zoneObjects['t3-pier-south'] = createStraightPier(scene, {
        id: 't3-pier-south',
        position: [-43, 0, -3],
        length: 20,
        axis: 'x-pos',
        width: 4,
        height: 3.5,
        gateCount: 10,
        color: C.t3,
        label: 'T3 Gates 18-35',
    });

    // T3 aircraft on east/apron side (parked along both piers)
    [
        [-32, 0, -14], [-28, 0, -14], [-24, 0, -14],
        [-32, 0, -6],  [-28, 0, -6],  [-24, 0, -6],
        [-32, 0,  2],  [-28, 0,  2],  [-24, 0,  2],
        [-32, 0,  10], [-28, 0,  10],
    ].forEach(p => createAircraft(scene, p));

    // T3/T4 Pick-up / Drop-off (landside east, road-facing at x≈-37)
    zoneObjects['t3-pickup'] = createBox(scene, {
        id: 't3-pickup',
        position: [-37, 0, -14],
        size: [4, 1.5, 16],
        color: 0x2a5050,
        label: 'T3/T4 Drop-off & Pick-up',
    });

    // --- Security West ---
    zoneObjects['security-west'] = createBox(scene, {
        id: 'security-west',
        position: [-50, 0, -18],
        size: [6, 2.5, 3],
        color: 0x5a3030,
        label: 'Security West (T3/T4)',
    });

    // --- Qantas Lounges (inside T4 airside) ---
    zoneObjects['qantas-club'] = createBox(scene, {
        id: 'qantas-club',
        position: [-54, 0, -24],
        size: [5, 2.5, 4],
        color: 0x8a2a2a,
        emissiveColor: 0xef4444,
        emissiveIntensity: 0.2,
        label: 'Qantas Club',
    });
    zoneObjects['qantas-business'] = createBox(scene, {
        id: 'qantas-business',
        position: [-54, 0, -16],
        size: [5, 2.5, 4],
        color: 0x8a2a2a,
        emissiveColor: 0xfbbf24,
        emissiveIntensity: 0.15,
        label: 'Qantas Business Lounge',
    });

    // --- Transport Hub West ---
    zoneObjects['transport-west'] = createBox(scene, {
        id: 'transport-west',
        position: [-37, 0, -4],
        size: [6, 2, 4],
        color: 0x2a5050,
        label: 'Transport Hub West',
    });

    // --- Parking (West Precinct) ---
    // P4 behind T4 (west, landside)
    zoneObjects['parking-west-p1'] = createParkingStructure(scene, [-62, 0, -22], 8, 4, 6, 'parking-west-p1', 'Parking P4 (Qantas Short Stay)');
    // P5 behind T3 (west, landside)
    zoneObjects['parking-west-p2'] = createParkingStructure(scene, [-62, 0, -6],  7, 3, 5, 'parking-west-p2', 'Parking P5 (West Long Stay)');

    // --- Redcliffe Train Station (far west, serves T3/T4 via Bus 292) ---
    zoneObjects['redcliffe-station'] = createBox(scene, {
        id: 'redcliffe-station',
        position: [-74, 0, 6],
        size: [7, 3, 5],
        color: C.station,
        emissiveColor: C.accent,
        emissiveIntensity: 0.3,
        label: 'Redcliffe Train Station',
    });

    // =========================================
    // SUPPORT FACILITIES
    // =========================================

    // --- Cargo & Freight (south, between precincts) ---
    zoneObjects['cargo-area'] = createBox(scene, {
        id: 'cargo-area',
        position: [14, 0, 40],
        size: [14, 3.5, 8],
        color: C.cargo,
        label: 'Freight & Cargo',
    });

    // --- FIFO Charter Terminal (northwest of T3) ---
    zoneObjects['fifo-terminal'] = createBox(scene, {
        id: 'fifo-terminal',
        position: [-50, 0, 26],
        size: [9, 3, 6],
        color: C.support,
        label: 'FIFO Charter Terminal',
    });

    // --- Aircraft Maintenance Hangar (southwest) ---
    zoneObjects['maintenance'] = createBox(scene, {
        id: 'maintenance',
        position: [-60, 0, 12],
        size: [10, 5, 8],
        color: 0x2a3040,
        label: 'Aircraft Maintenance Hangar',
    });

    // --- Fuel Farm (south) ---
    zoneObjects['fuel-farm'] = createBox(scene, {
        id: 'fuel-farm',
        position: [8, 0, 44],
        size: [6, 2.5, 5],
        color: 0x4a3030,
        label: 'Fuel Farm',
    });

    // --- General Aviation Terminal ---
    zoneObjects['ga-terminal'] = createBox(scene, {
        id: 'ga-terminal',
        position: [-66, 0, -20],
        size: [7, 3, 5],
        color: C.support,
        label: 'General Aviation Terminal',
    });

    // --- Outdoor Aircraft Viewing Platform (southwest) ---
    zoneObjects['viewing-platform'] = createBox(scene, {
        id: 'viewing-platform',
        position: [-40, 0, 36],
        size: [6, 1, 4],
        color: 0x2a3a4a,
        label: 'Viewing Platform',
    });

    // =========================================
    // ROADS
    // =========================================

    // Airport Drive — main E-W road connecting both precincts (south)
    createRoad(scene, [0, 0, 34], 120, 'x');
    // East access road serving T1/T2 (N-S)
    createRoad(scene, [60, 0, 6], 32, 'z');
    // West access road serving T3/T4 (N-S)
    createRoad(scene, [-34, 0, -16], 20, 'z');
    // Tonkin Highway (far west, runs N-S)
    createRoad(scene, [-80, 0, 0], 80, 'z');
    // Shuttle bus road between precincts
    createRoad(scene, [0, 0, 30], 120, 'x');

    return zoneObjects;
}

// ─────────────────────────────────────────────
// BUILDER FUNCTIONS
// ─────────────────────────────────────────────

// ── Terminal main body ──
function createTerminal(scene, config) {
    const group = new THREE.Group();
    group.userData = { zoneId: config.id, label: config.label };
    const [w, h, d] = config.size;

    // Main structure
    const bodyGeo = new THREE.BoxGeometry(w, h, d);
    const bodyMat = new THREE.MeshStandardMaterial({
        color: config.color, roughness: 0.2, metalness: 0.5,
        transparent: true, opacity: 0.93,
        emissive: config.color, emissiveIntensity: 0.18,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = h / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Roof layer
    const roofGeo = new THREE.BoxGeometry(w - 1, 0.6, d - 1);
    const roofMat = new THREE.MeshStandardMaterial({
        color: 0x3a4a60, roughness: 0.3, metalness: 0.6,
        emissive: 0x1a2535, emissiveIntensity: 0.15,
    });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.y = h + 0.3;
    roof.castShadow = true;
    group.add(roof);

    // Glass curtain wall (front face)
    const glassFront = new THREE.Mesh(
        new THREE.BoxGeometry(w + 0.2, h * 0.65, 0.14),
        new THREE.MeshStandardMaterial({
            color: C.glass, roughness: 0.04, metalness: 0.85,
            transparent: true, opacity: 0.55,
            emissive: C.accent, emissiveIntensity: 0.5,
        })
    );
    glassFront.position.set(0, h * 0.4, d / 2 + 0.07);
    group.add(glassFront);

    // Glass curtain wall (back face)
    const glassBack = glassFront.clone();
    glassBack.position.z = -d / 2 - 0.07;
    group.add(glassBack);

    // Cyan edge accent lines
    const edgeMat = new THREE.MeshBasicMaterial({ color: C.accent, transparent: true, opacity: 0.85 });
    [d / 2 + 0.14, -d / 2 - 0.14].forEach(z => {
        const bot = new THREE.Mesh(new THREE.BoxGeometry(w + 0.5, 0.14, 0.14), edgeMat);
        bot.position.set(0, 0.07, z);
        group.add(bot);
        const top = bot.clone();
        top.position.y = h;
        group.add(top);
    });

    // Ground footprint glow
    const glowGeo = new THREE.BoxGeometry(w + 0.3, 0.05, d + 0.3);
    const glowMat = new THREE.MeshBasicMaterial({ color: C.accent, transparent: true, opacity: 0.45 });
    group.add(new THREE.Mesh(glowGeo, glowMat));

    group.position.set(...config.position);
    scene.add(group);
    return { mesh: group, config };
}

// ── Straight pier/concourse ──
function createStraightPier(scene, config) {
    const group = new THREE.Group();
    group.userData = { zoneId: config.id, label: config.label };
    const { length: len, width: w, height: h, axis, gateCount } = config;
    const isXneg  = axis === 'x-neg';
    const isXpos  = axis === 'x-pos';
    const isX     = isXneg || isXpos;
    const isZneg  = axis === 'z-neg';

    // Corridor
    const cGeo = isX
        ? new THREE.BoxGeometry(len, h, w)
        : new THREE.BoxGeometry(w, h, len);
    const cMat = new THREE.MeshStandardMaterial({
        color: config.color || C.pier, roughness: 0.25, metalness: 0.5,
        transparent: true, opacity: 0.9,
        emissive: 0x1a3050, emissiveIntensity: 0.2,
    });
    const corridor = new THREE.Mesh(cGeo, cMat);
    if (isXneg)      corridor.position.set(-len / 2, h / 2, 0);
    else if (isXpos) corridor.position.set( len / 2, h / 2, 0);
    else if (isZneg) corridor.position.set(0, h / 2, -len / 2);
    else             corridor.position.set(0, h / 2,  len / 2);
    corridor.castShadow = true;
    group.add(corridor);

    // Glass sides
    const glassMat = new THREE.MeshStandardMaterial({
        color: C.glass, transparent: true, opacity: 0.45,
        emissive: C.accent, emissiveIntensity: 0.5, roughness: 0.05, metalness: 0.85,
    });
    const gGeo = isX
        ? new THREE.BoxGeometry(len, h * 0.55, 0.12)
        : new THREE.BoxGeometry(0.12, h * 0.55, len);
    if (isX) {
        const cx = isXneg ? -len / 2 : len / 2;
        [-w / 2 - 0.06, w / 2 + 0.06].forEach(z => {
            const g = new THREE.Mesh(gGeo, glassMat);
            g.position.set(cx, h * 0.4, z);
            group.add(g);
        });
    } else {
        const off = isZneg ? -len / 2 : len / 2;
        [-w / 2 - 0.06, w / 2 + 0.06].forEach(x => {
            const g = new THREE.Mesh(gGeo, glassMat);
            g.position.set(x, h * 0.4, off);
            group.add(g);
        });
    }

    // Jetbridges / gate stubs
    const gs = len / gateCount;
    const bridgeMat = new THREE.MeshBasicMaterial({ color: C.accent, transparent: true, opacity: 0.55 });
    const standMat  = new THREE.MeshBasicMaterial({ color: C.accentGreen, transparent: true, opacity: 0.2 });
    for (let i = 0; i < gateCount; i++) {
        const side = i % 2 === 0 ? 1 : -1;
        const bGeo = isX
            ? new THREE.BoxGeometry(0.35, 0.35, 3.8)
            : new THREE.BoxGeometry(3.8, 0.35, 0.35);
        const br = new THREE.Mesh(bGeo, bridgeMat);
        const sGeo = isX
            ? new THREE.BoxGeometry(1.8, 0.08, 4.5)
            : new THREE.BoxGeometry(4.5, 0.08, 1.8);
        const st = new THREE.Mesh(sGeo, standMat);

        if (isX) {
            const xOffset = isXneg ? -gs * (i + 0.5) : gs * (i + 0.5);
            br.position.set(xOffset, 0.2, side * (w / 2 + 1.9));
            st.position.set(xOffset, 0.04, side * (w / 2 + 3.2));
        } else {
            const dir = isZneg ? -1 : 1;
            br.position.set(side * (w / 2 + 1.9), 0.2, dir * gs * (i + 0.5));
            st.position.set(side * (w / 2 + 3.2), 0.04, dir * gs * (i + 0.5));
        }
        group.add(br, st);
    }

    // Top accent line
    const tMat = new THREE.MeshBasicMaterial({ color: C.accent, transparent: true, opacity: 0.7 });
    const tGeo = isX
        ? new THREE.BoxGeometry(len, 0.1, 0.12)
        : new THREE.BoxGeometry(0.12, 0.1, len);
    const tl = new THREE.Mesh(tGeo, tMat);
    tl.position.copy(corridor.position);
    tl.position.y = h;
    group.add(tl);

    group.position.set(...config.position);
    scene.add(group);
    return { mesh: group, config };
}

// ── Angled pier (T2 SW, T4 NE) ──
function createAngledPier(scene, config) {
    const group = new THREE.Group();
    group.userData = { zoneId: config.id, label: config.label };
    const w = 3.5, h = 3.5, len = config.length;

    const cGeo = new THREE.BoxGeometry(w, h, len);
    const cMat = new THREE.MeshStandardMaterial({
        color: config.color || C.pier, roughness: 0.25, metalness: 0.5,
        transparent: true, opacity: 0.9,
        emissive: 0x1a3050, emissiveIntensity: 0.2,
    });
    const c = new THREE.Mesh(cGeo, cMat);
    c.position.set(0, h / 2, len / 2);
    c.castShadow = true;
    group.add(c);

    // Glass sides
    const gMat = new THREE.MeshStandardMaterial({
        color: C.glass, transparent: true, opacity: 0.45,
        emissive: C.accent, emissiveIntensity: 0.5, roughness: 0.05, metalness: 0.85,
    });
    [-w / 2 - 0.06, w / 2 + 0.06].forEach(x => {
        const g = new THREE.Mesh(new THREE.BoxGeometry(0.12, h * 0.55, len), gMat);
        g.position.set(x, h * 0.4, len / 2);
        group.add(g);
    });

    // Gate stubs on both sides
    const bridgeMat = new THREE.MeshBasicMaterial({ color: C.accent, transparent: true, opacity: 0.55 });
    const standMat  = new THREE.MeshBasicMaterial({ color: C.accentGreen, transparent: true, opacity: 0.2 });
    const gs = len / config.gateCount;
    for (let i = 0; i < config.gateCount; i++) {
        const side = i % 2 === 0 ? 1 : -1;
        const br = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.35, 0.35), bridgeMat);
        const st = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.08, 1.8), standMat);
        br.position.set(side * (w / 2 + 1.9), 0.2, gs * (i + 0.5));
        st.position.set(side * (w / 2 + 3.2), 0.04, gs * (i + 0.5));
        group.add(br, st);
    }

    // Top accent
    const tl = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.1, len),
        new THREE.MeshBasicMaterial({ color: C.accent, transparent: true, opacity: 0.7 })
    );
    tl.position.set(0, h, len / 2);
    group.add(tl);

    group.position.set(...config.startPos);
    group.rotation.y = config.angle;
    scene.add(group);
    return { mesh: group, config };
}

// ── Generic box (utility buildings) ──
function createBox(scene, config) {
    const group = new THREE.Group();
    group.userData = { zoneId: config.id, label: config.label };
    const [w, h, d] = config.size;

    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({
        color: config.color, roughness: 0.3, metalness: 0.4,
        transparent: true, opacity: 0.9,
        emissive: config.emissiveColor || config.color,
        emissiveIntensity: config.emissiveIntensity ?? 0.18,
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.y = h / 2;
    m.castShadow = true;
    m.receiveShadow = true;
    group.add(m);

    // Footprint glow
    const eGeo = new THREE.BoxGeometry(w + 0.2, 0.05, d + 0.2);
    const eMat = new THREE.MeshBasicMaterial({ color: C.accent, transparent: true, opacity: 0.4 });
    group.add(new THREE.Mesh(eGeo, eMat));

    group.position.set(...config.position);
    scene.add(group);
    return { mesh: group, config };
}

// ── Runway ──
function createRunway(scene, position, length, rotation, id, label) {
    const group = new THREE.Group();
    if (id) group.userData = { zoneId: id, label: label || id };

    // Asphalt surface
    const rMat = new THREE.MeshStandardMaterial({ color: C.runway, roughness: 0.75, metalness: 0.1 });
    group.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.1, length), rMat), { receiveShadow: true }));

    // Centre line dashes
    const dashMat = new THREE.MeshBasicMaterial({ color: C.white, transparent: true, opacity: 0.65 });
    for (let i = -length / 2 + 4; i < length / 2 - 4; i += 5.5) {
        const d = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 2.4), dashMat);
        d.position.set(0, 0.06, i);
        group.add(d);
    }

    // Threshold markings at both ends
    const threshMat = new THREE.MeshBasicMaterial({ color: C.white, transparent: true, opacity: 0.75 });
    [-length / 2 + 3, length / 2 - 3].forEach(z => {
        for (let x = -1.4; x <= 1.4; x += 0.45) {
            const t = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.12, 2.8), threshMat);
            t.position.set(x, 0.06, z);
            group.add(t);
        }
    });

    // Edge lights (blue on left, green on right)
    for (let i = -length / 2; i <= length / 2; i += 6) {
        const lg = new THREE.SphereGeometry(0.14, 6, 6);
        const ll = new THREE.Mesh(lg, new THREE.MeshBasicMaterial({ color: C.accent }));
        const lr = new THREE.Mesh(lg, new THREE.MeshBasicMaterial({ color: C.accentGreen }));
        ll.position.set(-2.1, 0.14, i);
        lr.position.set(2.1, 0.14, i);
        group.add(ll, lr);
    }

    group.rotation.y = rotation;
    group.position.set(...position);
    scene.add(group);
    return { mesh: group, config: { id, label } };
}

// ── Runway under construction ──
function createRunwayUnderConstruction(scene, position, length, rotation, id, label) {
    const group = new THREE.Group();
    if (id) group.userData = { zoneId: id, label: label || id };

    const rMat = new THREE.MeshStandardMaterial({
        color: 0x2e2e20, roughness: 0.85, metalness: 0.05,
        transparent: true, opacity: 0.5,
    });
    group.add(new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, length), rMat));

    // Construction amber dashes along edges
    const ambMat = new THREE.MeshBasicMaterial({ color: C.accentAmber, transparent: true, opacity: 0.7 });
    for (let i = -length / 2; i < length / 2; i += 4) {
        [-1.8, 1.8].forEach(x => {
            const d = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 1.8), ambMat);
            d.position.set(x, 0.05, i);
            group.add(d);
        });
    }

    // "Under Construction" marker every 20 units
    const markerMat = new THREE.MeshBasicMaterial({ color: C.accentAmber, transparent: true, opacity: 0.5 });
    for (let i = -length / 2; i < length / 2; i += 20) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.12, 1.2), markerMat);
        m.position.set(0, 0.06, i);
        group.add(m);
    }

    group.rotation.y = rotation;
    group.position.set(...position);
    scene.add(group);
    return { mesh: group, config: { id, label } };
}

// ── Angled taxiway (parallel to rotated runway) ──
function createAngledTaxiway(scene, position, length, rotation, id, label) {
    const group = new THREE.Group();
    if (id) group.userData = { zoneId: id, label: label || id };
    const mat = new THREE.MeshStandardMaterial({ color: C.taxiway, roughness: 0.65, metalness: 0.05 });
    group.add(new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.07, length), mat));
    // Centre line
    const lMat = new THREE.MeshBasicMaterial({ color: C.accentAmber, transparent: true, opacity: 0.45 });
    group.add(new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.09, length), lMat));
    group.rotation.y = rotation;
    group.position.set(...position);
    scene.add(group);
    return { mesh: group, config: { id, label } };
}

// ── Straight taxiway (N-S or E-W) ──
function createTaxiway(scene, position, length, direction, id, label) {
    const group = new THREE.Group();
    if (id) group.userData = { zoneId: id, label: label || id };
    const isX = direction === 'x';
    const geo = isX
        ? new THREE.BoxGeometry(length, 0.07, 2.4)
        : new THREE.BoxGeometry(2.4, 0.07, length);
    const mat = new THREE.MeshStandardMaterial({ color: C.taxiway, roughness: 0.65, metalness: 0.05 });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(0, 0.035, 0);
    m.receiveShadow = true;
    group.add(m);
    const lGeo = isX
        ? new THREE.BoxGeometry(length, 0.09, 0.1)
        : new THREE.BoxGeometry(0.1, 0.09, length);
    const lMat = new THREE.MeshBasicMaterial({ color: C.accentAmber, transparent: true, opacity: 0.4 });
    group.add(new THREE.Mesh(lGeo, lMat));
    group.position.set(position[0], position[1] + 0.035, position[2]);
    scene.add(group);
    return { mesh: group, config: { id, label } };
}

// ── Apron ──
function createApron(scene, position, size, id, label) {
    const group = new THREE.Group();
    if (id) group.userData = { zoneId: id, label: label || id };
    const geo = new THREE.BoxGeometry(size[0], 0.06, size[1]);
    const mat = new THREE.MeshStandardMaterial({ color: 0x161e28, roughness: 0.85, metalness: 0.08 });
    const m = new THREE.Mesh(geo, mat);
    m.receiveShadow = true;
    group.add(m);
    // Apron markings (hold lines)
    const lineMat = new THREE.MeshBasicMaterial({ color: C.accentAmber, transparent: true, opacity: 0.3 });
    for (let x = -size[0] / 2 + 3; x < size[0] / 2; x += 5) {
        const l = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, size[1]), lineMat);
        l.position.set(x, 0.04, 0);
        group.add(l);
    }
    group.position.set(position[0], 0.03, position[2]);
    scene.add(group);
    return { mesh: group, config: { id, label } };
}

// ── Aircraft (parked at gate) ──
function createAircraft(scene, position) {
    const group = new THREE.Group();

    const fuselMat = new THREE.MeshStandardMaterial({
        color: 0xdce4ec, roughness: 0.2, metalness: 0.65,
        emissive: 0xaaaaaa, emissiveIntensity: 0.08,
    });
    // Fuselage
    const f = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 3.8, 12), fuselMat);
    f.rotation.z = Math.PI / 2;
    f.position.y = 0.65;
    f.castShadow = true;
    group.add(f);

    // Wings
    const wMat = new THREE.MeshStandardMaterial({ color: 0xc8d0da, roughness: 0.25, metalness: 0.55 });
    const wing = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.05, 3.4), wMat);
    wing.position.y = 0.65;
    wing.castShadow = true;
    group.add(wing);

    // Tail fin
    const tail = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.95, 0.7), new THREE.MeshStandardMaterial({ color: 0xb02020, roughness: 0.3, metalness: 0.4 }));
    tail.position.set(-1.7, 1.2, 0);
    group.add(tail);

    // Nose cone
    const nose = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.85, 12), fuselMat);
    nose.rotation.z = -Math.PI / 2;
    nose.position.set(2.3, 0.65, 0);
    group.add(nose);

    group.position.set(position[0], position[1], position[2]);
    group.rotation.y = position[3] ?? (Math.random() * Math.PI * 2);
    group.scale.set(0.7, 0.7, 0.7);
    scene.add(group);
}

// ── ATC Control Tower ──
function createControlTower(scene, position) {
    const group = new THREE.Group();
    group.userData = { zoneId: 'control-tower', label: 'ATC Control Tower' };

    // Base
    const bMat = new THREE.MeshStandardMaterial({ color: 0x303d55, roughness: 0.35, metalness: 0.5 });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.5, 2.2, 8), bMat);
    base.position.set(0, 1.1, 0);
    base.castShadow = true;
    group.add(base);

    // Shaft
    const sMat = new THREE.MeshStandardMaterial({ color: 0x404e68, roughness: 0.3, metalness: 0.5 });
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 1.15, 16, 8), sMat);
    shaft.position.y = 10;
    shaft.castShadow = true;
    group.add(shaft);

    // Cab (glazed observation deck)
    const cMat = new THREE.MeshStandardMaterial({
        color: C.glass, roughness: 0.04, metalness: 0.9,
        transparent: true, opacity: 0.65,
        emissive: C.accent, emissiveIntensity: 0.9,
    });
    const cab = new THREE.Mesh(new THREE.CylinderGeometry(2.8, 2.0, 3.2, 12), cMat);
    cab.position.y = 19.6;
    group.add(cab);

    // Antenna
    const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 4.5, 4), new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 1 }));
    ant.position.y = 23.2;
    group.add(ant);

    // Beacon
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), new THREE.MeshBasicMaterial({ color: 0xef4444 }));
    beacon.position.y = 25.5;
    group.add(beacon);

    group.position.set(position[0], position[1], position[2]);
    scene.add(group);
    return { mesh: group, config: { id: 'control-tower', label: 'ATC Control Tower' } };
}

// ── Parking Structure ──
function createParkingStructure(scene, position, w = 8, h = 4, d = 6, id, label) {
    const group = new THREE.Group();
    if (id) group.userData = { zoneId: id, label: label || id };
    const geo = new THREE.BoxGeometry(w, h, d);
    const mat = new THREE.MeshStandardMaterial({
        color: C.parking, roughness: 0.55, metalness: 0.3,
        emissive: 0x141c28, emissiveIntensity: 0.12,
    });
    const m = new THREE.Mesh(geo, mat);
    m.position.y = h / 2;
    m.castShadow = true;
    group.add(m);

    // Level lines
    const lMat = new THREE.MeshBasicMaterial({ color: C.accent, transparent: true, opacity: 0.25 });
    for (let i = 0; i < Math.floor(h); i++) {
        const l = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, 0.05, 0.05), lMat);
        l.position.set(0, i + 0.5, d / 2 + 0.02);
        group.add(l);
    }

    group.position.set(...position);
    scene.add(group);
    return { mesh: group, config: { id, label } };
}

// ── Skybridge Zone (hoverable) ──
function createSkybridgeZone(scene, from, to, id, label) {
    const group = new THREE.Group();
    group.userData = { zoneId: id, label: label || id };
    const dir = new THREE.Vector3(to[0] - from[0], 0, to[2] - from[2]);
    const len = dir.length();
    const midY = (from[1] + to[1]) / 2;
    const mat = new THREE.MeshStandardMaterial({
        color: 0x2a5a7a, transparent: true, opacity: 0.75,
        emissive: C.accent, emissiveIntensity: 0.35,
        roughness: 0.1, metalness: 0.7,
    });
    const m = new THREE.Mesh(new THREE.BoxGeometry(2, 1.2, len), mat);
    m.position.set((from[0] + to[0]) / 2, midY, (from[2] + to[2]) / 2);
    m.rotation.y = Math.atan2(to[0] - from[0], to[2] - from[2]);
    m.castShadow = true;
    group.add(m);
    scene.add(group);
    return { mesh: group, config: { id, label } };
}

// ── Skybridge / Elevated Walkway (non-hoverable, plain) ──
function createSkybridge(scene, from, to) {
    const dir = new THREE.Vector3(to[0] - from[0], 0, to[2] - from[2]);
    const len = dir.length();
    const midY = (from[1] + to[1]) / 2;

    const mat = new THREE.MeshStandardMaterial({
        color: 0x2a5a7a, transparent: true, opacity: 0.75,
        emissive: C.accent, emissiveIntensity: 0.35,
        roughness: 0.1, metalness: 0.7,
    });
    const m = new THREE.Mesh(new THREE.BoxGeometry(2, 1.2, len), mat);
    m.position.set((from[0] + to[0]) / 2, midY, (from[2] + to[2]) / 2);
    m.rotation.y = Math.atan2(to[0] - from[0], to[2] - from[2]);
    m.castShadow = true;
    scene.add(m);
}

// ── Road ──
function createRoad(scene, position, length, direction) {
    const isX = direction === 'x';
    const geo = isX
        ? new THREE.BoxGeometry(length, 0.06, 2.5)
        : new THREE.BoxGeometry(2.5, 0.06, length);
    const mat = new THREE.MeshStandardMaterial({ color: C.road, roughness: 0.85, metalness: 0.02 });
    const m = new THREE.Mesh(geo, mat);
    m.position.set(position[0], 0.03, position[2]);
    m.receiveShadow = true;
    scene.add(m);

    // White dashes
    const dc = Math.floor(length / 5);
    const dMat = new THREE.MeshBasicMaterial({ color: C.white, transparent: true, opacity: 0.25 });
    for (let i = 0; i < dc; i++) {
        const d = new THREE.Mesh(
            isX ? new THREE.BoxGeometry(1.6, 0.08, 0.1) : new THREE.BoxGeometry(0.1, 0.08, 1.6),
            dMat
        );
        if (isX) d.position.set(position[0] - length / 2 + i * 5 + 2.5, 0.04, position[2]);
        else     d.position.set(position[0], 0.04, position[2] - length / 2 + i * 5 + 2.5);
        scene.add(d);
    }
}
