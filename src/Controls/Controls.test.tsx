import * as React from "react";
import APP_CONSTANTS from "../APP_CONSTANTS";
import { render, fireEvent } from "@testing-library/react";

import Controls from "./Controls";

const {
  LATITUDE,
  LONGITUDE,
  LAT_LNG,
  BBOX,
  BBOX_COORDINATES: { LAT_MAX, LAT_MIN, LON_MAX, LON_MIN },
} = APP_CONSTANTS;

const props = {
  searchBy: "",
  handleSelect: jest.fn(),
  handleInput: jest.fn(),
  getGeoJson: jest.fn(),
};

test("should render only select without inputs for bbox values and lat&lng", () => {
  const { container } = render(<Controls {...props} />);
  const select = container.getElementsByClassName("Select-input");
  const inputs = container.getElementsByClassName("Text-input");
  expect(select[0]).toBeInTheDocument();
  expect(inputs.length).toBe(0);
});

test("should simulates <select> on change options", () => {
  const mockProps = {
    searchBy: "",
    handleSelect: jest.fn(),
    handleInput: jest.fn(),
    getGeoJson: jest.fn(),
  };
  const { getByTestId } = render(<Controls {...mockProps} />);

  // call with BBox option
  fireEvent.change(getByTestId("searchBy"), {
    target: { value: BBOX },
  });
  expect(mockProps.handleSelect).toHaveBeenCalledTimes(1);
  expect(mockProps.handleSelect).toHaveBeenCalledWith(BBOX);

  // Call with Lat && lng option
  fireEvent.change(getByTestId("searchBy"), {
    target: { value: LAT_LNG },
  });
  expect(mockProps.handleSelect).toHaveBeenCalledTimes(2);
  expect(mockProps.handleSelect).toHaveBeenCalledWith(LAT_LNG);
});

test("should display BBox inputs: length = 4", () => {
  const mockProps = {
    searchBy: BBOX,
    handleSelect: jest.fn(),
    handleInput: jest.fn(),
    getGeoJson: jest.fn(),
  };
  const { container, getByPlaceholderText } = render(
    <Controls {...mockProps} />
  );

  const BboxInputs = container.getElementsByClassName("Text-input");
  const latMax = getByPlaceholderText(`Top: "${LAT_MAX}"`);
  const latMin = getByPlaceholderText(`Bottom: "${LAT_MIN}"`);
  const lonMin = getByPlaceholderText(`Left: "${LON_MIN}"`);
  const lonMax = getByPlaceholderText(`Right: "${LON_MAX}"`);

  expect(BboxInputs.length).toBe(4);
  expect(latMax).toBeInTheDocument();
  expect(latMin).toBeInTheDocument();
  expect(lonMin).toBeInTheDocument();
  expect(lonMax).toBeInTheDocument();
});

test("should display Lat && Lng inputs: length = 2", () => {
  const mockProps = {
    searchBy: LAT_LNG,
    handleSelect: jest.fn(),
    handleInput: jest.fn(),
    getGeoJson: jest.fn(),
  };
  const { container, getByPlaceholderText } = render(
    <Controls {...mockProps} />
  );

  const Inputs = container.getElementsByClassName("Text-input");
  const lat = getByPlaceholderText(LATITUDE);
  const lng = getByPlaceholderText(LONGITUDE);

  expect(Inputs.length).toBe(2);
  expect(lat).toBeInTheDocument();
  expect(lng).toBeInTheDocument();
});

test('should check for disabled click on Get GeoJson button: searchBy = "" ', () => {
  const mockProps = {
    searchBy: "",
    handleSelect: jest.fn(),
    handleInput: jest.fn(),
    getGeoJson: jest.fn(),
  };
  const { getByTestId } = render(<Controls {...mockProps} />);

  const GetGJsonBtn = getByTestId("getGeoJsonBtn");
  expect(GetGJsonBtn).toHaveAttribute("disabled");
});

test("should call getJson() if provided lat&&lng: lat=Number, lng=Number", () => {
  const mockProps = {
    searchBy: LAT_LNG,
    handleSelect: jest.fn(),
    handleInput: jest.fn(),
    getGeoJson: jest.fn(),
  };

  const { getByPlaceholderText, getByTestId } = render(
    <Controls {...mockProps} />
  );

  const LatInput = getByPlaceholderText(LATITUDE);
  const LngInput = getByPlaceholderText(LONGITUDE);
  const GetGJsonBtn = getByTestId("getGeoJsonBtn");

  fireEvent.change(LatInput, { target: { value: 32.546464 } });
  fireEvent.change(LngInput, { target: { value: 32.546464 } });
  fireEvent.click(GetGJsonBtn);

  expect(mockProps.handleInput).toHaveBeenCalledTimes(2);
  expect(mockProps.getGeoJson).toHaveBeenCalledTimes(1);
});

test("should call getJson() if provided bbox params: lat_min=Number, lng_min=Number, lat_max=Number, lng_max=Number", () => {
  const mockProps = {
    searchBy: BBOX,
    handleSelect: jest.fn(),
    handleInput: jest.fn(),
    getGeoJson: jest.fn(),
  };

  const { getByPlaceholderText, getByTestId } = render(
    <Controls {...mockProps} />
  );

  const latMax = getByPlaceholderText(`Top: "${LAT_MAX}"`);
  const latMin = getByPlaceholderText(`Bottom: "${LAT_MIN}"`);
  const lonMin = getByPlaceholderText(`Left: "${LON_MIN}"`);
  const lonMax = getByPlaceholderText(`Right: "${LON_MAX}"`);
  const GetGJsonBtn = getByTestId("getGeoJsonBtn");

  fireEvent.change(latMax, { target: { value: 32.546464 } });
  fireEvent.change(latMin, { target: { value: 32.546464 } });
  fireEvent.change(lonMin, { target: { value: 12.546464 } });
  fireEvent.change(lonMax, { target: { value: -22.546464 } });
  fireEvent.click(GetGJsonBtn);

  expect(mockProps.handleInput).toHaveBeenCalledTimes(4);
  expect(mockProps.getGeoJson).toHaveBeenCalledTimes(1);
});
