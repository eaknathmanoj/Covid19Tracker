import React, { useState, useEffect } from 'react';
import {
  FormControl,
  Menu,
  MenuItem,
  Select,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import CountryTable from './components/CountryTable';
import { sortData, prettyPrintStat } from './util';
import LineGraph from './components/LineGraph';
import DonutChart from './components/DonutChart';
import LocationHeader from './components/LocationHeader';
import CountryStats from './components/CountryStats'
import Footer from './components/Footer'
import './style/App.css';
import './style/Map.css';
import "leaflet/dist/leaflet.css";
import IconButton from '@material-ui/core/IconButton';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Tooltip from '@material-ui/core/Tooltip';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import titleImage from './images/title.png'
const useStyles = makeStyles((theme) => ({

}));

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState([35.482578, 0.769556]);
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("active");
  const [cumulativeButton, setCumulativeButton] = useState("default");
  const [dailyButton, setDailyButton] = useState("primary");
  const [dataType, setDataType] = useState("daily");
  const [anchorEl, setAnchorEl] = useState(null);
  const [timeline, setTimeline] = useState("Last 3 months");

  const timelineOptions = [
    'Last 7 days',
    'Last 30 days',
    'Last 3 months',
    'Last 6 months',
    'From the beginning'
  ]
  const classes = useStyles();


  //onInit
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
      })
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }))
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    setCountry(countryCode);
    setMapCenter([]);
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountryInfo(data);
        if (countryCode === 'worldwide') {
          setMapCenter([35.482578, 0.769556]);
          setMapZoom(2);
        }
        else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        }
      })
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setTimeline(e.target.innerText);
    setAnchorEl(null);
  };

  return (
    <div >
      <div className="app">
        <div className="app_left">
          <div className="app_header">
            <img className="titleImage" src={titleImage} alt="logo" />
            <FormControl >
              <Select variant="outlined" onChange={onCountryChange} value={country}>
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}> {country.name} </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <div className="dataSwticher animate__animated animate__fadeIn">
              <div className="timeline">
                <Tooltip title="Timeline" arrow>
                  <IconButton color="secondary" onClick={handleClick}>
                    <AccessTimeIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {timelineOptions.map((option) => (
                    <MenuItem key={option} selected={option === timeline} onClick={handleClose}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
              <div>
                <Tooltip title="Cumulative Data" arrow>
                  <IconButton color={cumulativeButton} onClick={() => {
                    setDataType("cumulative");
                    setCumulativeButton("primary");
                    setDailyButton("default");
                  }}>
                    <SignalCellularAltIcon />
                  </IconButton>
                </Tooltip>
              </div>
              <div>
                <Tooltip title="Daily Data" arrow>
                  <IconButton color={dailyButton} onClick={() => {
                    setDataType("daily");
                    setCumulativeButton("default");
                    setDailyButton("primary");
                  }}>
                    <DateRangeIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className="app_stats">
              <div>
                <InfoBox
                  title="Confirmed"
                  cases={prettyPrintStat(countryInfo.todayCases)}
                  total={countryInfo.cases}
                  onClick={(e) => setCasesType('cases')}
                  active={casesType === "cases"}
                  color="red"
                />
                <LineGraph classType="app__graph" casesType="cases" country={country} dataType={dataType} timeline={timeline} />
              </div>
              <div>
                <InfoBox
                  title="Active"
                  cases=""
                  total={countryInfo.active}
                  onClick={(e) => setCasesType('active')}
                  active={casesType === "active"}
                  color="blue"
                />
                <LineGraph classType="app__graph" casesType="active" country={country} dataType={dataType} timeline={timeline} />
              </div>
              <div>
                <InfoBox
                  title="Recovered"
                  cases={prettyPrintStat(countryInfo.todayRecovered)}
                  total={countryInfo.recovered}
                  onClick={(e) => setCasesType('recovered')}
                  active={casesType === "recovered"}
                  color="green"
                />
                <LineGraph classType="app__graph" casesType="recovered" country={country} dataType={dataType} timeline={timeline} />
              </div>
              <div>
                <InfoBox
                  title="Deaths"
                  cases={prettyPrintStat(countryInfo.todayDeaths)}
                  total={countryInfo.deaths}
                  onClick={(e) => setCasesType('deaths')}
                  active={casesType === "deaths"}
                  color="grey"
                />
                <LineGraph classType="app__graph" casesType="deaths" country={country} dataType={dataType} timeline={timeline} />
              </div>
            </div>
          </div>
          <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
          <CountryTable countries={tableData} />
        </div>
        <div className="app_right">
          <LocationHeader countryInfo={countryInfo} />
          <DonutChart confirmed={countryInfo.cases} active={countryInfo.active} recovered={countryInfo.recovered} deaths={countryInfo.deaths} />
          <CountryStats countryInfo={countryInfo} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;