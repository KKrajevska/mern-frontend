import styled from "@emotion/styled";
import { LocationT } from "lib/types";
import React, { FC, useEffect, useRef } from "react";

interface MapT {
  center: LocationT;
  zoom: number;
}

export const Map: FC<MapT> = ({ center, zoom }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const curr = mapRef.current;
    if (curr) {
      const map = new window.google.maps.Map(curr, {
        center: center,
        zoom: zoom,
      });

      new window.google.maps.Marker({ position: center, map: map });
    }
  }, [center, zoom]);

  return <MapWrap ref={mapRef}></MapWrap>;
};

const MapWrap = styled.div`
  width: 100%;
  height: 100%;
`;
