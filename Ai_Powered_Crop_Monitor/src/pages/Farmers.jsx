import React, { useState } from "react";
import axios from "axios";

function Farmers() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);

  async function fetchWeather(lat, lon) {
    try {
      setLoading(true);
      setError("");
      // Open-Meteo: no API key required, fast and free
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&hourly=temperature_2m,precipitation_probability&timezone=auto`;
      const { data } = await axios.get(url);
      setWeather({
        temperature: data?.current?.temperature_2m,
        humidity: data?.current?.relative_humidity_2m,
        wind: data?.current?.wind_speed_10m,
        precipitation: data?.current?.precipitation,
        code: data?.current?.weather_code,
      });
    } catch (e) {
      setError("Failed to fetch weather. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function useMyLocation() {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by this browser.");
      return;
    }
    setError("");
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
        fetchWeather(latitude, longitude);
      },
      () => {
        setLoading(false);
        setError("Location permission denied or unavailable.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Farmers</h1>
      <p className="text-gray-600 mb-6">Get location-aware weather to plan field operations.</p>

      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={useMyLocation}
          className="px-4 py-2 rounded-lg border border-white/20 bg-[var(--sidebar-bg)] text-[var(--text-color)] hover:border-white/40 transition"
          disabled={loading}
        >
          {loading ? "Getting location…" : "Use my location"}
        </button>
        {coords && (
          <span className="text-sm text-gray-400">
            {coords.latitude.toFixed(3)}, {coords.longitude.toFixed(3)}
          </span>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-400/40 bg-red-500/10 text-red-200 p-3">
          {error}
        </div>
      )}

      {weather && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="card p-4">
            <div className="text-xs text-gray-400">Temp</div>
            <div className="text-xl font-semibold">{weather.temperature}°C</div>
          </div>
          <div className="card p-4">
            <div className="text-xs text-gray-400">Humidity</div>
            <div className="text-xl font-semibold">{weather.humidity}%</div>
          </div>
          <div className="card p-4">
            <div className="text-xs text-gray-400">Wind</div>
            <div className="text-xl font-semibold">{weather.wind} m/s</div>
          </div>
          <div className="card p-4">
            <div className="text-xs text-gray-400">Precip</div>
            <div className="text-xl font-semibold">{weather.precipitation} mm</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Farmers;


