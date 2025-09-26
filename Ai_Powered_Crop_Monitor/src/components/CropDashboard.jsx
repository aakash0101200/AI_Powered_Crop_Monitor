import React, { useState, useMemo } from 'react';
import axios from 'axios';

// A simple spinner icon component
const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default function CropDashboard() {
  // --- STATE MANAGEMENT ---
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // --- EVENT HANDLERS ---
  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null); // Reset previous results
      setError(''); // Reset previous errors
    }
  };

  const uploadAndAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const resp = await axios.post(
        'http://localhost:8080/api/cube/analyze',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      setResult(resp.data);
    } catch (err) {
      // Provide a more user-friendly error message
      const errorMessage =
        err.response?.data?.error ||
        'An unexpected error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  // Memoize the image list to prevent re-calculation on every render
  const analysisImages = useMemo(() => {
    if (!result) return [];
    const images = Object.entries(result.indexFiles || {});
    if (result.stressFile) {
      images.push(['Stress Classification', result.stressFile]);
    }
    return images;
  }, [result]);


  // --- JSX RENDERING ---
  return (
    <div className="bg-gray-900 min-h-screen text-gray-200 p-4 mt-20 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400">
            Hyperspectral Analysis Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Upload a `.mat` or `.hdr` file to analyze crop health and stress levels.
          </p>
        </header>

        {/* --- UPLOAD SECTION --- */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col sm:flex-row items-center justify-center gap-4">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
          >
            Select File
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".mat,.hdr"
            onChange={handleFileChange}
            className="hidden"
          />
          {file && <span className="text-gray-400">{file.name}</span>}
          <button
            onClick={uploadAndAnalyze}
            disabled={!file || loading}
            className="inline-flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-md transition-colors duration-300"
          >
            {loading && <Spinner />}
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        {/* --- ERROR DISPLAY --- */}
        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg text-center">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* --- RESULTS DISPLAY --- */}
        {result && (
          <div className="mt-8">
            {/* Analysis Images */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
                Analysis Images
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {analysisImages.map(([name, url]) => (
                  <div
                    key={name}
                    className="bg-gray-800 p-3 rounded-lg shadow-md text-center"
                  >
                    <img
                      src={`http://localhost:8080/${url}`}
                      alt={`${name} map`}
                      className="w-full h-auto object-cover rounded-md"
                    />
                    <div className="mt-2 text-sm font-semibold text-gray-400">
                      {name.replace(/([A-Z])/g, ' $1').trim()} 
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Statistics */}
            <section className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-cyan-300">
                Analysis Statistics
              </h2>
              <pre className="bg-gray-800 p-4 rounded-lg text-sm text-green-300 overflow-x-auto">
                {JSON.stringify(result.statistics, null, 2)}
              </pre>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}