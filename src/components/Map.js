import React, { useEffect } from 'react';
import { Map as LeafletMap, TileLayer } from "react-leaflet";

import { showDataOnMap } from "../util";

function Map({ countries, casesType, center, zoom }) {
    return (
        <div className="map">
            {center ?.length > 0 && (
                <LeafletMap center={center} zoom={zoom} minZoom="2" maxZoom="4">
                    <TileLayer
                        attribution='©OpenStreetMap, ©CartoDB'
                        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
                    />
                    {showDataOnMap(countries, casesType)}
                </LeafletMap>
            )}
        </div>
    )
}

export default Map
