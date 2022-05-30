import React from "react";
import APP_CONSTANTS from "../APP_CONSTANTS";
import "./ControlsStyle.css";

const {
  LATITUDE,
  LONGITUDE,
  SELECT_OPTIONS,
  LAT_LNG,
  BBOX,
  BBOX_COORDINATES: { LAT_MAX, LAT_MIN, LON_MAX, LON_MIN },
} = APP_CONSTANTS;

const Controls: React.FC<{
  searchBy: string;
  handleSelect: (option: string) => void;
  handleInput: (e: React.FormEvent<HTMLInputElement>) => void;
  getGeoJson: (isInitialCall: boolean) => void;
}> = ({ searchBy, handleSelect, handleInput, getGeoJson }) => {
  return (
    <div className="Wrapper">
      <div className="Logo-div">GJSON</div>
      <div className="Controls-container">
        <div className="Inputs-container">
          <div>
            <select
              className="Select-input"
              onChange={(e) => handleSelect(e.target.value)}
              value={searchBy}
              data-testid="searchBy"
            >
              <option disabled value="">
                Search by:
              </option>
              {SELECT_OPTIONS.map((opt, key) => {
                return (
                  <option key={key} value={opt.value} data-testid={opt.value}>
                    {opt.label}
                  </option>
                );
              })}
            </select>
            {searchBy === LAT_LNG && (
              <>
                <input
                  className="Text-input"
                  type="text"
                  placeholder={LATITUDE}
                  name={LATITUDE}
                  onChange={handleInput}
                />
                <input
                  className="Text-input"
                  type="text"
                  placeholder={LONGITUDE}
                  name={LONGITUDE}
                  onChange={handleInput}
                />
              </>
            )}
            {searchBy === BBOX && (
              <>
                <input
                  className="Text-input"
                  type="text"
                  placeholder={`Left: "${LON_MIN}"`}
                  name={LON_MIN}
                  onChange={handleInput}
                />
                <input
                  className="Text-input"
                  type="text"
                  placeholder={`Bottom: "${LAT_MIN}"`}
                  name={LAT_MIN}
                  onChange={handleInput}
                />
                <input
                  className="Text-input"
                  type="text"
                  placeholder={`Right: "${LON_MAX}"`}
                  name={LON_MAX}
                  onChange={handleInput}
                />
                <input
                  className="Text-input"
                  type="text"
                  placeholder={`Top: "${LAT_MAX}"`}
                  name={LAT_MAX}
                  onChange={handleInput}
                />
              </>
            )}
          </div>
          <div>
            <button
              className="Button-input"
              onClick={() => getGeoJson(false)}
              disabled={!searchBy}
              data-testid="getGeoJsonBtn"
            >
              Get GeoJson
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
