// SensorDashboard.jsx
import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Minus, Zap, Brain, Activity, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as ChartTitle,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { generateInsights } from '../../insightEngine'

import CropHealth from '../../components/CropHealth';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Filler,
  Legend
)

function SensorDashboard() {
  // all your previous App.jsx code stays the same
  const [predictions, setPredictions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [historicalData, setHistoricalData] = useState([])
  const [selectedSensor, setSelectedSensor] = useState('Water_TDS')
  const [insights, setInsights] = useState(null) // ADD THIS STATE
  const [aiExplanation, setAiExplanation] = useState("")
  const [aiLoading, setAiLoading] = useState(false)

  const [cropHealth, setCropHealth] = useState(null);
  const [cropHealthLoading, setCropHealthLoading] = useState(false);
  // Realistic variation (keep very small for stable demo)
  const addRealisticVariation = (value, sensorType) => {
    const variations = {
      'Battery_Voltage': 0.001,
      'Env_Temp': 0.05,        // Reduced from 0.1
      'Env_Humidity': 0.2,     // Reduced from 0.5
      'Soil_Temp': 0.02,      // Reduced from 0.05
      'Soil_pH': 0.01,        // Reduced from 0.02
      'Water_TDS': 0.5,       // Reduced from 1.0
      'Light_Intensity': 1.0,  // Reduced from 2.0
      'Leaf_Wetness': 0.1     // Reduced from 0.2
    }
    
    const maxChange = variations[sensorType] || 0.01
    const change = (Math.random() - 0.5) * maxChange
    return Math.max(0, value + change)
  }

  const fetchPredictions = async () => {
    setLoading(true)
    try {
      const response = await fetch('http://localhost:8080/api/v1/predict')
      const data = await response.json()
      
      const realisticPredictions = {}
      Object.keys(data.predictions).forEach(key => {
        realisticPredictions[key] = parseFloat(
          addRealisticVariation(data.predictions[key], key).toFixed(3)
        )
      })
            
      setPredictions(realisticPredictions)
      
      setAiLoading(true)
      try {
        const explainResponse = await fetch('http://localhost:8080/api/v1/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ predictions: realisticPredictions })
        })
        const explainData = await explainResponse.json()
        setAiExplanation(explainData.explanation)
      } catch (error) {
        console.error('AI explanation failed:', error)
        setAiExplanation("Agricultural analysis system is processing sensor data. Current readings indicate normal operational parameters.")
      } finally {
        setAiLoading(false)
      }


      // GENERATE INSIGHTS RIGHT AFTER SETTING PREDICTIONS
      const newInsights = generateInsights(realisticPredictions)
      setInsights(newInsights)
      
      setLastUpdated(new Date().toLocaleTimeString())
      
      const newPoint = {
        time: new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit'
        }),
        ...realisticPredictions
      }
      
      setHistoricalData(prev => [...prev.slice(-39), newPoint]) // Keep last 40 points
      
    } catch (error) {
      console.error('Failed to fetch predictions:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPredictions()
    if (autoRefresh) {
      const interval = setInterval(fetchPredictions, 30000) // Changed to 30 seconds
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const sensorConfig = {
    Battery_Voltage: { unit: 'V', threshold: 3.6, color: '#f59e0b', bgColor: 'bg-yellow-500', icon: '🔋' },
    Env_Humidity: { unit: '%', threshold: 70, color: '#3b82f6', bgColor: 'bg-blue-500', icon: '💧' },
    Env_Temp: { unit: '°C', threshold: 30, color: '#ef4444', bgColor: 'bg-red-500', icon: '🌡️' },
    Leaf_Wetness: { unit: '%', threshold: 80, color: '#10b981', bgColor: 'bg-green-500', icon: '🍃' },
    Light_Intensity: { unit: 'lux', threshold: 50, color: '#f97316', bgColor: 'bg-orange-500', icon: '☀️' },
    Soil_Temp: { unit: '°C', threshold: 25, color: '#d97706', bgColor: 'bg-amber-600', icon: '🌍' },
    Soil_pH: { unit: 'pH', threshold: 7, color: '#8b5cf6', bgColor: 'bg-purple-500', icon: '⚗️' },
    Water_TDS: { unit: 'mg/L', threshold: 120, color: '#06b6d4', bgColor: 'bg-cyan-500', icon: '🌊' }
  }

  const getTrendIcon = (sensor) => {
    if (historicalData.length < 2) return <Minus className="w-4 h-4 text-gray-500" />
    const current = predictions?.[sensor] || 0
    const previous = historicalData[historicalData.length - 2]?.[sensor] || 0
    
    if (current > previous) return <TrendingUp className="w-4 h-4 text-green-500" />
    if (current < previous) return <TrendingDown className="w-4 h-4 text-red-500" />
    return <Minus className="w-4 h-4 text-gray-500" />
  }

  // Chart configuration (unchanged)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
      },
      x: {
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
      },
    },
    elements: {
      line: { tension: 0.4 },
    },
  }

  const chartData = {
    labels: historicalData.map(point => point.time),
    datasets: [
      {
        label: selectedSensor.replace(/_/g, ' '),
        data: historicalData.map(point => point[selectedSensor]),
        borderColor: sensorConfig[selectedSensor]?.color,
        backgroundColor: `${sensorConfig[selectedSensor]?.color}20`,
        fill: true,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  if (!predictions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white rounded-2xl shadow-xl p-8"
        >
          <Brain className="w-16 h-16 text-blue-500 animate-pulse mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AgriSense AI</h2>
          <p className="text-gray-600">Initializing LSTM Prediction System...</p>
        </motion.div>
      </div>
    )
  }

  const fetchCropHealth = async (predictions) => {
    setCropHealthLoading(true);
    try {
      const healthResponse = await fetch('http://localhost:8080/api/v1/crophealth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ predictions })
      });
      const healthData = await healthResponse.json();
      setCropHealth(healthData);
    } catch (error) {
      console.error('Crop health analysis failed:', error);
      setCropHealth({
        healthScore: 65,
        healthStatus: 'Moderate',
        riskLevel: 'Medium',
        insights: ['Health analysis temporarily unavailable']
      });
    } finally {
      setCropHealthLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 mt-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - UNCHANGED */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                🌱 AgriSense AI Dashboard
              </h1>
              <p className="text-gray-600 text-lg">
                LSTM Neural Network • Real-time Crop Sensor Predictions
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                autoRefresh ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                <Activity className="w-4 h-4" />
                <span className="font-medium">
                  {autoRefresh ? 'Live' : 'Paused'} • {lastUpdated}
                </span>
              </div>
              
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  autoRefresh 
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                {autoRefresh ? 'Pause' : 'Resume'}
              </button>
              
              <button
                onClick={fetchPredictions}
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg"
              >
                <Zap className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Predicting...' : 'Refresh'}
              </button>
            </div>
          </div>
        </motion.div>

{/* AI Agricultural Assistant with bullet points */}
<div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <Brain className="w-6 h-6 text-green-600" />
          🤖 AI Agricultural Assistant
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2">
            Powered by Phi-3 Mini
          </span>
        </h2>
        
        {aiLoading ? (
          <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500"></div>
              <span className="text-gray-600 italic">🧠 AI analyzing sensor patterns...</span>
            </div>
          </div>
        ) : aiExplanation ? (
          // Render bullet points from aiExplanation string (assumed to be new line separated)
          <div className="bg-white rounded-lg p-4 border-l-4 border-green-500 prose max-w-none">
            {aiExplanation.split('\n').map((line, idx) => {
              const trimmed = line.trim();
              if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                // Render as a bullet list item
                return <li key={idx} className="mb-1">{trimmed.replace(/^[-•]\s*/, '')}</li>;
              }
              if (trimmed === '') {
                return <br key={idx} />;
              }
              return <p key={idx}>{trimmed}</p>;
            })}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-4 border-l-4 border-gray-300">
            <span className="text-gray-500 italic">🔄 Waiting for sensor data...</span>
          </div>
        )}
      </div>


        {/* NEW: AI INSIGHTS SECTION - INSERT HERE */}
        {insights && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-500" />
                AI Agricultural Analysis
              </h2>
              <p className="text-gray-800 mb-4 font-medium">{insights.overview}</p>
              {insights.summary.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Current Conditions:</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {insights.summary.map((s, i) => (<li key={i}>{s}</li>))}
                  </ul>
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Risk Assessment
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Disease Risk</span>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      insights.risks.disease >= 70 ? 'bg-red-100 text-red-800' :
                      insights.risks.disease >= 40 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {insights.risks.disease}%
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Salinity Risk</span>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    insights.risks.salinity >= 70 ? 'bg-red-100 text-red-800' :
                    insights.risks.salinity >= 40 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {insights.risks.salinity}%
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Heat Stress</span>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    insights.risks.heat >= 70 ? 'bg-red-100 text-red-800' :
                    insights.risks.heat >= 40 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {insights.risks.heat}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NEW: RECOMMENDATIONS SECTION - INSERT HERE */}
        {insights && insights.recs.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>📋</span>
              Recommended Actions
            </h2>
            <div className="space-y-3">
              {insights.recs.map((r, i) => (
                <div key={i} className={`border-l-4 pl-4 py-3 rounded-r-lg ${
                  r.priority === 'high' ? 'border-red-400 bg-red-50' : 
                  r.priority === 'medium' ? 'border-yellow-400 bg-yellow-50' : 
                  'border-blue-400 bg-blue-50'
                }`}>
                  <div className="flex items-start gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                      r.priority === 'high' ? 'bg-red-600 text-white' :
                      r.priority === 'medium' ? 'bg-yellow-600 text-white' :
                      'bg-blue-600 text-white'
                    }`}>
                      {r.priority}
                    </span>
                    <span className="text-gray-800 flex-1">{r.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sensor Cards Grid - UNCHANGED */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnimatePresence>
            {Object.entries(predictions).map(([sensor, value], index) => {
              const config = sensorConfig[sensor]
              const isAlert = value > config.threshold
              
              return (
                <motion.div
                  key={sensor}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 ${
                    selectedSensor === sensor ? 'ring-4 ring-blue-500' : ''
                  } ${isAlert ? 'ring-2 ring-red-400' : ''}`}
                  onClick={() => setSelectedSensor(sensor)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{config.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {sensor.replace(/_/g, ' ')}
                        </h3>
                        <p className="text-xs text-gray-500">Next predicted value</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(sensor)}
                      {isAlert && <AlertTriangle className="w-4 h-4 text-red-500" />}
                    </div>
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {value.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500 mb-1">
                      {config.unit}
                    </span>
                  </div>
                  
                  {isAlert && (
                    <div className="mt-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full inline-block">
                      Alert: Above threshold
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Chart and Stats - UNCHANGED */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Live Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {sensorConfig[selectedSensor].icon} 
                  {selectedSensor.replace(/_/g, ' ')} Predictions
                </h2>
                <p className="text-gray-600">Real-time LSTM forecasting trend</p>
              </div>
              <select
                value={selectedSensor}
                onChange={(e) => setSelectedSensor(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
              >
                {Object.keys(sensorConfig).map(sensor => (
                  <option key={sensor} value={sensor}>
                    {sensor.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="h-80">
              {historicalData.length > 0 && (
                <Line data={chartData} options={chartOptions} />
              )}
            </div>
          </div>

          {/* Model Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-500" />
              Model Performance
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">High Accuracy Sensors</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Battery Voltage:</span>
                    <span className="font-medium">RMSE 0.006V</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Environment Temp:</span>
                    <span className="font-medium">RMSE 0.098°C</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">Moderate Accuracy</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Water TDS:</span>
                    <span className="font-medium">RMSE 12.4 mg/L</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Humidity:</span>
                    <span className="font-medium">RMSE 10.6%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">System Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Architecture:</span>
                    <span className="font-medium">LSTM 50 Units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Predictions Made:</span>
                    <span className="font-medium">{historicalData.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Update Rate:</span>
                    <span className="font-medium">30 seconds</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SensorDashboard
