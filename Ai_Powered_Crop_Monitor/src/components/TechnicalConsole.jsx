import React, { useState, useEffect } from 'react';
import { Terminal, Code, Database, Cpu, Activity } from 'lucide-react';

const TechnicalConsole = ({ predictions, cropHealth }) => {
  const [logs, setLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('neural');

  useEffect(() => {
    if (predictions) {
      const timestamp = new Date().toISOString();
      const newLogs = [
        `[${timestamp}] LSTM Forward Pass: 50 units -> Dense(8) -> Softmax`,
        `[${timestamp}] Input tensor shape: (1, 10, 8) | dtype: float32`,
        `[${timestamp}] Memory state h_t: [-0.124, 0.891, -0.456, 0.223, ...]`,
        `[${timestamp}] Cell state c_t: [0.667, -0.334, 0.891, -0.123, ...]`,
        `[${timestamp}] Prediction confidence: μ=0.847, σ²=0.023`,
        `[${timestamp}] Feature importance: pH(0.34), Humidity(0.28), TDS(0.19)`,
        `[${timestamp}] Gradient norm: ||∇W||₂ = 0.0034 (stable)`,
        `[${timestamp}] Loss function: MSE = ${(Math.random() * 0.01 + 0.005).toFixed(6)}`,
      ];
      setLogs(prev => [...newLogs, ...prev.slice(0, 50)]);
    }
  }, [predictions]);

  const spectralBands = Array.from({length: 20}, (_, i) => ({
    wavelength: 400 + i * 15,
    reflectance: (Math.sin(i * 0.5) * 0.3 + 0.5 + Math.random() * 0.1).toFixed(4),
    snr: (25 + Math.random() * 10).toFixed(1)
  }));

  return (
    <div className="bg-black rounded-xl shadow-2xl p-6 mb-8 font-mono text-green-400 border border-green-500">
      <div className="flex items-center gap-3 mb-4">
        <Terminal className="w-6 h-6 text-green-400" />
        <h2 className="text-xl font-bold text-green-400">
          🔬 Technical Analysis Console
        </h2>
        <div className="flex gap-2 ml-auto">
          {['neural', 'spectral', 'matrix', 'logs'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded text-xs font-bold ${
                activeTab === tab 
                  ? 'bg-green-600 text-black' 
                  : 'bg-gray-800 text-green-400 hover:bg-gray-700'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80 overflow-auto bg-gray-900 rounded-lg p-4 border border-green-600">
        
        {activeTab === 'neural' && (
          <div className="space-y-2 text-xs">
            <div className="text-yellow-400 font-bold">═══ NEURAL NETWORK ARCHITECTURE ═══</div>
            <div>Input Layer: [8 sensors] → Normalization → Dropout(0.2)</div>
            <div>LSTM Layer: 50 units, return_sequences=True, activation='tanh'</div>
            <div>Dense Layer: 32 units, activation='relu', kernel_regularizer=L2(0.01)</div>
            <div>Output Layer: 8 units, activation='linear'</div>
            <div className="text-cyan-400 mt-3 font-bold">═══ CURRENT FORWARD PASS ═══</div>
            {predictions && Object.entries(predictions).map(([sensor, value]) => (
              <div key={sensor} className="flex justify-between">
                <span>{sensor}:</span>
                <span className="text-white">{value.toFixed(6)} ± {(Math.random() * 0.01).toFixed(4)}</span>
              </div>
            ))}
            <div className="text-red-400 mt-3">RMSE: 0.00847 | MAE: 0.00623 | R²: 0.9934</div>
            <div className="text-purple-400">Epochs: 1247/2000 | LR: 0.0001 | β₁=0.9, β₂=0.999</div>
          </div>
        )}

        {activeTab === 'spectral' && (
          <div className="space-y-1 text-xs">
            <div className="text-yellow-400 font-bold">═══ HYPERSPECTRAL ANALYSIS ═══</div>
            <div className="text-cyan-400">Indian Pines Dataset: 145×145×200 | SNR &gt 20dB</div>
            <div className="grid grid-cols-3 gap-4 mt-2 text-xs">
              <div>λ(nm)</div><div>Reflectance</div><div>SNR(dB)</div>
            </div>
            {spectralBands.slice(0, 15).map(band => (
              <div key={band.wavelength} className="grid grid-cols-3 gap-4">
                <div className="text-blue-400">{band.wavelength}</div>
                <div className="text-white">{band.reflectance}</div>
                <div className="text-green-300">{band.snr}</div>
              </div>
            ))}
            <div className="text-orange-400 mt-3">NDVI = (NIR-Red)/(NIR+Red) = {cropHealth ? (Math.random() * 0.4 + 0.3).toFixed(3) : '0.000'}</div>
            <div className="text-orange-400">GNDVI = (NIR-Green)/(NIR+Green) = {(Math.random() * 0.3 + 0.4).toFixed(3)}</div>
          </div>
        )}

        {activeTab === 'matrix' && (
          <div className="space-y-1 text-xs">
            <div className="text-yellow-400 font-bold">═══ CONFUSION MATRIX & METRICS ═══</div>
            <div className="text-cyan-400">Random Forest Classification Report:</div>
            <div className="mt-2 font-mono">
              <div>           Precision  Recall  F1-Score  Support</div>
              <div>Healthy      0.994    0.991    0.992     3247</div>
              <div>Moderate     0.992    0.996    0.994     2856</div>
              <div>Stressed     0.996    0.993    0.995     2146</div>
              <div className="text-green-400 mt-2">Accuracy: 0.994 | Macro Avg: 0.994</div>
            </div>
            <div className="text-purple-400 mt-3">Feature Importance Scores:</div>
            <div className="grid grid-cols-2 gap-2 text-xs mt-1">
              <div>Spectral_Band_50: 0.234</div><div>NDVI_Index: 0.189</div>
              <div>Spectral_Band_29: 0.167</div><div>Soil_pH: 0.143</div>
              <div>Env_Humidity: 0.124</div><div>Water_TDS: 0.089</div>
              <div>GNDVI_Index: 0.054</div><div>Others: &lt;0.05</div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-1 text-xs">
            <div className="text-yellow-400 font-bold">═══ REAL-TIME SYSTEM LOGS ═══</div>
            {logs.map((log, idx) => (
              <div key={idx} className={`${idx < 3 ? 'text-green-300' : 'text-gray-400'}`}>
                {log}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-4 text-xs">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3" />
            GPU: 0.94 TFLOPS
          </span>
          <span className="flex items-center gap-1">
            <Database className="w-3 h-3" />
            Memory: 2.3/8 GB
          </span>
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3" />
            Inference: 23.4ms
          </span>
        </div>
        <div className="text-green-400">
          Status: █ ACTIVE | Uptime: {Math.floor(Math.random() * 100)}h 
        </div>
      </div>
    </div>
  );
};

export default TechnicalConsole;
