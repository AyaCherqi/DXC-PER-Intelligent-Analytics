// ============================================
// Perth Airport – Per-Terminal KPI Data
// All 36 KPIs across 5 domains, per terminal
// ============================================

export const terminalKpiData = {

  // ══════════════════════════════════════════════════════════════
  // T1 INTERNATIONAL
  // ══════════════════════════════════════════════════════════════
  't1-international': {
    passengerFlow: {
      operational: {
        density: { value: 3.2, unit: 'pax/m²', status: 'red', thresholds: { green: 1.5, amber: 3.0, red: 4.5 }, sparkline: [2.4, 2.6, 2.8, 3.0, 3.1, 3.2, 3.2] },
        flowRate: { value: 112, unit: 'pax/min', target: 25, status: 'good', sparkline: [98, 102, 108, 110, 112, 114, 112] },
        avgWaitTime: { value: 7.2, unit: 'min', slaSecurity: 5, slaCheckIn: 3, slaImmigration: 10, status: 'warning', sparkline: [5.8, 6.2, 6.6, 7.0, 7.2, 7.4, 7.2] },
        congestionScore: { value: 68, bands: { green: 30, amber: 60, red: 85 }, status: 'red', sparkline: [50, 55, 58, 62, 66, 68, 68] },
      },
      predictive: {
        predictedOccupancy30: { value: 79, unit: '%', status: 'warning', confidence: '80% CI' },
        predictedOccupancy60: { value: 86, unit: '%', status: 'critical', confidence: '70% CI' },
        requiredLanes: { value: 12, current: 9, model: 'M/M/c', targetUtil: '75-85%' },
        staffingForecast: { value: 51, unit: 'agents', multiplier: '1.6x FIFO', status: 'warning' },
        avoidedDelayMin: { value: 340, unit: 'min', threshold: 5 },
      }
    },
    resourceScheduling: {
      operational: {
        staffEfficiency: { value: 78, unit: '%', target: 85, status: 'warning', sparkline: [80, 82, 79, 78, 76, 78, 78] },
        onTimeBoardingRate: { value: 88, unit: '%', target: 92, status: 'warning', sparkline: [90, 89, 88, 87, 88, 89, 88] },
        onTimeDepartureRate: { value: 86, unit: '%', target: 88, status: 'warning', sparkline: [88, 87, 86, 85, 86, 87, 86] },
      },
      predictive: {
        turnaroundForecast: { value: 48, unit: 'min', mae: 4.8, wideBodyBuffer: '+10 min', status: 'warning' },
        gateReassignmentScore: { value: 74, unit: '/100', status: 'warning' },
        delayPropagation: { value: 720, unit: 'pax-delay-min', threshold: 500, status: 'critical' },
      }
    },
    baggageThreat: {
      operational: {
        bagsAtRisk: { value: 1.8, unit: '%', status: 'warning', sparkline: [2.2, 1.8, 2.4, 1.6, 2.0, 1.8, 1.8] },
        intrusionsDetected: { value: 1, status: 'critical' },
        suspiciousBehavior: { value: 2, anomalyScore: 0.87, status: 'warning' },
      },
      predictive: {
        threatRiskScore: { value: 42, bands: { low: 25, moderate: 50, high: 75 }, status: 'warning' },
        avgResolutionTime: { value: 8, unit: 'min', slaSterile: 5, slaPublic: 8, status: 'warning' },
      }
    },
    sustainability: {
      operational: {
        carbonFootprint: { value: 22.4, unit: 'tCO₂e/day', gridFactor: 0.69, status: 'warning' },
        energyConsumption: { value: 3.1, unit: 'MW', peak: 3.4, efficiency: 82, hvacShare: 54, sparkline: [2.6, 2.8, 2.9, 3.0, 3.1, 3.2, 3.1] },
        powerDemand: { value: 3.1, unit: 'MW', contractPct: 74, powerFactor: 0.97, status: 'good' },
      },
      predictive: {
        energyPeak30: { value: 3.4, unit: 'MW', status: 'warning' },
        energyPeak60: { value: 3.6, unit: 'MW', status: 'warning' },
        overconsumptionRisk: { value: 24, unit: '%', threshold: 30, status: 'good' },
        costSavings: { value: 14.8, unit: '%', target: 12, status: 'good' },
      }
    },
    customerExperience: {
      operational: {
        chatbotResponseTime: { value: 1.6, unit: 'sec (P90)', p99: 3.8, status: 'good' },
        resolutionRate: { value: 88, unit: '%', target: 85, status: 'good' },
        engagementRate: { value: 31, unit: '%', dauMau: 27, status: 'good' },
        retailFootfall: { value: 3240, unit: 'visitors/hr', conversion: 9.2, status: 'good' },
        adPerformance: { value: 12.4, unit: 'K imp/hr', fillRate: 94, status: 'good' },
        ctr: { interactive: 1.8, passive: 0.6, unit: '%', status: 'good' },
      },
      predictive: {
        predictedRetailTraffic: { value: '+34%', event: 'AFL Game Day', multiplier: 1.22, status: 'warning' },
        eventDemandForecast: { value: 'AFL Season + FIFO Peak', scenario: 'High', status: 'warning' },
        conversionProbability: { value: 32, unit: '%', target: 5, status: 'good' },
        revenueUplift: { value: 16.4, unit: '%', target: 15, pValue: '<0.05', status: 'good' },
      }
    }
  },

  // ══════════════════════════════════════════════════════════════
  // T1 DOMESTIC (Virgin)
  // ══════════════════════════════════════════════════════════════
  't1-domestic': {
    passengerFlow: {
      operational: {
        density: { value: 2.4, unit: 'pax/m²', status: 'amber', thresholds: { green: 1.5, amber: 3.0, red: 4.5 }, sparkline: [2.0, 2.1, 2.2, 2.3, 2.4, 2.4, 2.4] },
        flowRate: { value: 96, unit: 'pax/min', target: 25, status: 'good', sparkline: [88, 90, 92, 94, 96, 95, 96] },
        avgWaitTime: { value: 4.2, unit: 'min', slaSecurity: 5, slaCheckIn: 3, slaImmigration: 10, status: 'good', sparkline: [3.8, 4.0, 4.1, 4.2, 4.3, 4.2, 4.2] },
        congestionScore: { value: 52, bands: { green: 30, amber: 60, red: 85 }, status: 'amber', sparkline: [42, 46, 48, 50, 52, 52, 52] },
      },
      predictive: {
        predictedOccupancy30: { value: 62, unit: '%', status: 'good', confidence: '80% CI' },
        predictedOccupancy60: { value: 68, unit: '%', status: 'good', confidence: '70% CI' },
        requiredLanes: { value: 8, current: 7, model: 'M/M/c', targetUtil: '75-85%' },
        staffingForecast: { value: 34, unit: 'agents', multiplier: '1.0x', status: 'good' },
        avoidedDelayMin: { value: 180, unit: 'min', threshold: 5 },
      }
    },
    resourceScheduling: {
      operational: {
        staffEfficiency: { value: 86, unit: '%', target: 85, status: 'good', sparkline: [84, 85, 86, 87, 86, 85, 86] },
        onTimeBoardingRate: { value: 92, unit: '%', target: 92, status: 'good', sparkline: [91, 92, 93, 92, 91, 92, 92] },
        onTimeDepartureRate: { value: 90, unit: '%', target: 88, status: 'good', sparkline: [89, 90, 91, 90, 89, 90, 90] },
      },
      predictive: {
        turnaroundForecast: { value: 32, unit: 'min', mae: 3.4, wideBodyBuffer: 'N/A', status: 'good' },
        gateReassignmentScore: { value: 82, unit: '/100', status: 'good' },
        delayPropagation: { value: 280, unit: 'pax-delay-min', threshold: 500, status: 'good' },
      }
    },
    baggageThreat: {
      operational: {
        bagsAtRisk: { value: 1.2, unit: '%', status: 'good', sparkline: [1.4, 1.2, 1.3, 1.1, 1.2, 1.3, 1.2] },
        intrusionsDetected: { value: 0, status: 'good' },
        suspiciousBehavior: { value: 0, anomalyScore: 0.0, status: 'good' },
      },
      predictive: {
        threatRiskScore: { value: 18, bands: { low: 25, moderate: 50, high: 75 }, status: 'good' },
        avgResolutionTime: { value: 5, unit: 'min', slaSterile: 5, slaPublic: 8, status: 'good' },
      }
    },
    sustainability: {
      operational: {
        carbonFootprint: { value: 11.8, unit: 'tCO₂e/day', gridFactor: 0.69, status: 'good' },
        energyConsumption: { value: 1.6, unit: 'MW', peak: 2.0, efficiency: 88, hvacShare: 48, sparkline: [1.4, 1.5, 1.6, 1.7, 1.6, 1.7, 1.6] },
        powerDemand: { value: 1.6, unit: 'MW', contractPct: 38, powerFactor: 0.96, status: 'good' },
      },
      predictive: {
        energyPeak30: { value: 1.8, unit: 'MW', status: 'good' },
        energyPeak60: { value: 2.0, unit: 'MW', status: 'good' },
        overconsumptionRisk: { value: 14, unit: '%', threshold: 30, status: 'good' },
        costSavings: { value: 16.2, unit: '%', target: 12, status: 'good' },
      }
    },
    customerExperience: {
      operational: {
        chatbotResponseTime: { value: 1.4, unit: 'sec (P90)', p99: 3.2, status: 'good' },
        resolutionRate: { value: 91, unit: '%', target: 85, status: 'good' },
        engagementRate: { value: 28, unit: '%', dauMau: 26, status: 'good' },
        retailFootfall: { value: 1820, unit: 'visitors/hr', conversion: 8.4, status: 'good' },
        adPerformance: { value: 8.2, unit: 'K imp/hr', fillRate: 92, status: 'good' },
        ctr: { interactive: 1.6, passive: 0.5, unit: '%', status: 'good' },
      },
      predictive: {
        predictedRetailTraffic: { value: '+12%', event: 'School Holidays', multiplier: 1.12, status: 'good' },
        eventDemandForecast: { value: 'Normal Operations', scenario: 'Base', status: 'good' },
        conversionProbability: { value: 28, unit: '%', target: 5, status: 'good' },
        revenueUplift: { value: 14.8, unit: '%', target: 15, pValue: '<0.05', status: 'warning' },
      }
    }
  },

  // ══════════════════════════════════════════════════════════════
  // T2 REGIONAL / FIFO
  // ══════════════════════════════════════════════════════════════
  't2-regional': {
    passengerFlow: {
      operational: {
        density: { value: 2.8, unit: 'pax/m²', status: 'amber', thresholds: { green: 1.5, amber: 3.0, red: 4.5 }, sparkline: [1.8, 2.2, 2.5, 2.6, 2.8, 2.7, 2.8] },
        flowRate: { value: 64, unit: 'pax/min', target: 25, status: 'good', sparkline: [42, 48, 54, 58, 62, 64, 64] },
        avgWaitTime: { value: 6.4, unit: 'min', slaSecurity: 5, slaCheckIn: 3, slaImmigration: 10, status: 'warning', sparkline: [4.2, 4.8, 5.4, 5.8, 6.2, 6.4, 6.4] },
        congestionScore: { value: 62, bands: { green: 30, amber: 60, red: 85 }, status: 'red', sparkline: [34, 42, 52, 58, 62, 60, 58] },
      },
      predictive: {
        predictedOccupancy30: { value: 72, unit: '%', status: 'warning', confidence: '80% CI' },
        predictedOccupancy60: { value: 68, unit: '%', status: 'good', confidence: '70% CI' },
        requiredLanes: { value: 6, current: 4, model: 'M/M/c', targetUtil: '75-85%' },
        staffingForecast: { value: 28, unit: 'agents', multiplier: '1.8x FIFO Mon/Tue', status: 'critical' },
        avoidedDelayMin: { value: 220, unit: 'min', threshold: 5 },
      }
    },
    resourceScheduling: {
      operational: {
        staffEfficiency: { value: 68, unit: '%', target: 85, status: 'critical', sparkline: [72, 70, 68, 66, 68, 70, 68] },
        onTimeBoardingRate: { value: 84, unit: '%', target: 92, status: 'critical', sparkline: [86, 85, 84, 83, 84, 85, 84] },
        onTimeDepartureRate: { value: 82, unit: '%', target: 88, status: 'critical', sparkline: [84, 83, 82, 81, 82, 83, 82] },
      },
      predictive: {
        turnaroundForecast: { value: 28, unit: 'min', mae: 3.8, wideBodyBuffer: 'FIFO profile', status: 'good' },
        gateReassignmentScore: { value: 62, unit: '/100', status: 'warning' },
        delayPropagation: { value: 480, unit: 'pax-delay-min', threshold: 500, status: 'warning' },
      }
    },
    baggageThreat: {
      operational: {
        bagsAtRisk: { value: 2.4, unit: '%', status: 'warning', sparkline: [2.0, 2.2, 2.4, 2.6, 2.4, 2.2, 2.4] },
        intrusionsDetected: { value: 1, status: 'critical' },
        suspiciousBehavior: { value: 1, anomalyScore: 0.82, status: 'warning' },
      },
      predictive: {
        threatRiskScore: { value: 38, bands: { low: 25, moderate: 50, high: 75 }, status: 'warning' },
        avgResolutionTime: { value: 10, unit: 'min', slaSterile: 5, slaPublic: 8, status: 'warning' },
      }
    },
    sustainability: {
      operational: {
        carbonFootprint: { value: 4.2, unit: 'tCO₂e/day', gridFactor: 0.69, status: 'good' },
        energyConsumption: { value: 0.6, unit: 'MW', peak: 0.9, efficiency: 92, hvacShare: 42, sparkline: [0.5, 0.5, 0.6, 0.7, 0.6, 0.7, 0.6] },
        powerDemand: { value: 0.6, unit: 'MW', contractPct: 14, powerFactor: 0.96, status: 'good' },
      },
      predictive: {
        energyPeak30: { value: 0.8, unit: 'MW', status: 'good' },
        energyPeak60: { value: 0.9, unit: 'MW', status: 'good' },
        overconsumptionRisk: { value: 8, unit: '%', threshold: 30, status: 'good' },
        costSavings: { value: 18.4, unit: '%', target: 12, status: 'good' },
      }
    },
    customerExperience: {
      operational: {
        chatbotResponseTime: { value: 1.8, unit: 'sec (P90)', p99: 4.2, status: 'good' },
        resolutionRate: { value: 82, unit: '%', target: 85, status: 'warning' },
        engagementRate: { value: 22, unit: '%', dauMau: 19, status: 'warning' },
        retailFootfall: { value: 640, unit: 'visitors/hr', conversion: 6.8, status: 'warning' },
        adPerformance: { value: 3.8, unit: 'K imp/hr', fillRate: 88, status: 'warning' },
        ctr: { interactive: 1.2, passive: 0.4, unit: '%', status: 'warning' },
      },
      predictive: {
        predictedRetailTraffic: { value: '+8%', event: 'FIFO Roster Change', multiplier: 1.08, status: 'good' },
        eventDemandForecast: { value: 'FIFO Roster Peak', scenario: 'High', status: 'warning' },
        conversionProbability: { value: 18, unit: '%', target: 5, status: 'good' },
        revenueUplift: { value: 10.2, unit: '%', target: 15, pValue: '<0.05', status: 'warning' },
      }
    }
  },

  // ══════════════════════════════════════════════════════════════
  // T3 QANTAS
  // ══════════════════════════════════════════════════════════════
  't3-qantas': {
    passengerFlow: {
      operational: {
        density: { value: 2.6, unit: 'pax/m²', status: 'amber', thresholds: { green: 1.5, amber: 3.0, red: 4.5 }, sparkline: [2.2, 2.3, 2.4, 2.5, 2.6, 2.6, 2.6] },
        flowRate: { value: 104, unit: 'pax/min', target: 25, status: 'good', sparkline: [92, 96, 100, 102, 104, 103, 104] },
        avgWaitTime: { value: 4.8, unit: 'min', slaSecurity: 5, slaCheckIn: 3, slaImmigration: 10, status: 'good', sparkline: [4.2, 4.4, 4.6, 4.7, 4.8, 4.8, 4.8] },
        congestionScore: { value: 58, bands: { green: 30, amber: 60, red: 85 }, status: 'amber', sparkline: [46, 50, 54, 56, 58, 58, 56] },
      },
      predictive: {
        predictedOccupancy30: { value: 66, unit: '%', status: 'good', confidence: '80% CI' },
        predictedOccupancy60: { value: 72, unit: '%', status: 'warning', confidence: '70% CI' },
        requiredLanes: { value: 10, current: 8, model: 'M/M/c', targetUtil: '75-85%' },
        staffingForecast: { value: 42, unit: 'agents', multiplier: '1.0x', status: 'good' },
        avoidedDelayMin: { value: 280, unit: 'min', threshold: 5 },
      }
    },
    resourceScheduling: {
      operational: {
        staffEfficiency: { value: 84, unit: '%', target: 85, status: 'warning', sparkline: [82, 84, 85, 84, 83, 84, 84] },
        onTimeBoardingRate: { value: 90, unit: '%', target: 92, status: 'warning', sparkline: [89, 90, 91, 90, 89, 90, 90] },
        onTimeDepartureRate: { value: 88, unit: '%', target: 88, status: 'good', sparkline: [87, 88, 89, 88, 87, 88, 88] },
      },
      predictive: {
        turnaroundForecast: { value: 35, unit: 'min', mae: 3.6, wideBodyBuffer: 'N/A', status: 'good' },
        gateReassignmentScore: { value: 78, unit: '/100', status: 'good' },
        delayPropagation: { value: 380, unit: 'pax-delay-min', threshold: 500, status: 'good' },
      }
    },
    baggageThreat: {
      operational: {
        bagsAtRisk: { value: 1.4, unit: '%', status: 'good', sparkline: [1.6, 1.4, 1.5, 1.3, 1.4, 1.5, 1.4] },
        intrusionsDetected: { value: 0, status: 'good' },
        suspiciousBehavior: { value: 0, anomalyScore: 0.0, status: 'good' },
      },
      predictive: {
        threatRiskScore: { value: 22, bands: { low: 25, moderate: 50, high: 75 }, status: 'good' },
        avgResolutionTime: { value: 6, unit: 'min', slaSterile: 5, slaPublic: 8, status: 'good' },
      }
    },
    sustainability: {
      operational: {
        carbonFootprint: { value: 13.2, unit: 'tCO₂e/day', gridFactor: 0.69, status: 'warning' },
        energyConsumption: { value: 1.8, unit: 'MW', peak: 2.2, efficiency: 86, hvacShare: 50, sparkline: [1.4, 1.5, 1.7, 1.8, 1.8, 2.0, 1.8] },
        powerDemand: { value: 1.8, unit: 'MW', contractPct: 43, powerFactor: 0.97, status: 'good' },
      },
      predictive: {
        energyPeak30: { value: 2.0, unit: 'MW', status: 'good' },
        energyPeak60: { value: 2.2, unit: 'MW', status: 'warning' },
        overconsumptionRisk: { value: 18, unit: '%', threshold: 30, status: 'good' },
        costSavings: { value: 15.6, unit: '%', target: 12, status: 'good' },
      }
    },
    customerExperience: {
      operational: {
        chatbotResponseTime: { value: 1.5, unit: 'sec (P90)', p99: 3.4, status: 'good' },
        resolutionRate: { value: 90, unit: '%', target: 85, status: 'good' },
        engagementRate: { value: 34, unit: '%', dauMau: 29, status: 'good' },
        retailFootfall: { value: 2180, unit: 'visitors/hr', conversion: 8.8, status: 'good' },
        adPerformance: { value: 9.6, unit: 'K imp/hr', fillRate: 93, status: 'good' },
        ctr: { interactive: 1.7, passive: 0.6, unit: '%', status: 'good' },
      },
      predictive: {
        predictedRetailTraffic: { value: '+18%', event: 'AFL Match Day', multiplier: 1.18, status: 'warning' },
        eventDemandForecast: { value: 'AFL Season', scenario: 'Base', status: 'good' },
        conversionProbability: { value: 30, unit: '%', target: 5, status: 'good' },
        revenueUplift: { value: 15.8, unit: '%', target: 15, pValue: '<0.05', status: 'good' },
      }
    }
  },

  // ══════════════════════════════════════════════════════════════
  // T4 QANTAS DOMESTIC
  // ══════════════════════════════════════════════════════════════
  't4-qantas': {
    passengerFlow: {
      operational: {
        density: { value: 3.4, unit: 'pax/m²', status: 'red', thresholds: { green: 1.5, amber: 3.0, red: 4.5 }, sparkline: [2.8, 3.0, 3.2, 3.3, 3.4, 3.4, 3.4] },
        flowRate: { value: 88, unit: 'pax/min', target: 25, status: 'good', sparkline: [78, 80, 84, 86, 88, 87, 88] },
        avgWaitTime: { value: 6.8, unit: 'min', slaSecurity: 5, slaCheckIn: 3, slaImmigration: 10, status: 'warning', sparkline: [5.4, 5.8, 6.2, 6.6, 6.8, 7.0, 6.8] },
        congestionScore: { value: 72, bands: { green: 30, amber: 60, red: 85 }, status: 'red', sparkline: [58, 62, 66, 70, 72, 72, 70] },
      },
      predictive: {
        predictedOccupancy30: { value: 82, unit: '%', status: 'warning', confidence: '80% CI' },
        predictedOccupancy60: { value: 88, unit: '%', status: 'critical', confidence: '70% CI' },
        requiredLanes: { value: 10, current: 7, model: 'M/M/c', targetUtil: '75-85%' },
        staffingForecast: { value: 38, unit: 'agents', multiplier: '1.2x peak', status: 'warning' },
        avoidedDelayMin: { value: 260, unit: 'min', threshold: 5 },
      }
    },
    resourceScheduling: {
      operational: {
        staffEfficiency: { value: 74, unit: '%', target: 85, status: 'warning', sparkline: [76, 75, 74, 73, 74, 75, 74] },
        onTimeBoardingRate: { value: 86, unit: '%', target: 92, status: 'warning', sparkline: [88, 87, 86, 85, 86, 87, 86] },
        onTimeDepartureRate: { value: 84, unit: '%', target: 88, status: 'critical', sparkline: [86, 85, 84, 83, 84, 85, 84] },
      },
      predictive: {
        turnaroundForecast: { value: 36, unit: 'min', mae: 4.4, wideBodyBuffer: 'N/A', status: 'warning' },
        gateReassignmentScore: { value: 66, unit: '/100', status: 'warning' },
        delayPropagation: { value: 560, unit: 'pax-delay-min', threshold: 500, status: 'critical' },
      }
    },
    baggageThreat: {
      operational: {
        bagsAtRisk: { value: 2.0, unit: '%', status: 'warning', sparkline: [1.8, 2.0, 2.2, 1.9, 2.0, 2.1, 2.0] },
        intrusionsDetected: { value: 0, status: 'good' },
        suspiciousBehavior: { value: 1, anomalyScore: 0.78, status: 'warning' },
      },
      predictive: {
        threatRiskScore: { value: 28, bands: { low: 25, moderate: 50, high: 75 }, status: 'warning' },
        avgResolutionTime: { value: 7, unit: 'min', slaSterile: 5, slaPublic: 8, status: 'warning' },
      }
    },
    sustainability: {
      operational: {
        carbonFootprint: { value: 8.8, unit: 'tCO₂e/day', gridFactor: 0.69, status: 'good' },
        energyConsumption: { value: 1.2, unit: 'MW', peak: 1.6, efficiency: 78, hvacShare: 58, sparkline: [0.9, 1.0, 1.1, 1.2, 1.2, 1.3, 1.2] },
        powerDemand: { value: 1.2, unit: 'MW', contractPct: 29, powerFactor: 0.95, status: 'good' },
      },
      predictive: {
        energyPeak30: { value: 1.4, unit: 'MW', status: 'good' },
        energyPeak60: { value: 1.6, unit: 'MW', status: 'warning' },
        overconsumptionRisk: { value: 32, unit: '%', threshold: 30, status: 'warning' },
        costSavings: { value: 12.4, unit: '%', target: 12, status: 'good' },
      }
    },
    customerExperience: {
      operational: {
        chatbotResponseTime: { value: 1.7, unit: 'sec (P90)', p99: 4.0, status: 'good' },
        resolutionRate: { value: 86, unit: '%', target: 85, status: 'good' },
        engagementRate: { value: 26, unit: '%', dauMau: 24, status: 'good' },
        retailFootfall: { value: 1680, unit: 'visitors/hr', conversion: 7.6, status: 'warning' },
        adPerformance: { value: 7.4, unit: 'K imp/hr', fillRate: 90, status: 'good' },
        ctr: { interactive: 1.4, passive: 0.5, unit: '%', status: 'warning' },
      },
      predictive: {
        predictedRetailTraffic: { value: '+22%', event: 'AFL + School Holiday', multiplier: 1.22, status: 'warning' },
        eventDemandForecast: { value: 'AFL Season + Holiday', scenario: 'High', status: 'warning' },
        conversionProbability: { value: 24, unit: '%', target: 5, status: 'good' },
        revenueUplift: { value: 13.6, unit: '%', target: 15, pValue: '<0.05', status: 'warning' },
      }
    }
  },
};
