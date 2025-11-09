import { useState, useEffect } from "react";
import { NavigationBar } from "@/components/NavigationBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Wind, Droplets, Sun, Activity } from "lucide-react";
import { toast } from "sonner";

interface ClimateData {
  temperature: number;
  humidity: number;
  uvIndex: number;
  pm25: number;
  pm10: number;
  aqi: number;
  co: number;
  no2: number;
  so2: number;
  o3: number;
}

const ClimateData = () => {
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const [climateData, setClimateData] = useState<ClimateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState("");

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
        fetchClimateData(latitude, longitude);
        fetchLocationName(latitude, longitude);
      },
      (error) => {
        toast.error("Unable to retrieve your location");
        setLoading(false);
      }
    );
  };

  const searchLocation = async () => {
    if (!location.trim()) {
      toast.error("Please enter a location");
      return;
    }

    setLoading(true);
    try {
      // Use Open-Meteo's geocoding API
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
      );
      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        toast.error("Location not found");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name, country } = geoData.results[0];
      setCoords({ lat: latitude, lon: longitude });
      setLocationName(`${name}, ${country}`);
      fetchClimateData(latitude, longitude);
    } catch (error) {
      toast.error("Error searching location");
      setLoading(false);
    }
  };

  const fetchLocationName = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?latitude=${lat}&longitude=${lon}&count=1&language=en&format=json`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        const { name, country } = data.results[0];
        setLocationName(`${name}, ${country}`);
      }
    } catch (error) {
      console.error("Error fetching location name:", error);
    }
  };

  const fetchClimateData = async (lat: number, lon: number) => {
    try {
      // Fetch weather data
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,uv_index&timezone=auto`
      );
      const weatherData = await weatherResponse.json();

      // Fetch air quality data
      const airQualityResponse = await fetch(
        `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi`
      );
      const airQualityData = await airQualityResponse.json();

      setClimateData({
        temperature: weatherData.current.temperature_2m,
        humidity: weatherData.current.relative_humidity_2m,
        uvIndex: weatherData.current.uv_index || 0,
        pm25: airQualityData.current.pm2_5,
        pm10: airQualityData.current.pm10,
        aqi: airQualityData.current.us_aqi,
        co: airQualityData.current.carbon_monoxide,
        no2: airQualityData.current.nitrogen_dioxide,
        so2: airQualityData.current.sulphur_dioxide,
        o3: airQualityData.current.ozone,
      });

      setLoading(false);
    } catch (error) {
      toast.error("Error fetching climate data");
      setLoading(false);
    }
  };

  const getAQILevel = (aqi: number) => {
    if (aqi <= 50) return { label: "Good", color: "text-green-600" };
    if (aqi <= 100) return { label: "Moderate", color: "text-yellow-600" };
    if (aqi <= 150) return { label: "Unhealthy for Sensitive Groups", color: "text-orange-600" };
    if (aqi <= 200) return { label: "Unhealthy", color: "text-red-600" };
    if (aqi <= 300) return { label: "Very Unhealthy", color: "text-purple-600" };
    return { label: "Hazardous", color: "text-red-900" };
  };

  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { label: "Low", color: "text-green-600" };
    if (uv <= 5) return { label: "Moderate", color: "text-yellow-600" };
    if (uv <= 7) return { label: "High", color: "text-orange-600" };
    if (uv <= 10) return { label: "Very High", color: "text-red-600" };
    return { label: "Extreme", color: "text-purple-600" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <NavigationBar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Climate Data Monitor
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            Real-time climate and air quality data for your location
          </p>

          <Card className="p-6 mb-8 bg-card/50 backdrop-blur">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter city name..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && searchLocation()}
                  className="h-12"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={searchLocation} disabled={loading} className="h-12 gap-2">
                  <MapPin className="w-4 h-4" />
                  Search
                </Button>
                <Button onClick={getCurrentLocation} disabled={loading} variant="outline" className="h-12 gap-2">
                  <Navigation className="w-4 h-4" />
                  Use My Location
                </Button>
              </div>
            </div>
          </Card>

          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading climate data...</p>
            </div>
          )}

          {climateData && !loading && (
            <div className="space-y-6">
              {locationName && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                    <MapPin className="w-6 h-6 text-primary" />
                    {locationName}
                  </h2>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-lg">
                      <Sun className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Temperature</h3>
                  </div>
                  <p className="text-4xl font-bold text-foreground">{climateData.temperature}°C</p>
                  <p className="text-sm text-muted-foreground mt-2">Humidity: {climateData.humidity}%</p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-600/10 border-yellow-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-yellow-500/20 rounded-lg">
                      <Sun className="w-6 h-6 text-yellow-600" />
                    </div>
                    <h3 className="text-lg font-semibold">UV Index</h3>
                  </div>
                  <p className="text-4xl font-bold text-foreground">{climateData.uvIndex}</p>
                  <p className={`text-sm font-semibold mt-2 ${getUVLevel(climateData.uvIndex).color}`}>
                    {getUVLevel(climateData.uvIndex).label}
                  </p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-purple-500/20 rounded-lg">
                      <Activity className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold">Air Quality Index</h3>
                  </div>
                  <p className="text-4xl font-bold text-foreground">{climateData.aqi}</p>
                  <p className={`text-sm font-semibold mt-2 ${getAQILevel(climateData.aqi).color}`}>
                    {getAQILevel(climateData.aqi).label}
                  </p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-gray-500/10 to-gray-600/10 border-gray-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gray-500/20 rounded-lg">
                      <Wind className="w-6 h-6 text-gray-600" />
                    </div>
                    <h3 className="text-lg font-semibold">PM2.5</h3>
                  </div>
                  <p className="text-4xl font-bold text-foreground">{climateData.pm25.toFixed(1)}</p>
                  <p className="text-sm text-muted-foreground mt-2">μg/m³</p>
                </Card>
              </div>

              <Card className="p-6 bg-card/50 backdrop-blur">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-primary" />
                  Detailed Pollutants
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">PM10</p>
                    <p className="text-2xl font-bold text-foreground">{climateData.pm10.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">μg/m³</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Carbon Monoxide</p>
                    <p className="text-2xl font-bold text-foreground">{climateData.co.toFixed(0)}</p>
                    <p className="text-xs text-muted-foreground">μg/m³</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nitrogen Dioxide</p>
                    <p className="text-2xl font-bold text-foreground">{climateData.no2.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">μg/m³</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sulphur Dioxide</p>
                    <p className="text-2xl font-bold text-foreground">{climateData.so2.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">μg/m³</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ozone</p>
                    <p className="text-2xl font-bold text-foreground">{climateData.o3.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">μg/m³</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-primary/5 border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> CO₂ levels are typically measured globally rather than locally. 
                  The pollutants shown above (CO, NO₂, SO₂, O₃) are the primary contributors to local air quality.
                  Data provided by Open-Meteo Weather API.
                </p>
              </Card>
            </div>
          )}

          {!climateData && !loading && (
            <Card className="p-12 text-center bg-card/50 backdrop-blur">
              <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Location Selected</h3>
              <p className="text-muted-foreground">
                Search for a city or use your current location to view climate data
              </p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClimateData;
