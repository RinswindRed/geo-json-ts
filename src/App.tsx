import React, { useEffect, useState, lazy, Suspense } from "react";
import { point, buffer, bbox } from "@turf/turf";
import osmtogeojson from "osmtogeojson";
import Loading from "./Loading/Loading";
import APP_CONSTANTS from "./APP_CONSTANTS";
import { FeatureCollection, GeometryObject } from "geojson";

const MapWrapper = lazy(() => import("./MapWrapper/MapWrapper"));
const Controls = lazy(() => import("./Controls/Controls"));

const {
  LATITUDE,
  LONGITUDE,
  BASE_MAP_URL,
  LAT_LNG,
  BBOX_COORDINATES: { LAT_MAX, LAT_MIN, LON_MAX, LON_MIN },
} = APP_CONSTANTS;

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [geoJson, setGeoJson] = useState<
    FeatureCollection<GeometryObject, any> | any
  >(null);
  const [searchBy, setSearchBy] = useState<string>("");
  const [position, setPosition] = useState<[number, number]>([
    -16.497919727905824, -151.741396396074,
  ]);

  const [latitude, setLatitude] = useState<number | string>("");
  const [longitude, setLongitude] = useState<number | string>("");
  const [lon_min, setLonMin] = useState<number | string>("");
  const [lat_min, setLatMin] = useState<number | string>("");
  const [lon_max, setLonMax] = useState<number | string>("");
  const [lat_max, setLatMax] = useState<number | string>("");

  useEffect(() => {
    getGeoJson(true);
  }, []);

  const getGeoJson = (isInitialCall: boolean) => {
    const lat = Number(isInitialCall ? position[0] : latitude);
    const lng = Number(isInitialCall ? position[1] : longitude);
    const lonMin = Number(lon_min);
    const latMin = Number(lat_min);
    const lonMax = Number(lon_max);
    const latMax = Number(lat_max);

    let validateBbox = lonMin && latMin && lonMin && latMax;
    let validateLngLat = lat && lng;

    if (validateLngLat || validateBbox || isInitialCall) {
      let url = "";
      setGeoJson(null);
      setLoading(true);
      setPosition([lat, lng]);

      // Added functionality to get bbox based on lan and lng
      // Because size and limit from API i limited area around centre on 0.5 km rectangle
      //  Turf is used to make bbox params from given lat,lng

      if (searchBy === LAT_LNG || isInitialCall) {
        const p = point([lng, lat]);
        const buff = buffer(p, 0.5, { units: "kilometers" });
        let bboxArr = bbox(buff);
        const [bb_lon_min, bb_lat_min, bb_lon_max, bb_lat_max] = bboxArr;
        url = `${BASE_MAP_URL}?bbox=${bb_lon_min},${bb_lat_min},${bb_lon_max},${bb_lat_max}`;
      } else {
        // center position on bbox params
        const lng = (lonMin + lonMax) / 2;
        const lat = (latMin + latMax) / 2;
        setPosition([lat, lng]);

        url = `${BASE_MAP_URL}?bbox=${lonMin},${latMin},${lonMax},${latMax}`;
      }

      (async () => {
        const parser = new DOMParser();
        let response = await fetch(url);
        const data = await response.text();
        const xmlDocument = parser.parseFromString(data, "text/xml");
        let geoJsonObject = osmtogeojson(xmlDocument);
        if (geoJsonObject) {
          setGeoJson(geoJsonObject);
          setLoading(false);
        }
      })();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    switch (name) {
      case LATITUDE:
        setLatitude(value);
        break;
      case LONGITUDE:
        setLongitude(value);
        break;
      case LAT_MAX:
        setLatMax(value);
        break;
      case LAT_MIN:
        setLatMin(value);
        break;
      case LON_MAX:
        setLonMax(value);
        break;
      case LON_MIN:
        setLonMin(value);
        break;
      default:
        break;
    }
  };

  const handleSelect = (option: string) => {
    // clear state on changing bbox/lat-long type method
    setLatitude("");
    setLongitude("");
    setLatMin("");
    setLatMax("");
    setLonMax("");
    setLonMin("");

    setSearchBy(option);
  };

  return (
    <>
      {loading && <Loading />}
      <Suspense fallback={<Loading />}>
        <Controls
          handleInput={handleInput}
          handleSelect={handleSelect}
          getGeoJson={getGeoJson}
          searchBy={searchBy}
        />
        {geoJson && <MapWrapper data={geoJson} position={position} />}
      </Suspense>
    </>
  );
};

export default App;
