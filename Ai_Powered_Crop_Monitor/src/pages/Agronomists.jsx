import React, { useState } from "react";

function Agronomists() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);

  const indices = [
    { name: "NDVI", description: "Normalized Difference Vegetation Index", image: "/ndvi_colorful.png" },
    { name: "VC", description: "vegetation classification", image: "/crop_class_colorful.png" },
    { name: "ARVI", description: "Atmospheric Resistance Vegetation Index", image: "/arvi_colorful.png" },
    { name: "TCARI", description: "Transformed Chlorophyll Absorption Ratio Index", image: "/tcari_colorful.png" },
   
  ];

  const processIndices = async () => {
    setIsProcessing(true);
    setResults(null);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 4500));

    setResults(indices);
    setIsProcessing(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Agronomists</h1>
      <p className="text-gray-600 mb-6">Advanced crop analytics and spectral indices analysis for agronomists.</p>

      <div className="mb-8">
        <button
          onClick={processIndices}
          disabled={isProcessing}
          className="px-6 py-3 rounded-lg border border-white/20 bg-[var(--sidebar-bg)] text-[var(--text-color)] hover:border-white/40 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Processing Spectral Indices..." : "Generate Spectral Analysis"}
        </button>
      </div>

      {isProcessing && (
        <div className="mb-8 p-6 rounded-lg border border-white/20 bg-[var(--sidebar-bg)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="animate-spin w-5 h-5 border-2 border-[var(--primary-color)] border-t-transparent rounded-full"></div>
            <span className="text-[var(--text-color)]">Analyzing satellite imagery and calculating vegetation indices...</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-[var(--primary-color)] h-2 rounded-full animate-pulse" style={{ width: "75%" }}></div>
          </div>
        </div>
      )}

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((index, i) => (
            <div key={index.name} className="card p-4">
              <div className="aspect-video mb-3 rounded-lg overflow-hidden bg-gray-800">
                <img
                  src={index.image}
                  alt={`${index.name} visualization`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg mb-1">{index.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{index.description}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Area: 2.4 km²</span>
                <span>Confidence: 94.2%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Agronomists;


