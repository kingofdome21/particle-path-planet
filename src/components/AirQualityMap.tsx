import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface AirQualityMapProps {
  lat: number;
  lon: number;
  locationName: string;
  aqi: number;
}

// Component to update map center when coordinates change
const MapUpdater = ({ lat, lon }: { lat: number; lon: number }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([lat, lon], 10);
  }, [lat, lon, map]);
  
  return null;
};

// Create custom marker icon based on AQI level
const getMarkerIcon = (aqi: number) => {
  let color = "#22c55e"; // green
  if (aqi > 50 && aqi <= 100) color = "#eab308"; // yellow
  if (aqi > 100 && aqi <= 150) color = "#f97316"; // orange
  if (aqi > 150 && aqi <= 200) color = "#ef4444"; // red
  if (aqi > 200 && aqi <= 300) color = "#a855f7"; // purple
  if (aqi > 300) color = "#7f1d1d"; // dark red

  const svgIcon = `
    <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.375 12.5 28.125 12.5 28.125S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0z" fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="12.5" cy="12.5" r="5" fill="white"/>
    </svg>
  `;

  return L.divIcon({
    html: svgIcon,
    className: "custom-marker",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });
};

const getAQILabel = (aqi: number) => {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
};

export const AirQualityMap = ({ lat, lon, locationName, aqi }: AirQualityMapProps) => {
  return (
    <div className="h-[300px] w-full rounded-lg overflow-hidden border border-border">
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater lat={lat} lon={lon} />
        <Marker position={[lat, lon]} icon={getMarkerIcon(aqi)}>
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-lg mb-1">{locationName}</h3>
              <p className="text-sm">
                <strong>AQI:</strong> {aqi} - {getAQILabel(aqi)}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
