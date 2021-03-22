import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

export const casesTypeColors = {
  cases: {
    hex: "#e23028",
    rgb: "rgb(226, 48, 40)",
    graphColor: "rgba(226, 48, 40, 0.5)",
    multiplier: 200,
  },
  active: {
    hex: "#4c75f2",
    rgb: "rgb(76, 117, 242)",
    graphColor: "rgba(76, 117, 242, 0.5)",
    multiplier: 500,
  },
  recovered: {
    hex: "#28a745",
    rgb: "rgb(40, 167, 69)",
    graphColor: "rgba(40, 167, 69, 0.5)",
    multiplier: 200,
  },
  deaths: {
    hex: "#6c757d",
    rgb: "rgb(108, 117, 125)",
    graphColor: "rgba(108, 117, 125, 0.5)",
    multiplier: 1000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

//Draws circles on the map
export const showDataOnMap = (data, casesType = "cases") =>
  data.length > 0 &&
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier ||
        1
      }
    >
      <Popup>
        <div className="info-container">
          <div
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            className="info-flag"
          ></div>
          <div className="info-name">
            <h4>{country.country}</h4>
          </div>
          <div className="info-confirmed">
            <h5>Cases: {numeral(country.cases).format("0,0")}</h5>
          </div>
          <div className="info-active">
            <h5>Active: {numeral(country.active).format("0,0")}</h5>
          </div>
          <div className="info-recovered">
            <h5>Recovered: {numeral(country.recovered).format("0,0")}</h5>
          </div>
          <div className="info-deaths">
            <h5>Deaths: {numeral(country.deaths).format("0,0")}</h5>
          </div>
        </div>
      </Popup>
    </Circle>
  ));

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0,0")}` : "+0";

const numberFormatter = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 1,
});

export const formatNumber = (value, option) => {
  if (isNaN(value)) return "-";
  else if (option === "int") {
    value = Math.floor(value);
  }
  return numberFormatter.format(value) + (option === "%" ? "%" : "");
};

export const buildActiveCases = (data) => {
  data = data?.timeline ? data?.timeline : data;
  data["active"] = {};
  for (let date in data["cases"]) {
    const active =
      data["cases"][date] - data["recovered"][date] - data["deaths"][date];
    if (active) data["active"][date] = active;
  }
  return data;
};
