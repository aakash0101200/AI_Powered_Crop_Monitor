import React from 'react';

const CropHealth = ({ cropHealth, loading }) => {
  if (!cropHealth) return null;

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
        <span className="text-2xl">🌾</span>
        Hyperspectral Crop Health Analysis
        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full ml-2">
          {cropHealth.modelAccuracy}% Accuracy
        </span>
      </h2>
      
      {loading ? (
        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500"></div>
            <span className="text-gray-600 italic">🔬 Analyzing spectral signatures...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Health Score */}
          <div className="bg-white rounded-lg p-6 border-l-4 border-green-500">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              📊 Health Score
            </h3>
            <div className="flex items-center gap-4">
              <div className={`text-4xl font-bold px-4 py-2 rounded-lg ${
                cropHealth.healthScore >= 80 ? 'bg-green-100 text-green-800' :
                cropHealth.healthScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {cropHealth.healthScore}%
              </div>
              <div>
                <div className="font-semibold">{cropHealth.healthStatus}</div>
                <div className="text-sm text-gray-600">Risk: {cropHealth.riskLevel}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Class {cropHealth.predictedClass}/3 | Random Forest
                </div>
              </div>
            </div>
          </div>

          {/* Model Info */}
          <div className="bg-white rounded-lg p-6 border-l-4 border-blue-500">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              🧠 Model Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Algorithm:</span>
                <span className="font-medium">Random Forest</span>
              </div>
              <div className="flex justify-between">
                <span>Features:</span>
                <span className="font-medium">202 total</span>
              </div>
              <div className="flex justify-between">
                <span>Accuracy:</span>
                <span className="font-bold text-green-600">{cropHealth.modelAccuracy}%</span>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="bg-white rounded-lg p-6 border-l-4 border-orange-500">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              💡 Key Insights
            </h3>
            <div className="space-y-2">
              {cropHealth.insights && cropHealth.insights.map((insight, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-orange-500 mt-1">•</span>
                  <span className="text-gray-700">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropHealth;
