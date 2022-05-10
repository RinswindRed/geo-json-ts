export default {
    BASE_MAP_URL: "https://www.openstreetmap.org/api/0.6/map",
    TILE_LAYER_URL: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    LATITUDE: "latitude",
    LONGITUDE: "longitude",
    KILOMETERS_UNIT: "kilometers",
    LAT_LNG: "latLng",
    BBOX: "bbox",
    SELECT_OPTIONS: [
      {
        label: "Lat && Lng",
        value: "latLng",
      },
      {
        label: "Bbox coordinates",
        value: "bbox",
      },
    ],
    BBOX_COORDINATES: {
      LON_MIN: "lon_min",
      LAT_MIN: "lat_min",
      LON_MAX: "lon_max",
      LAT_MAX: "lat_max",
    },
  };
  