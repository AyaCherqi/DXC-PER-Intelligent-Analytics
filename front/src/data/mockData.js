// ============================================
// Perth Airport – Mock Data
// ============================================

export const alerts = [
  {
    id: 'ALT-001', timestamp: '2026-03-25T08:32:00Z', source: 'CrowdSense AI',
    zone: 'T1 Security East', severity: 'critical', category: 'Congestion',
    description: 'Passenger density at T1 security screening: 4.2 pax/m² (threshold: 3.0 red, >4.5 critical). FIFO Mon/Tue adjusted threshold: 3.5 pax/m². Queue length: 310 passengers. Three wide-body arrivals converging (Singapore, Dubai, KL).',
    action: 'Open 3 additional screening lanes (M/M/c model: 12 lanes required). Issue 20-min advance notice to ABF. Deploy fast-track overflow to Gate 54 corridor.',
    status: 'new'
  },
  {
    id: 'ALT-002', timestamp: '2026-03-25T08:28:00Z', source: 'ThreatGuard AI',
    zone: 'T1 Sterile Zone', severity: 'critical', category: 'Security',
    description: 'Unattended baggage detected — sterile zone, Gate 52 corridor. Object stationary 4 min 20 sec (threshold: >3 min → Critical). Threat score: 0.61 / Forgotten score: 0.28. AFP notification sent per Aviation Transport Security Act 2004.',
    action: 'SOC visual confirmation required within 2 min. AFP responding (Protocol Amber). Passenger PA recall in English and Mandarin (SQ flight at Gate 52).',
    status: 'escalated'
  },
  {
    id: 'ALT-003', timestamp: '2026-03-25T08:25:00Z', source: 'GateOps AI',
    zone: 'T1 Gate 54', severity: 'high', category: 'Resource Conflict',
    description: 'Gate conflict: QF9 (dep 10:45, B787 wide-body) and SQ226 (dep 11:00). Turnaround overlap: 18 min. Wide-body buffer requires +10 min vs narrow-body. Gate reassignment score: 74/100 for Gate 52 alternative.',
    action: 'Reassign SQ226 to Gate 52 (available 10:30). Notify SQ OCC and Swissport ground handler. Minimum 20 min gap maintained per SLA.',
    status: 'in_progress'
  },
  {
    id: 'ALT-004', timestamp: '2026-03-25T08:20:00Z', source: 'EnergyOptimize AI',
    zone: 'T1 International', severity: 'medium', category: 'Energy Risk',
    description: 'Predicted energy peak: 08:55 AWST. Forecast demand: 8.1 MW (90% of 9.0 MW contractual limit — Red threshold). Perth summer mode active (39°C today). HVAC at 53% of total draw. Synergy TOU peak period starts 14:00.',
    action: 'Initiate T1 HVAC pre-cooling NOW (20-min lead time per cartography). Pre-start standby generator. Shift non-critical loads away from 14:00–20:00 Synergy TOU window.',
    status: 'new'
  },
  {
    id: 'ALT-005', timestamp: '2026-03-25T08:15:00Z', source: 'RetailPulse AI',
    zone: 'T1 Duty Free (International)', severity: 'low', category: 'Retail Demand Surge',
    description: 'AFL game day at Optus Stadium (Perth Scorchers vs Melbourne). Retail footfall forecast: +22% above baseline (AFL multiplier 1.22×). T1 Duty Free current conversion: 9.2% (above 8% benchmark). School holiday WA Period 1 ends this week.',
    action: 'Increase T1 Duty Free staffing +30% for 09:00–12:00. Pre-load AFL content on digital signage (AANA compliant). Activate dynamic ad scheduling for Melbourne-origin passengers.',
    status: 'resolved'
  },
  {
    id: 'ALT-006', timestamp: '2026-03-25T08:10:00Z', source: 'SystemWatch AI',
    zone: 'T4 Qantas Domestic', severity: 'medium', category: 'System Anomaly',
    description: 'HVAC sensor cluster T4-B3 reporting 18% packet loss. BMS sub-meter reading gap: last valid reading 07:58. Energy intensity cannot be normalised for kWh/m². T4 HVAC currently at 58% draw (above 55% cap — cartography anomaly threshold).',
    action: 'Dispatch maintenance crew to T4-B3 HVAC cluster. Manual meter reading requested. Escalate if BMS gap exceeds 30 min (NGER reporting compliance).',
    status: 'acknowledged'
  },
  {
    id: 'ALT-007', timestamp: '2026-03-25T08:05:00Z', source: 'CrowdSense AI',
    zone: 'T1 Immigration (ABF)', severity: 'high', category: 'Congestion',
    description: 'T1 Immigration: avg processing time 8.4 min/pax (SLA target <10 min, 95th pct <20 min). Queue: 290 pax. 4 SmartGate kiosks offline (ABF maintenance). Wait time >1.5× target (amber threshold crossed at 7.5 min).',
    action: 'Activate 4 additional SmartGate kiosks. Request ABF shift supervisor deploy 2 additional counters (15 min advance notice required per cartography). Estimated SLA recovery: 12 min.',
    status: 'in_progress'
  },
  {
    id: 'ALT-008', timestamp: '2026-03-25T07:58:00Z', source: 'ThreatGuard AI',
    zone: 'T2 FIFO Terminal', severity: 'high', category: 'Security',
    description: 'Suspicious behaviour: individual loitering 12 min at T2 FIFO gate area (>10 min threshold). Trajectory anomaly score: 0.87 (threshold: >0.85 per cartography). Body pose/trajectory only — no facial recognition (Australian Privacy Act 1988 / OAIC compliant).',
    action: 'SOC operator review required before action. Deploy AFP patrol to T2 FIFO gate. Log in Security Incident DB. False alarm rate this shift: 7 (within <15/shift target).',
    status: 'acknowledged'
  },
  {
    id: 'ALT-009', timestamp: '2026-03-25T07:50:00Z', source: 'GateOps AI',
    zone: 'T3 Gates 18–35', severity: 'medium', category: 'Resource Conflict',
    description: 'Ground crew shortage at T3 south pier. 3 of 10 gates lack assigned Qantas/Swissport ground handling for next rotation. Cross-terminal deployment from T4 requires 10-min transit time (cartography constraint). Delay propagation risk: 720 pax-delay-minutes.',
    action: 'Reassign 2 ground crews from T4 (overstaffed by 1 team). Staff rebalance must account for ASIC clearance and equipment certification. Notify T3 Duty Manager.',
    status: 'new'
  },
  {
    id: 'ALT-010', timestamp: '2026-03-25T07:42:00Z', source: 'EnergyOptimize AI',
    zone: 'T1 International (Solar Array)', severity: 'low', category: 'Energy Risk',
    description: 'Solar PV array efficiency: 76% (dust accumulation). Current generation: 0.8 MW (expected: 1.05 MW at today\'s irradiance). Shortfall: 0.25 MW → net demand increases. WA SWIS grid factor 0.69 kgCO2/kWh — additional grid draw: ~0.17 tCO2e/day.',
    action: 'Schedule panel cleaning within 48h. Update net demand forecast in EnergyOptimize model. Log in NGER reporting system.',
    status: 'resolved'
  },
  {
    id: 'ALT-011', timestamp: '2026-03-25T07:35:00Z', source: 'CrowdSense AI',
    zone: 'Transport Hub East', severity: 'medium', category: 'Congestion',
    description: 'T1/T2 kerbside: taxi queue wait 14 min (target <10 min). Rideshare pickup at 91% capacity. Airport Central Station inbound: 1,340 pax/hr (max 1,800/hr — 74% utilisation). Bus 37 to Oats Street running 8 min late.',
    action: 'Request additional taxi dispatch (Swan Taxis priority). Activate overflow kerbside zone B. Alert Airport Central Station management. ETA clearance: 18 min.',
    status: 'acknowledged'
  },
  {
    id: 'ALT-012', timestamp: '2026-03-25T07:28:00Z', source: 'RetailPulse AI',
    zone: 'Qantas Club Lounge', severity: 'low', category: 'Retail Demand Surge',
    description: 'Qantas Club occupancy: 93% (298/320 capacity). Booking queue: 14 QFF Gold/Platinum members. Qantas Business Lounge at 62% — suitable overflow capacity available. FIFO workers with Qantas FF status contributing to Mon/Tue AM spike.',
    action: 'Redirect Qantas FF Gold overflow to Business Lounge (available capacity: 68 seats). Notify lounge staff. Update Perth Airport app lounge status widget.',
    status: 'resolved'
  },
  {
    id: 'ALT-013', timestamp: '2026-03-25T07:20:00Z', source: 'ThreatGuard AI',
    zone: 'Cargo & Freight', severity: 'high', category: 'Security',
    description: 'X-ray anomaly: cargo container CG-2241 flagged, confidence 92%. Object classification: dense metallic cluster (non-standard). ABF (Australian Border Force) notification sent. Aviation Transport Security Regulations 2005 — secondary inspection mandatory.',
    action: 'Route CG-2241 to secondary inspection bay immediately. ABF officer on-site ETA 4 min. Full video clip logged (30 sec before detection). ASIC-zone access log reviewed.',
    status: 'in_progress'
  },
  {
    id: 'ALT-014', timestamp: '2026-03-25T07:12:00Z', source: 'SystemWatch AI',
    zone: 'T2 Regional', severity: 'critical', category: 'System Anomaly',
    description: 'FIDS (Flight Information Display System) outage — T2 departure hall. 14 screens offline. Affects FIFO charter departures (4 flights, ~380 mining workers). Perth Airport app push notifications activated as fallback. IT recovery team ETA 9 min.',
    action: 'Deploy backup display system. Dispatch IT recovery crew to T2. Activate Perth Airport app push notifications for affected flights. Ground staff with handheld boards to T2 gates.',
    status: 'in_progress'
  },
  {
    id: 'ALT-015', timestamp: '2026-03-25T07:05:00Z', source: 'GateOps AI',
    zone: 'FIFO Charter Terminal', severity: 'medium', category: 'Resource Conflict',
    description: 'FIFO peak: 5 mining charter flights queued for 2 available gates (Mon/Tue AM 1.8× surge multiplier active). Operators: NorthWest Alliance (Pilbara), Goldfields Air (Kalgoorlie). FIFO boarding SLA tolerance: +10 min vs scheduled. Current avg delay: 26 min.',
    action: 'Open secondary FIFO gate. Stagger departures by 15 min. Apply FIFO-specific turnaround profile (faster, reduced cargo). Notify FIFO employer coordinators (NorthWest Alliance, Goldfields Air).',
    status: 'resolved'
  },
];

export const smartActions = [
  {
    id: 'SA-001',
    title: 'Open 3 additional T1 security lanes — FIFO Mon/Tue surge active',
    description: 'CrowdSense AI: density 4.2 pax/m² (red threshold 3.0). M/M/c queueing model requires 12 lanes at 75–85% utilisation. FIFO Mon/Tue adjusted threshold (+0.5 pax/m²) already applied. ABF notified (15-min advance notice per cartography). 3 lanes can open within 5 min.',
    priority: 94, impact: 'Operational', confidence: 91,
    linkedAlerts: ['ALT-001'], zones: ['T1 Security East', 'T1 Immigration (ABF)'],
    benefit: '~390 pax delay avoided | avg wait reduced from 7.2 min → 4.8 min (below 5 min SLA)', status: 'pending'
  },
  {
    id: 'SA-002',
    title: 'Initiate T1 HVAC pre-cooling — Perth summer 39°C, peak in 18 min',
    description: 'EnergyOptimize AI predicts 8.1 MW demand at 08:55 (90% of 9.0 MW contractual limit — Red threshold). Pre-cooling must start 20 min before peak (cartography). Net solar offset: 0.8 MW. HVAC currently 53% of load (below 55% cap). Synergy TOU tariff peak starts 14:00 — load shift opportunity.',
    priority: 88, impact: 'Strategic', confidence: 93,
    linkedAlerts: ['ALT-004'], zones: ['T1 International', 'T1 Gates 50–56'],
    benefit: 'Avoids contractual demand charge overrun | saves est. AUD 8.4K (Synergy TOU tariff) | 0.69 kgCO2/kWh grid factor offset', status: 'pending'
  },
  {
    id: 'SA-003',
    title: 'Reassign SQ226 to Gate 52 — resolve T1 Gate 54 turnaround conflict',
    description: 'GateOps AI gate reassignment score: 74/100 for Gate 52 (TOPSIS optimisation). Wide-body buffer: +10 min vs narrow-body applied to QF9 (B787). Gate 52 available from 10:30, minimum 20-min gap maintained. Swissport ground handler notified. Walking distance delta for pax: +3 min (within MCT).',
    priority: 86, impact: 'Financial', confidence: 95,
    linkedAlerts: ['ALT-003'], zones: ['T1 Gate 54', 'T1 Gate 52'],
    benefit: 'Prevents 35-min cascading delay | ~AUD 31K cost avoidance | protects 2 downstream QF rotations', status: 'pending'
  },
  {
    id: 'SA-004',
    title: 'Activate FIFO surge plan — T2 early-morning 1.8× multiplier, Mon/Tue 05:00–08:00',
    description: 'FIFO charter peak active: 5 flights, ~420 mining workers (NorthWest Alliance — Pilbara, Goldfields Air — Kalgoorlie). Boarding SLA tolerance: +10 min for FIFO charters. Reduced HVAC zone profile for T2 night ops. FIDS backup activated. Staff allocation efficiency gap: T2 currently at 68% (Red, below 70% threshold).',
    priority: 82, impact: 'Operational', confidence: 88,
    linkedAlerts: ['ALT-014', 'ALT-015'], zones: ['T2 FIFO Terminal', 'FIFO Charter Terminal'],
    benefit: 'Reduces avg FIFO delay from 26 min → 9 min | services ~420 mine workers on roster changeover', status: 'pending'
  },
  {
    id: 'SA-005',
    title: 'Activate 4 SmartGate kiosks + 2 ABF counters — T1 Immigration queue',
    description: 'CrowdSense AI: avg processing 8.4 min/pax (SLA amber >1.5× target of 5 min = 7.5 min). 4 kiosks offline (ABF maintenance). Queueing model: 2 additional ABF counters required (15-min advance notice sent). SmartGate languages: English, Mandarin, Japanese, Korean (matching SQ/MH/JL/OZ pax profile today). Little\'s Law: L=λW — current λ=48 pax/min, W=8.4 min, L=403 queue.',
    priority: 90, impact: 'Operational', confidence: 92,
    linkedAlerts: ['ALT-007'], zones: ['T1 Immigration (ABF)', 'T1 Security East'],
    benefit: 'Reduces wait from 8.4 min → 4.6 min | ~950 pax impacted | 95th pct SLA recovery', status: 'pending'
  },
];


export const kpiData = {

  // ─────────────────────────────────────────────────────────────
  // 1. PASSENGER FLOW & QUEUE MANAGEMENT
  // Thresholds per cartography:
  //   density: <1.5 green | 1.5–3.0 amber | 3.0–4.5 red | >4.5 critical
  //   congestion score: 0–30 green | 31–60 amber | 61–85 red | 86–100 critical
  //   wait time targets: <5 min security | <3 min check-in | <10 min immigration/ABF
  //   FIFO peak adjustment: Mon/Tue 05:00–08:00 thresholds +0.5 pax/m²
  //   MAPE targets: <12% for +30 min | <18% for +60 min
  // ─────────────────────────────────────────────────────────────
  passengerFlow: {
    density: 3.2,                    // pax/m² — above amber (1.5–3.0), approaching red (>3.0)
    densityUnit: 'pax/m²',
    densityThresholds: { green: 1.5, amber: 3.0, red: 4.5 }, // cartography thresholds
    flowRate: 112,                   // pax/min — below 60% of target at one lane (alert condition)
    flowRateUnit: 'pax/min',
    flowRateTarget: 25,              // ≥25 pax/min per boarding gate (cartography)
    avgWaitTime: 7.2,               // min — above amber (>1.5× target of 5 min = 7.5 min approaching)
    waitTimeUnit: 'min',
    waitTimeSLA: { security: 5, checkIn: 3, immigration: 10 }, // cartography SLA targets
    congestionScore: 68,             // RED zone (61–85 per cartography)
    congestionBands: { green: 30, amber: 60, red: 85 }, // 0–30 / 31–60 / 61–85 / 86–100
    predictedOccupancy30: 79,        // % — FIFO Mon/Tue morning surge active (1.8× multiplier)
    predictedOccupancy60: 86,        // % — school holiday mode (+1.4× multiplier), exceeds alert
    predictionMAPE30: 10.4,          // % — within target <12%
    predictionMAPE60: 15.8,          // % — within target <18%
    requiredLanes: 12,               // M/M/c model output — target utilisation 75–85% per lane
    staffingForecast: 51,            // agents — FIFO peak Mon/Tue multiplier 1.6× applied
    avoidedDelayMin: 340,            // min — post–Smart Action attribution (>5 min threshold)
    fifoPeakActive: true,            // Mon/Tue 05:00–08:00 flag
    seasonalMode: 'school_holiday',  // current adjustment: +1.4× baseline
    sparklineData: [38, 44, 48, 54, 60, 65, 68, 72, 70, 74, 71, 68]
  },

  // ─────────────────────────────────────────────────────────────
  // 2. RESOURCE SCHEDULING & GATE ASSIGNMENT
  // Thresholds per cartography:
  //   staff efficiency: ≥85% green | 70–85% amber | <70% red
  //   on-time boarding: ≥92% green | 85–92% amber | <85% red (within 5 min of schedule)
  //   on-time departure: ≥88% target (Perth Airport Master Plan 2030+) — IATA 15 min standard
  //   turnaround MAE target: <5 min
  //   FIFO charter tolerance: +10 min boarding SLA, faster turnaround profile
  //   Wide-body buffer: +10 min vs narrow-body
  //   Remote stand penalty: +8 min for bus transfer
  // ─────────────────────────────────────────────────────────────
  resourceScheduling: {
    staffEfficiency: 81,             // % — AMBER (70–85%) — cross-terminal gap T1↔T3/T4
    staffEfficiencyTarget: 85,       // cartography target
    onTimeBoardingRate: 89,          // % — AMBER (85–92%), within 5 min of scheduled boarding
    onTimeBoardingTarget: 92,        // cartography target
    onTimeDepartureRate: 86,         // % — AMBER (below 88% Perth Master Plan target)
    onTimeDepartureTarget: 88,       // Perth Airport Master Plan 2030+ target
    turnaroundForecast: 42,          // min — wide-body (A330 to Singapore) with +10 min buffer
    turnaroundUnit: 'min',
    turnaroundMAE: 4.2,              // min — within target <5 min
    gateReassignmentScore: 74,       // /100 — AMBER (>70 triggers warning per cartography)
    delayPropagation: 18,            // min — above alert threshold (>500 pax-delay-minutes)
    delayPropagationPaxMinutes: 720, // pax × delay-min — approaching critical (>2000 = critical)
    groundHandlers: ['Swissport', 'dnata', 'Menzies'], // Perth Airport active handlers
    sparklineData: [84, 86, 88, 85, 89, 87, 86, 90, 88, 87, 89, 86]
  },

  // ─────────────────────────────────────────────────────────────
  // 3. THREAT DETECTION & ABANDONED BAGGAGE
  // Thresholds per cartography:
  //   Static object >3 min sterile zone → Critical (AFP)
  //   Static object >5 min public zone → High alert
  //   Threat score >0.7 → immediate perimeter clearance
  //   False alarm target: <10/shift (security), <20/shift (forgotten items)
  //   Suspicious behavior loitering >10 min, anomaly score >0.85
  //   Intrusion response SLA: <3 min acknowledge, <10 min resolve
  //   Privacy: Australian Privacy Act 1988 — NO facial recognition
  //   Compliance: Aviation Transport Security Act 2004
  // ─────────────────────────────────────────────────────────────
  baggageThreat: {
    bagsAtRisk: 1.8,                 // % — above green, below 2% amber trigger
    falsePositiveRate: 8.2,          // % — within target <10 per shift
    intrusionsDetected: 1,           // ASIC-zone breach, AFP notification sent
    suspiciousBehavior: 2,           // loitering >10 min detected (anomaly score 0.87)
    threatRiskScore: 34,             // /100 — MODERATE (26–50) → increased awareness
    threatRiskBands: { low: 25, moderate: 50, high: 75 }, // cartography bands
    resolutionTimeForecast: 8,       // min — within SLA (<10 min for intrusion)
    resolutionUnit: 'min',
    resolutionSLA: { sterile: 5, public: 8, intrusion: 10, suspicious: 20 }, // cartography SLAs
    abandonedBagCount: 3,            // active detections — 2 'forgotten', 1 under security review
    afpNotifications: 1,             // mandatory for sterile zone detections
    privacyFramework: 'Australian Privacy Act 1988 — no facial recognition / biometric storage',
    complianceAct: 'Aviation Transport Security Act 2004',
    sparklineData: [2.2, 1.8, 2.4, 1.6, 2.0, 1.8, 2.2, 1.8, 1.6, 2.0, 1.9, 1.8]
  },

  // ─────────────────────────────────────────────────────────────
  // 4. SUSTAINABILITY & ENERGY OPTIMIZATION
  // Perth-specific per cartography:
  //   WA SWIS grid emission factor: ~0.69 kgCO2/kWh (update annually)
  //   Net Zero 2050 target, interim -46% by 2030 (Paris alignment)
  //   Contractual demand limit — Amber >80%, Red >90%, Critical >95%
  //   HVAC max 55% of terminal consumption (Perth summer 35–42°C)
  //   Summer mode (Nov–Mar): +25% above mild-season baseline is normal
  //   Peak demand hours: 13:00–17:00 (high solar + high cooling load)
  //   Synergy TOU tariff: shift loads away from 14:00–20:00 workdays
  //   FIFO night ops T2: reduced HVAC zones only
  //   Energy intensity target: <250 kWh/m²/year (ACI Level 3)
  //   Power factor: >0.95 mandatory
  //   Pre-cool activation: 20 min before predicted peak
  // ─────────────────────────────────────────────────────────────
  sustainability: {
    carbonFootprint: 58.6,           // tCO2e/day — Scope 1+2, WA SWIS 0.69 kgCO2/kWh factor
    carbonUnit: 'tCO₂e / day',
    carbonTarget2030: '-46% by 2030 (Paris alignment)',
    carbonTarget2050: 'Net Zero 2050',
    gridEmissionFactor: 0.69,        // kgCO2/kWh — WA SWIS (update annually per NGER)
    energyPerTerminal: {
      'T1 Intl': 3.1,               // MW — summer HVAC load (Perth max 42°C)
      'T2 FIFO': 0.6,               // MW — FIFO night ops, reduced HVAC zones
      'T3 Qantas': 1.8,             // MW
      'T4 Qantas': 1.2,             // MW
    },
    energyUnit: 'MW',
    hvacSharePct: 52,               // % of total — below 55% HVAC cap (cartography)
    powerDemand: 6.7,               // MW — current live draw
    contractualLimit: 9.0,          // MW — Western Power network agreement
    powerDemandPct: 74,             // % of contractual limit — below Amber threshold (80%)
    powerFactor: 0.97,              // must be >0.95 per cartography
    solarGeneration: 0.8,           // MW — on-site PV offset
    energyPeak30: 8.1,              // MW — predicted peak +30 min (>80% limit = Amber → pre-start standby gen)
    energyPeak60: 8.6,              // MW — >85% triggers demand response 15 min before
    energyForecastMAPE30: 6.8,      // % — within target <8%
    energyForecastMAPE60: 10.4,     // % — within target <12%
    overconsumptionRisk: 22,        // % probability — below Amber threshold (>30%)
    costSavings: 14.2,              // % vs no-AI baseline — above target ≥12%
    synergyPeakWindow: '14:00–20:00', // TOU tariff shift window
    preCoolLeadTime: 20,            // min before predicted peak (cartography)
    summerMode: true,               // Nov–Mar: +25% baseline accepted as normal
    complianceFramework: 'NGER / TCFD / CDP / ACI Level 3',
    sparklineData: [6.0, 6.2, 5.8, 6.4, 6.1, 6.5, 6.3, 6.7, 6.5, 6.9, 6.6, 6.7]
  },

  // ─────────────────────────────────────────────────────────────
  // 5. CUSTOMER EXPERIENCE & RETAIL
  // Perth-specific per cartography:
  //   Chatbot P90 <2 sec, P99 <5 sec | Languages: EN, 普通话, 日本語, Bahasa, हिन्दी, 한국어
  //   Resolution rate target: ≥85% | Amber 75–85% | Red <75%
  //   Retail conversion target: ≥8% (airport retail benchmark)
  //   DAU/MAU ratio target: >25% | Feature engagement: chatbot >30%
  //   Revenue uplift target: ≥15% vs baseline (A/B test, p<0.05)
  //   Retail footfall — T1 duty-free tracks international pax separately (higher spend)
  //   FIFO travellers: pre-load regional WA/mining town FAQ cache
  //   AFL matches (Optus Stadium): +15–25% pax on game days
  //   School holidays: +30–40% leisure traffic
  //   Christmas/Easter: +50–60% peak (planning T-60 days)
  //   Privacy: Australian Privacy Act 1988 — explicit opt-in for analytics
  //   Ad CTR target: >1.5% interactive, >0.5% passive+QR | Revenue model: CPM + CPC
  // ─────────────────────────────────────────────────────────────
  customerExperience: {
    chatbotResponseTime: 1.6,       // sec — P90 (target <2 sec per cartography)
    chatbotP99: 3.8,                // sec — P99 within target <5 sec
    chatbotUnit: 'sec (P90)',
    chatbotLanguages: ['English', 'Mandarin', 'Japanese', 'Bahasa', 'Hindi', 'Korean'],
    fifoCacheActive: true,          // regional WA/mining town FAQ cache pre-loaded
    resolutionRate: 88,             // % — GREEN (≥85% target)
    resolutionRateTarget: 85,       // cartography target
    engagementRate: 31,             // % — just above chatbot engagement target (>30%)
    dauMauRatio: 27,                // % — above target >25%
    retailFootfall: {
      'T1 Duty Free (Intl)': 3240,  // visitors/hr — international pax, higher spend profile
      'T1 Domestic Retail': 1820,   // visitors/hr
      'T2 FIFO Retail': 640,        // visitors/hr — FIFO workers, Mon/Tue AM peak
      'T3/T4 Retail': 2180,         // visitors/hr
    },
    retailConversionRate: 9.2,      // % — above ≥8% benchmark (cartography)
    retailDwellTarget: 5,           // min = 'interested' visitor threshold (cartography)
    adPerformance: 12.4,            // K impressions/hr
    adCTRInteractive: 1.8,          // % — above >1.5% target (interactive screens)
    adCTRPassive: 0.6,              // % — above >0.5% target (passive + QR)
    adUnit: 'K impressions/hr',
    adFillRate: 94,                 // % — above >90% fill rate target
    retailForecast: '+34%',         // AFL game day at Optus Stadium (+15–25% pax surge)
    eventDemand: 'AFL Season (Mar–Sep) + FIFO Roster Peak',
    eventDemandMultiplier: 1.22,    // AFL game day factor
    conversionProbability: 32,      // % — above >5% top-ranked recommendation target
    revenueUplift: 16.4,           // % — above ≥15% target (A/B p<0.05)
    revenueUpliftTarget: 15,        // cartography target
    privacyCompliance: 'Australian Privacy Act 1988 — explicit opt-in, no PII in ad targeting',
    sparklineData: [62, 66, 64, 70, 68, 74, 71, 78, 75, 79, 76, 78]
  },

  // ─────────────────────────────────────────────────────────────
  // EXECUTIVE VIEW
  // Perth context: ~15M pax/year, 4th busiest in Australia
  // Master Plan 2030+: new terminal, 3rd runway, $5B investment
  // ─────────────────────────────────────────────────────────────
  executive: {
    healthScore: 81,
    riskIndex: 34,
    revenuePerformance: '+8.2% AUD',  // AUD, GST-exclusive per cartography
    sustainabilityScore: 74,           // Net Zero 2050 progress tracker
    carbonProgress2030: 28,            // % toward -46% by 2030 target
    activeAlerts: { critical: 2, high: 4, medium: 3, low: 2 },
    predictedStressIndex: 64,          // AFL season + FIFO peak combination
    decisionLog: [
      { time: '08:42', decision: 'Activated FIFO surge plan — T2 early-morning 1.8× multiplier applied', by: 'Ops Director' },
      { time: '07:55', decision: 'Pre-cooling T1 International initiated — predicted peak 08:20 (Perth summer 39°C)', by: 'Facilities Manager' },
      { time: '07:12', decision: 'Gate reassignment approved — SQ226 moved to Gate 52 (18-min overlap resolved)', by: 'APOC Duty Manager' },
      { time: '06:30', decision: 'AFP notified — sterile zone detection T1 restricted area (Protocol Amber)', by: 'SOC Supervisor' },
    ]
  }
};

export const zones = [
  // ── Terminals ──
  { id: 't1-international', name: 'Terminal 1 International', type: 'terminal', status: 'operational', pax: 4200, capacity: 6000 },
  { id: 't1-domestic',      name: 'Terminal 1 Domestic (Virgin)', type: 'terminal', status: 'operational', pax: 3100, capacity: 4500 },  { id: 't2-regional',      name: 'Terminal 2 (Regional)', type: 'terminal', status: 'operational', pax: 1800, capacity: 3000 },
  { id: 't3-qantas',        name: 'Terminal 3 (Qantas)', type: 'terminal', status: 'operational', pax: 3400, capacity: 5000 },
  { id: 't4-qantas',        name: 'Terminal 4 (Qantas Domestic)', type: 'terminal', status: 'warning', pax: 2800, capacity: 3500 },

  // ── Piers / Gates ──
  { id: 't1-pier',          name: 'T1 Gates 50–56', type: 'zone', status: 'operational', gates: 7, occupied: 5 },
  { id: 't2-pier',          name: 'T2 Gates 1–7', type: 'zone', status: 'operational', gates: 7, occupied: 4 },
  { id: 't3-pier-north',    name: 'T3 Gates 16–17C', type: 'zone', status: 'operational', gates: 4, occupied: 3 },
  { id: 't3-pier-south',    name: 'T3 Gates 18–35', type: 'zone', status: 'warning', gates: 10, occupied: 9 },
  { id: 't4-pier',          name: 'T4 Gates 7–15', type: 'zone', status: 'operational', gates: 9, occupied: 6 },

  // ── Security ──
  { id: 'security-east',    name: 'Security East (T1/T2)', type: 'zone', status: 'critical', throughput: '118 pax/min' },
  { id: 'security-west',    name: 'Security West (T3/T4)', type: 'zone', status: 'warning', throughput: '96 pax/min' },

  // ── Runways ──
  { id: 'runway-main',      name: 'Runway 03/21 (3,444m)', type: 'runway', status: 'operational' },
  { id: 'runway-cross',     name: 'Runway 06/24 (2,163m)', type: 'runway', status: 'operational' },
  { id: 'runway-new',       name: 'Runway 03R/21L – Under Construction', type: 'runway', status: 'construction' },

  // ── Aprons ──
  { id: 'apron-east',       name: 'East Apron (T1)', type: 'zone', status: 'operational' },
  { id: 'apron-t2',         name: 'East Apron (T2)', type: 'zone', status: 'operational' },
  { id: 'apron-west',       name: 'West Apron (T3/T4)', type: 'zone', status: 'operational' },

  // ── Infrastructure ──
  { id: 'control-tower',    name: 'ATC Control Tower', type: 'zone', status: 'operational' },
  { id: 'airport-central',  name: 'Airport Central Station', type: 'zone', status: 'operational', throughput: '1,200 pax/hr' },
  { id: 'redcliffe-station',name: 'Redcliffe Train Station', type: 'zone', status: 'operational' },
  { id: 'skybridge-station',name: 'Airport Central Skybridge', type: 'zone', status: 'operational' },
  { id: 't1-t2-walkway',    name: 'T1–T2 Covered Walkway', type: 'zone', status: 'operational' },
  { id: 't3-t4-connector',  name: 'T3–T4 Connector', type: 'zone', status: 'operational' },

  // ── Lounges ──
  { id: 'qantas-club',      name: 'Qantas Club Lounge', type: 'zone', status: 'warning', throughput: '320 guests' },
  { id: 'qantas-business',  name: 'Qantas Business Lounge', type: 'zone', status: 'operational', throughput: '180 guests' },
  { id: 'virgin-lounge',    name: 'Virgin Australia Lounge', type: 'zone', status: 'operational', throughput: '280 guests' },
  { id: 'aspire-lounge',    name: 'Plaza Premium Lounge', type: 'zone', status: 'operational', throughput: '220 guests' },
  { id: 'alliance-lounge',  name: 'Alliance Lounge (T2)', type: 'zone', status: 'operational', throughput: '140 guests' },

  // ── Transport & Parking ──
  { id: 'transport-east',   name: 'Transport Hub East', type: 'zone', status: 'operational', throughput: '1,600 vehicles/hr' },
  { id: 'transport-west',   name: 'Transport Hub West', type: 'zone', status: 'operational', throughput: '1,200 vehicles/hr' },
  { id: 'car-rental',       name: 'Car Rental', type: 'zone', status: 'operational' },
  { id: 'parking-east-p1',  name: 'Parking P1 (Short Stay)', type: 'zone', status: 'operational' },
  { id: 'parking-east-p2',  name: 'Parking P2 (Long Stay)', type: 'zone', status: 'operational' },
  { id: 'parking-east-p3',  name: 'Parking P3 (Value)', type: 'zone', status: 'operational' },
  { id: 'parking-west-p1',  name: 'Parking P4 (Short Stay)', type: 'zone', status: 'operational' },
  { id: 'parking-west-p2',  name: 'Parking P5 (Long Stay)', type: 'zone', status: 'operational' },

  // ── Support Facilities ──
  { id: 'cargo-area',       name: 'Freight & Cargo', type: 'zone', status: 'operational', throughput: '32 containers/hr' },
  { id: 'fifo-terminal',    name: 'FIFO Charter Terminal', type: 'zone', status: 'warning', throughput: '450 workers/hr' },
  { id: 'maintenance',      name: 'Aircraft Maintenance Hangar', type: 'zone', status: 'operational', throughput: '4 aircraft/day' },
  { id: 'fuel-farm',        name: 'Fuel Farm', type: 'zone', status: 'operational', throughput: '120K liters/day' },
  { id: 'ga-terminal',      name: 'General Aviation Terminal', type: 'zone', status: 'operational' },
  { id: 'viewing-platform', name: 'Outdoor Viewing Platform', type: 'zone', status: 'operational', throughput: '600 visitors/hr' },

  // ── Drop-off / Pick-up ──
  { id: 't1-pickup',        name: 'T1 Drop-off & Pick-up', type: 'zone', status: 'operational' },
  { id: 't2-pickup',        name: 'T2 Drop-off & Pick-up', type: 'zone', status: 'operational' },
  { id: 't3-pickup',        name: 'T3/T4 Drop-off & Pick-up', type: 'zone', status: 'operational' },
];

export const timelineData = {
  labels: ['Now', '+10m', '+20m', '+30m', '+40m', '+50m', '+60m'],
  // Congestion: FIFO Mon/Tue surge with 1.8× multiplier — approaching red (61–85)
  congestion: [68, 72, 76, 79, 77, 74, 70],
  // Energy: approaching Red threshold (>80% of 9.0 MW contractual limit = 7.2 MW)
  energy: [6.7, 7.2, 7.8, 8.1, 7.9, 7.6, 7.2],
  // Risk: AFL + FIFO combination, moderate-high
  risk: [34, 38, 42, 46, 44, 40, 36]
};

// ============================================
// Zone-Specific KPI Data
// ============================================
export const zoneKpis = {
  // density bands: <1.5 green | 1.5–3.0 amber | 3.0–4.5 red | >4.5 critical
  // congestion bands: 0–30 green | 31–60 amber | 61–85 red | 86–100 critical
  // wait SLA: <5 min security | <3 min check-in | <10 min immigration/ABF

  't1-international': {
    congestion: { score: 68, density: '3.2 pax/m² (RED >3.0)', trend: [50, 55, 58, 62, 66, 68, 68], label: 'Crowd Density' },
    energy: { consumption: '3.1 MW', peak: '3.4 MW', efficiency: 82, trend: [2.6, 2.8, 2.9, 3.0, 3.1, 3.2, 3.1] },
    satisfaction: { score: 86, avgWait: '7.2 min (AMBER >5 min SLA)', complaints: 8 },
    security: { threatLevel: 'Elevated', incidents: 1, cameras: 186, uptime: 99.7 },
    revenue: { daily: 'AUD 1.08M', retail: 'AUD 340K', fAndB: 'AUD 190K', dutyfree: 'AUD 550K' },
    flights: { departures: 44, arrivals: 40, delayed: 6, onTime: 88 },
    activeAlerts: 4,
    trend: [52, 56, 60, 64, 68, 68, 68]
  },
  't1-domestic': {
    congestion: { score: 52, density: '2.4 pax/m² (AMBER 1.5–3.0)', trend: [42, 46, 48, 50, 52, 52, 52], label: 'Crowd Density' },
    energy: { consumption: '1.6 MW', peak: '2.0 MW', efficiency: 88, trend: [1.4, 1.5, 1.6, 1.7, 1.6, 1.7, 1.6] },
    satisfaction: { score: 91, avgWait: '4.2 min (GREEN <5 min)', complaints: 2 },
    security: { threatLevel: 'Low', incidents: 0, cameras: 124, uptime: 99.8 },
    revenue: { daily: 'AUD 520K', retail: 'AUD 160K', fAndB: 'AUD 130K', dutyfree: 'AUD 230K' },
    flights: { departures: 38, arrivals: 36, delayed: 3, onTime: 92 },
    activeAlerts: 1,
    trend: [40, 44, 46, 50, 52, 52, 52]
  },
  't2-regional': {
    congestion: { score: 62, density: '2.8 pax/m² (FIFO peak adj. threshold 3.5)', trend: [34, 42, 52, 58, 62, 60, 58], label: 'FIFO Peak Density' },
    energy: { consumption: '0.6 MW', peak: '0.9 MW', efficiency: 92, trend: [0.5, 0.5, 0.6, 0.7, 0.6, 0.7, 0.6] },
    satisfaction: { score: 84, avgWait: '6.4 min (FIFO SLA +10 min tolerance)', complaints: 4 },
    security: { threatLevel: 'Medium', incidents: 1, cameras: 68, uptime: 99.6 },
    flights: { departures: 12, arrivals: 8, delayed: 2, onTime: 90 },
    activeAlerts: 3,
    trend: [28, 36, 46, 56, 62, 60, 58]
  },
  't3-qantas': {
    congestion: { score: 58, density: '2.6 pax/m² (AMBER 1.5–3.0)', trend: [46, 50, 54, 56, 58, 58, 56], label: 'Crowd Density' },
    energy: { consumption: '1.8 MW', peak: '2.2 MW', efficiency: 86, trend: [1.4, 1.5, 1.7, 1.8, 1.8, 2.0, 1.8] },
    satisfaction: { score: 89, avgWait: '4.8 min (GREEN <5 min)', complaints: 3 },
    security: { threatLevel: 'Low', incidents: 0, cameras: 112, uptime: 99.8 },
    revenue: { daily: 'AUD 680K', retail: 'AUD 200K', fAndB: 'AUD 155K', dutyfree: 'AUD 325K' },
    flights: { departures: 34, arrivals: 32, delayed: 4, onTime: 88 },
    activeAlerts: 2,
    trend: [44, 48, 52, 56, 58, 58, 56]
  },
  't4-qantas': {
    congestion: { score: 72, density: '3.4 pax/m² (RED >3.0)', trend: [58, 62, 66, 70, 72, 72, 70], label: 'Crowd Density' },
    energy: { consumption: '1.2 MW', peak: '1.6 MW', efficiency: 78, trend: [0.9, 1.0, 1.1, 1.2, 1.2, 1.3, 1.2] },
    satisfaction: { score: 82, avgWait: '6.8 min (AMBER >5 min SLA)', complaints: 6 },
    security: { threatLevel: 'Low', incidents: 0, cameras: 86, uptime: 97.4 },
    flights: { departures: 26, arrivals: 24, delayed: 5, onTime: 84 },
    activeAlerts: 3,
    trend: [56, 60, 64, 68, 72, 72, 70]
  },
  'security-east': {
    congestion: { score: 85, density: '4.2 pax/m² (near CRITICAL >4.5)', trend: [72, 76, 80, 84, 86, 85, 85], label: 'Queue Density' },
    energy: { consumption: '0.3 MW', peak: '0.4 MW', efficiency: 92 },
    satisfaction: { score: 68, avgWait: '7.2 min (SLA <5 min | 95th pct <15 min)', complaints: 18 },
    security: { threatLevel: 'Elevated', incidents: 1, cameras: 56, uptime: 99.5 },
    activeAlerts: 4,
    trend: [70, 74, 78, 82, 85, 85, 85]
  },
  'security-west': {
    congestion: { score: 60, density: '3.0 pax/m² (AMBER/RED boundary)', trend: [48, 52, 56, 58, 60, 60, 58], label: 'Queue Density' },
    energy: { consumption: '0.3 MW', peak: '0.4 MW', efficiency: 91 },
    satisfaction: { score: 76, avgWait: '5.8 min (AMBER >5 min SLA)', complaints: 7 },
    security: { threatLevel: 'Low', incidents: 0, cameras: 48, uptime: 99.7 },
    activeAlerts: 1,
    trend: [46, 50, 54, 56, 60, 60, 58]
  },
  'airport-central': {
    congestion: { score: 45, density: '1,340 pax/hr (74% of 1,800 max)', trend: [36, 40, 42, 44, 46, 44, 42], label: 'Station Flow' },
    energy: { consumption: '0.4 MW', peak: '0.5 MW', efficiency: 90 },
    satisfaction: { score: 88, avgWait: '12 min (Airport Line, 20-min frequency off-peak)', complaints: 2 },
    throughput: { current: 1340, max: 1800, unit: 'pax/hr' },
    activeAlerts: 0,
    trend: [34, 38, 40, 44, 46, 44, 42]
  },
  'cargo-area': {
    congestion: { score: 52, density: '16 containers (ABF secondary inspection active)', trend: [32, 36, 40, 44, 52, 50, 48], label: 'Load Factor' },
    energy: { consumption: '0.8 MW', peak: '1.0 MW', efficiency: 82 },
    security: { threatLevel: 'High', incidents: 1, cameras: 64, uptime: 99.8 },
    throughput: { current: 28, max: 48, unit: 'containers/hr' },
    activeAlerts: 2,
    trend: [30, 34, 36, 40, 52, 50, 48]
  },
  'fifo-terminal': {
    congestion: { score: 74, density: '3.1 pax/m² (FIFO Mon/Tue 1.8× surge)', trend: [44, 52, 60, 68, 74, 72, 68], label: 'FIFO Traffic' },
    energy: { consumption: '0.5 MW', peak: '0.7 MW', efficiency: 88 },
    satisfaction: { score: 74, avgWait: '26 min delay (FIFO SLA +10 min tolerance)', complaints: 12 },
    flights: { departures: 5, arrivals: 3, delayed: 3, onTime: 60 },
    activeAlerts: 3,
    trend: [42, 50, 58, 66, 74, 72, 68]
  },
  'transport-east': {
    congestion: { score: 68, density: '14 min taxi wait (target <10 min)', trend: [44, 50, 56, 62, 68, 66, 64], label: 'Kerb Load' },
    energy: { consumption: '0.3 MW', peak: '0.4 MW', efficiency: 88 },
    satisfaction: { score: 72, avgWait: '14 min (taxi — AMBER >10 min)', complaints: 8 },
    throughput: { current: 1340, max: 2200, unit: 'vehicles/hr' },
    activeAlerts: 1,
    trend: [42, 48, 54, 60, 68, 66, 64]
  },
  'transport-west': {
    congestion: { score: 42, density: '800 vehicles', trend: [34, 38, 40, 42, 44, 42, 40], label: 'Traffic Load' },
    energy: { consumption: '0.2 MW', peak: '0.3 MW', efficiency: 90 },
    satisfaction: { score: 86, avgWait: '5.2 min', complaints: 2 },
    throughput: { current: 1200, max: 1800, unit: 'vehicles/hr' },
    activeAlerts: 0,
    trend: [32, 36, 38, 42, 44, 42, 40]
  },

  // ── Piers / Gates ──
  't1-pier': {
    congestion: { score: 60, density: '5 / 7 gates', label: 'Gate Utilisation' },
    security: { threatLevel: 'Low', incidents: 0, cameras: 28, uptime: 99.9 },
    flights: { departures: 7, arrivals: 5, delayed: 1, onTime: 93 },
    gates: 7, occupied: 5,
    activeAlerts: 0,
    trend: [48, 54, 58, 62, 60, 64, 60]
  },
  't2-pier': {
    congestion: { score: 45, density: '4 / 7 gates', label: 'Gate Utilisation' },
    security: { threatLevel: 'Low', incidents: 0, cameras: 18, uptime: 99.9 },
    flights: { departures: 4, arrivals: 4, delayed: 0, onTime: 100 },
    gates: 7, occupied: 4,
    activeAlerts: 0,
    trend: [36, 40, 42, 44, 46, 44, 45]
  },
  't3-pier-north': {
    congestion: { score: 72, density: '3 / 4 gates', label: 'Gate Utilisation' },
    security: { threatLevel: 'Low', incidents: 0, cameras: 14, uptime: 99.8 },
    flights: { departures: 3, arrivals: 3, delayed: 1, onTime: 88 },
    gates: 4, occupied: 3,
    activeAlerts: 1,
    trend: [56, 60, 64, 68, 72, 70, 72]
  },
  't3-pier-south': {
    congestion: { score: 88, density: '9 / 10 gates', label: 'Gate Utilisation' },
    security: { threatLevel: 'Medium', incidents: 0, cameras: 32, uptime: 99.7 },
    flights: { departures: 9, arrivals: 8, delayed: 2, onTime: 88 },
    gates: 10, occupied: 9,
    activeAlerts: 2,
    trend: [72, 76, 80, 84, 88, 86, 88]
  },
  't4-pier': {
    congestion: { score: 65, density: '6 / 9 gates', label: 'Gate Utilisation' },
    security: { threatLevel: 'Low', incidents: 0, cameras: 22, uptime: 99.8 },
    flights: { departures: 6, arrivals: 5, delayed: 1, onTime: 91 },
    gates: 9, occupied: 6,
    activeAlerts: 1,
    trend: [50, 54, 58, 62, 64, 62, 65]
  },

  // ── Runways ──
  'runway-main': {
    congestion: { score: 72, density: '28 movements/hr', label: 'Movement Rate' },
    security: { threatLevel: 'Low', incidents: 0, cameras: 42, uptime: 99.9 },
    activeAlerts: 0,
    trend: [58, 62, 66, 70, 74, 72, 72]
  },
  'runway-cross': {
    congestion: { score: 38, density: '12 movements/hr', label: 'Movement Rate' },
    security: { threatLevel: 'Low', incidents: 0, cameras: 28, uptime: 99.9 },
    activeAlerts: 0,
    trend: [30, 34, 36, 38, 40, 38, 38]
  },
  'runway-new': {
    congestion: { score: 0, density: 'Under construction – 2029', label: 'Status' },
    activeAlerts: 0,
    trend: [0, 0, 0, 0, 0, 0, 0]
  },

  // ── Taxiways ──
  // ── Aprons ──
  'apron-east': {
    congestion: { score: 70, density: '8 aircraft parked', label: 'Stand Occupancy' },
    activeAlerts: 0,
    trend: [56, 60, 64, 68, 72, 70, 70]
  },
  'apron-t2': {
    congestion: { score: 55, density: '6 aircraft parked', label: 'Stand Occupancy' },
    activeAlerts: 0,
    trend: [42, 46, 50, 54, 56, 54, 55]
  },
  'apron-west': {
    congestion: { score: 80, density: '11 aircraft parked', label: 'Stand Occupancy' },
    activeAlerts: 1,
    trend: [64, 68, 72, 76, 80, 78, 80]
  },

  // ── Infrastructure ──
  'control-tower': {
    congestion: { score: 62, density: '28 active flights', label: 'ATC Workload' },
    security: { threatLevel: 'Low', incidents: 0, cameras: 8, uptime: 100 },
    activeAlerts: 0,
    trend: [50, 54, 58, 62, 64, 62, 62]
  },
  'skybridge-station': {
    congestion: { score: 38, density: '480 pax/hr', label: 'Footfall' },
    activeAlerts: 0,
    trend: [28, 32, 34, 38, 40, 38, 38]
  },
  't1-t2-walkway': {
    congestion: { score: 44, density: '360 pax/hr', label: 'Footfall' },
    activeAlerts: 0,
    trend: [32, 36, 38, 42, 44, 42, 44]
  },
  't3-t4-connector': {
    congestion: { score: 50, density: '420 pax/hr', label: 'Footfall' },
    activeAlerts: 0,
    trend: [38, 42, 44, 48, 52, 50, 50]
  },

  // ── Lounges ──
  'qantas-club': {
    congestion: { score: 91, density: '291 / 320 guests', label: 'Occupancy' },
    satisfaction: { score: 88, avgWait: '2.1 min', complaints: 2 },
    energy: { consumption: '0.18 MW', peak: '0.22 MW', efficiency: 88 },
    activeAlerts: 1,
    trend: [74, 78, 82, 86, 90, 90, 91]
  },
  'qantas-business': {
    congestion: { score: 62, density: '112 / 180 guests', label: 'Occupancy' },
    satisfaction: { score: 96, avgWait: '1.2 min', complaints: 0 },
    energy: { consumption: '0.14 MW', peak: '0.18 MW', efficiency: 92 },
    activeAlerts: 0,
    trend: [48, 52, 56, 58, 62, 60, 62]
  },
  'virgin-lounge': {
    congestion: { score: 55, density: '154 / 280 guests', label: 'Occupancy' },
    satisfaction: { score: 91, avgWait: '1.8 min', complaints: 1 },
    energy: { consumption: '0.12 MW', peak: '0.16 MW', efficiency: 90 },
    activeAlerts: 0,
    trend: [40, 44, 48, 52, 56, 54, 55]
  },
  'aspire-lounge': {
    congestion: { score: 48, density: '106 / 220 guests', label: 'Occupancy' },
    satisfaction: { score: 93, avgWait: '1.4 min', complaints: 0 },
    energy: { consumption: '0.10 MW', peak: '0.14 MW', efficiency: 91 },
    activeAlerts: 0,
    trend: [36, 40, 42, 46, 48, 46, 48]
  },
  'alliance-lounge': {
    congestion: { score: 35, density: '49 / 140 guests', label: 'Occupancy' },
    satisfaction: { score: 89, avgWait: '1.0 min', complaints: 0 },
    energy: { consumption: '0.08 MW', peak: '0.10 MW', efficiency: 93 },
    activeAlerts: 0,
    trend: [26, 28, 30, 32, 36, 34, 35]
  },

  // ── Parking ──
  'parking-east-p1': {
    congestion: { score: 82, density: '328 / 400 bays', label: 'Occupancy' },
    activeAlerts: 0,
    trend: [66, 70, 74, 78, 82, 80, 82]
  },
  'parking-east-p2': {
    congestion: { score: 68, density: '612 / 900 bays', label: 'Occupancy' },
    activeAlerts: 0,
    trend: [52, 56, 60, 64, 68, 66, 68]
  },
  'parking-east-p3': {
    congestion: { score: 55, density: '440 / 800 bays', label: 'Occupancy' },
    activeAlerts: 0,
    trend: [42, 46, 48, 52, 56, 54, 55]
  },
  'parking-west-p1': {
    congestion: { score: 74, density: '296 / 400 bays', label: 'Occupancy' },
    activeAlerts: 0,
    trend: [58, 62, 66, 70, 74, 72, 74]
  },
  'parking-west-p2': {
    congestion: { score: 45, density: '270 / 600 bays', label: 'Occupancy' },
    activeAlerts: 0,
    trend: [34, 38, 40, 42, 46, 44, 45]
  },

  // ── Drop-off / Pick-up ──
  't1-pickup': {
    congestion: { score: 65, density: '22 vehicles queued', label: 'Kerb Load' },
    satisfaction: { score: 80, avgWait: '6.2 min', complaints: 5 },
    activeAlerts: 0,
    trend: [50, 54, 58, 62, 66, 64, 65]
  },
  't2-pickup': {
    congestion: { score: 42, density: '12 vehicles queued', label: 'Kerb Load' },
    satisfaction: { score: 88, avgWait: '3.8 min', complaints: 1 },
    activeAlerts: 0,
    trend: [32, 36, 38, 40, 44, 42, 42]
  },
  't3-pickup': {
    congestion: { score: 58, density: '18 vehicles queued', label: 'Kerb Load' },
    satisfaction: { score: 82, avgWait: '5.4 min', complaints: 3 },
    activeAlerts: 0,
    trend: [44, 48, 52, 54, 58, 56, 58]
  },

  // ── Support ──
  'car-rental': {
    congestion: { score: 38, density: '8 customers waiting', label: 'Queue' },
    satisfaction: { score: 85, avgWait: '4.2 min', complaints: 1 },
    activeAlerts: 0,
    trend: [28, 30, 34, 36, 40, 38, 38]
  },
  'ga-terminal': {
    congestion: { score: 22, density: '4 aircraft movements', label: 'Activity' },
    security: { threatLevel: 'Low', incidents: 0, cameras: 12, uptime: 99.9 },
    activeAlerts: 0,
    trend: [16, 18, 20, 22, 24, 22, 22]
  },
  'viewing-platform': {
    congestion: { score: 48, density: '288 / 600 visitors', label: 'Occupancy' },
    satisfaction: { score: 94, avgWait: '0 min', complaints: 0 },
    activeAlerts: 0,
    trend: [36, 40, 42, 46, 50, 48, 48]
  },
};
