import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Droplets, Wind, Thermometer, MapPin, Search } from "lucide-react";

interface WeatherData {
  city: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

// Mock weather data since no API key is configured
const mockWeather: Record<string, WeatherData> = {
  "new york": { city: "New York", temp: 22, feelsLike: 20, humidity: 65, windSpeed: 12, description: "Partly Cloudy", icon: "⛅" },
  "london": { city: "London", temp: 15, feelsLike: 13, humidity: 78, windSpeed: 18, description: "Overcast", icon: "☁️" },
  "tokyo": { city: "Tokyo", temp: 28, feelsLike: 30, humidity: 72, windSpeed: 8, description: "Sunny", icon: "☀️" },
  "paris": { city: "Paris", temp: 18, feelsLike: 17, humidity: 60, windSpeed: 14, description: "Clear Sky", icon: "🌤️" },
  "sydney": { city: "Sydney", temp: 24, feelsLike: 23, humidity: 55, windSpeed: 20, description: "Windy", icon: "💨" },
  "dubai": { city: "Dubai", temp: 38, feelsLike: 42, humidity: 30, windSpeed: 10, description: "Hot & Sunny", icon: "🔥" },
  "moscow": { city: "Moscow", temp: 5, feelsLike: 1, humidity: 80, windSpeed: 22, description: "Snowy", icon: "❄️" },
  "mumbai": { city: "Mumbai", temp: 32, feelsLike: 36, humidity: 85, windSpeed: 6, description: "Humid", icon: "🌧️" },
};

const WeatherPage = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherData>(mockWeather["new york"]);

  const handleSearch = () => {
    const q = query.toLowerCase().trim();
    if (mockWeather[q]) {
      setWeather(mockWeather[q]);
    } else {
      // Generate random weather for unknown cities
      setWeather({
        city: query || "Unknown",
        temp: Math.floor(Math.random() * 35) + 5,
        feelsLike: Math.floor(Math.random() * 35) + 5,
        humidity: Math.floor(Math.random() * 60) + 30,
        windSpeed: Math.floor(Math.random() * 25) + 3,
        description: ["Sunny", "Cloudy", "Rainy", "Clear"][Math.floor(Math.random() * 4)],
        icon: ["☀️", "☁️", "🌧️", "🌤️"][Math.floor(Math.random() * 4)],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mesh p-4 md:p-8 pt-16 md:pt-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">Weather</h1>

        {/* Search */}
        <div className="glass-card p-4 mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search city (e.g. Tokyo, London, Paris)..."
                className="w-full bg-secondary rounded-lg pl-9 pr-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button onClick={handleSearch} className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Search className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Demo mode: Try New York, London, Tokyo, Paris, Sydney, Dubai, Moscow, Mumbai</p>
        </div>

        {/* Weather Card */}
        <div className="glass-card p-8 text-center mb-6">
          <p className="text-6xl mb-4">{weather.icon}</p>
          <h2 className="text-2xl font-bold text-foreground">{weather.city}</h2>
          <p className="text-muted-foreground mb-4">{weather.description}</p>
          <p className="text-6xl font-mono font-bold text-foreground mb-6">{weather.temp}°C</p>

          <div className="grid grid-cols-3 gap-4">
            <div className="glass-card p-3">
              <Thermometer className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-sm text-muted-foreground">Feels Like</p>
              <p className="font-semibold text-foreground">{weather.feelsLike}°C</p>
            </div>
            <div className="glass-card p-3">
              <Droplets className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-semibold text-foreground">{weather.humidity}%</p>
            </div>
            <div className="glass-card p-3">
              <Wind className="w-5 h-5 text-primary mx-auto mb-1" />
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-semibold text-foreground">{weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherPage;