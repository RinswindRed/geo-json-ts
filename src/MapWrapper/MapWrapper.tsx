import React from "react";
import { FeatureCollection, GeometryObject } from "geojson";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import APP_CONSTANTS from "../APP_CONSTANTS";

const { TILE_LAYER_URL } = APP_CONSTANTS;

const MapWrapper: React.FC<{
  position: [number, number];
  data: FeatureCollection<GeometryObject, any>;
}> = ({ position, data }) => {
  return (
    <MapContainer
      center={position}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "80vh" }}
    >
      <TileLayer url={TILE_LAYER_URL} />
      <GeoJSON data={data} />
    </MapContainer>
  );
};

export default MapWrapper;
