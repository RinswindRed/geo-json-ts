import * as React from "react";
import { render, waitFor } from "@testing-library/react";

import MapWrapper from "./MapWrapper";

test("should render only if data passed", async () => {
  const mockProps = {
    position: [12, 16] as [number, number],
    data: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [125.6, 10.1],
      },
      properties: {
        name: "Dinagat Islands",
      },
    } as any,
  };

  const { container } = render(<MapWrapper {...mockProps} />);
  const MapContainer = container.getElementsByClassName("leaflet-container");

  // To resolve wrap in act warning
  await waitFor(() => {
    expect(MapContainer[0]).toBeDefined();
  });
});
