// src/insightEngine.js
// Deterministic, explainable “GenAI-style” text generator using your LSTM outputs

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

// 1) Normal ranges (adjust to your domain as you validate with data)
const NORMALS = {
  Env_Temp: { optimal: [20, 32], warn: [15, 38] },
  Env_Humidity: { optimal: [40, 75], warn: [30, 90] },
  Soil_Temp: { optimal: [15, 26], warn: [10, 35] },
  Soil_pH: { optimal: [6.3, 7.3], warn: [5.5, 7.8] },
  Leaf_Wetness: { optimal: [0, 80], warn: [0, 95] },
  Light_Intensity: { optimal: [20, 80], warn: [5, 100] }, // unit depends on your scale
  Water_TDS: { optimal: [0, 120], warn: [0, 200] },
  Battery_Voltage: { optimal: [3.6, 4.2], warn: [3.5, 4.3] }
}

// 2) Deviation-based anomaly score 0..100 (higher = worse)
function anomalyScore(key, value) {
  const cfg = NORMALS[key]
  if (!cfg) return 0
  const [optL, optH] = cfg.optimal
  const [wL, wH] = cfg.warn

  if (value >= optL && value <= optH) return 0
  if (value < wL || value > wH) return 100

  // Linear interpolation inside warning band
  if (value < optL) {
    const span = optL - wL
    return clamp(((optL - value) / span) * 100, 0, 100)
  } else {
    const span = wH - optH
    return clamp(((value - optH) / span) * 100, 0, 100)
  }
}

// 3) Risk models (simple, defensible, matches agronomy logic)
function diseaseRisk(pred) {
  // High humidity + high leaf wetness + mild temps => fungus-friendly
  const h = pred.Env_Humidity ?? 0
  const lw = pred.Leaf_Wetness ?? 0
  const t = pred.Env_Temp ?? 0

  let risk = 0
  if (h > 80) risk += 30
  if (lw > 90) risk += 40
  if (t >= 18 && t <= 30) risk += 20
  if (h > 90 && lw > 95) risk += 20

  return clamp(risk, 0, 100)
}

function salinityRisk(pred) {
  // Water_TDS high => salinity risk
  const tds = pred.Water_TDS ?? 0
  if (tds <= 120) return 5
  if (tds >= 200) return 90
  return clamp(((tds - 120) / 80) * 90 + 5, 5, 90)
}

function heatStressRisk(pred) {
  const t = pred.Env_Temp ?? 0
  if (t <= 32) return 5
  if (t >= 40) return 95
  return clamp(((t - 32) / 8) * 90 + 5, 5, 95)
}

// 4) Explanations and recommendations
function summarizeConditions(pred) {
  const notes = []
  const push = (msg) => notes.push(msg)

  // pH
  if (pred.Soil_pH < 6.0) push(`Soil is slightly acidic (pH ${pred.Soil_pH.toFixed(1)}), which can reduce nutrient availability.`)
  else if (pred.Soil_pH > 7.5) push(`Soil is slightly alkaline (pH ${pred.Soil_pH.toFixed(1)}), trace elements may lock out.`)

  // Humidity / leaf wetness
  if (pred.Env_Humidity > 80 && pred.Leaf_Wetness > 90) push(`High humidity (${pred.Env_Humidity.toFixed(0)}%) and leaf wetness (${pred.Leaf_Wetness.toFixed(0)}%) can favor fungal disease.`)

  // TDS
  if (pred.Water_TDS > 150) push(`Irrigation water TDS is elevated (${pred.Water_TDS.toFixed(0)} mg/L), monitor salinity stress.`)

  // Temp
  if (pred.Env_Temp > 34) push(`Ambient temperature is high (${pred.Env_Temp.toFixed(1)}°C), heat stress likely during the day.`)

  return notes
}

function recommendations(pred) {
  const recs = []

  // pH adjustments
  if (pred.Soil_pH < 6.0) recs.push({ priority: 'high', action: 'Plan liming to raise soil pH toward 6.5–7.0; recheck pH in 2–3 weeks.' })
  if (pred.Soil_pH > 7.5) recs.push({ priority: 'medium', action: 'Consider elemental sulfur or acidifying fertilizers to nudge pH toward neutral.' })

  // Disease mitigation
  const dRisk = diseaseRisk(pred)
  if (dRisk >= 70) recs.push({ priority: 'high', action: 'Reduce canopy wetness: improve airflow, irrigate early morning, and consider preventive fungicide per label.' })
  else if (dRisk >= 40) recs.push({ priority: 'medium', action: 'Increase ventilation and avoid late-evening irrigation to limit leaf wetness duration.' })

  // Salinity / irrigation
  const sRisk = salinityRisk(pred)
  if (sRisk >= 70) recs.push({ priority: 'high', action: 'Blend with low‑TDS water, increase leaching fraction, and monitor EC to prevent salt buildup.' })
  else if (sRisk >= 40) recs.push({ priority: 'medium', action: 'Monitor soil EC weekly and schedule occasional leaching irrigations.' })

  // Heat stress
  const hRisk = heatStressRisk(pred)
  if (hRisk >= 70) recs.push({ priority: 'high', action: 'Shift irrigation earlier in the day; use mulches/shade where possible to reduce canopy temperature.' })
  else if (hRisk >= 40) recs.push({ priority: 'medium', action: 'Avoid mid‑day operations; ensure adequate soil moisture to buffer heat stress.' })

  return recs
}

// 5) Main API
export function generateInsights(predictions) {
  const anomaly = Object.fromEntries(
    Object.entries(predictions).map(([k, v]) => [k, anomalyScore(k, v)])
  )

  const risks = {
    disease: diseaseRisk(predictions),
    salinity: salinityRisk(predictions),
    heat: heatStressRisk(predictions)
  }

  const summary = summarizeConditions(predictions)
  const recs = recommendations(predictions)

  // Natural language overview
  const overview = (() => {
    const conditions = []
    if (predictions.Soil_pH >= 6.0 && predictions.Soil_pH <= 7.0) {
      conditions.push("soil chemistry is well-balanced")
    }
    if (predictions.Env_Humidity < 80) {
      conditions.push("humidity levels support healthy plant respiration")
    }
    if (predictions.Water_TDS < 120) {
      conditions.push("irrigation water quality is optimal")
    }
    
    const riskLevel = Math.max(risks.disease, risks.salinity, risks.heat)
    
    if (riskLevel < 30) {
      return `Current agricultural conditions are favorable with ${conditions.join(" and ")}. Your crops are experiencing optimal growing conditions with minimal stress factors detected.`
    } else if (riskLevel < 70) {
      return `Moderate attention required: while most parameters are stable, I've identified some environmental factors that could impact crop health if left unaddressed.`
    } else {
      return `Immediate action recommended: multiple stress indicators suggest your crops may be at risk. Environmental conditions require prompt intervention to prevent yield loss.`
    }
  })()
  
  return { anomaly, risks, overview, summary, recs }

}
