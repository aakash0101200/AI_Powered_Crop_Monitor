// src/smoothing.js
export function emaSeries(series, alpha = 0.2) {
    if (!series.length) return []
    const out = [series[0]]
    for (let i = 1; i < series.length; i++) {
      out.push(alpha * series[i] + (1 - alpha) * out[i - 1])
    }
    return out
  }
  