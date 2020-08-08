import React, { useState, useEffect } from 'react'
import {
    Card,
    CardContent
} from '@material-ui/core';
import CountryStatsCard from './CountryStatsCard';
import numeral from "numeral";

function CountryStats({ countryInfo }) {
    const [growthRateValue, setGrowthRate] = useState("0");
    const statsValues = {
        confirmedPerMillionValue: Math.round(((countryInfo.cases / countryInfo.population) * 1000000) * 10) / 10,
        activeRatioValue: Math.round(((countryInfo.active / countryInfo.cases) * 100) * 10) / 10,
        recoveryRatioValue: Math.round(((countryInfo.recovered / countryInfo.cases) * 100) * 10) / 10,
        caseFatalityRatioValue: Math.round(((countryInfo.deaths / countryInfo.cases) * 100) * 10) / 10,
        testsPerMillionValue: Math.round(((countryInfo.tests / countryInfo.population) * 1000000) * 10) / 10,
        countryName: countryInfo.country ? `in ${countryInfo.country}` : "across Worldwide"
    }
    const confirmedPerMillion = {
        cardHeader: "Confirmed Per Million",
        value: `${statsValues.confirmedPerMillionValue}`,
        description: `~${Math.round(statsValues.confirmedPerMillionValue)} out of every 1 million people ${statsValues.countryName} have tested positive for the virus.`
    }
    const activeRatio = {
        cardHeader: "Active Ratio",
        value: `${statsValues.activeRatioValue}%`,
        description: `For every 100 confirmed cases, ~${Math.round(statsValues.activeRatioValue)} are currently infected.`
    }
    const recoveryRatio = {
        cardHeader: "Recovery Ratio",
        value: `${statsValues.recoveryRatioValue}%`,
        description: `For every 100 confirmed cases, ~${Math.round(statsValues.recoveryRatioValue)} have recovered from the virus.`
    }
    const caseFatalityRatio = {
        cardHeader: "Case Fatality Ratio",
        value: `${statsValues.caseFatalityRatioValue}%`,
        description: `For every 100 confirmed cases, ~${Math.round(statsValues.caseFatalityRatioValue)} have unfortunately passed away from the virus.`
    }
    const growthRate = {
        cardHeader: "Avg. Growth Rate",
        value: `${growthRateValue}%`,
        description: `In the last one week, the number of new infections has grown by an average of ${growthRateValue}% every day.`
    }
    const testsPerMillion = {
        cardHeader: "Tests Per Million",
        value: statsValues.testsPerMillionValue,
        description: `For every 1 million people ${statsValues.countryName}, ~${Math.round(statsValues.testsPerMillionValue)} samples were tested.`
    }

    function calculateGrowthRate(data) {

        data = data ?.cases ? data ?.cases : data ?.timeline ?.cases;
        if (!data) return;
        let arr = Object.values(data);
        let min = Math.min(...arr);
        let max = Math.max(...arr);
        let value = Math.round(((((max - min) / max) * 100) / 7) * 10) / 10;
        setGrowthRate(value);
    };
    useEffect(() => {
        const url = countryInfo.country ? `https://disease.sh/v3/covid-19/historical/${countryInfo.country}?lastdays=7` : 'https://disease.sh/v3/covid-19/historical/all?lastdays=7'
        const fetchData = async () => {
            await fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    calculateGrowthRate(data);
                })
        }
        fetchData();
    }, [countryInfo])
    return (
        <Card className="stats">
            <CardContent>
                <div className="statsPopulation">
                    <h4 className="statsPopulationHeader">Population</h4>
                    <h3 className="populationValue animate__animated animate__fadeIn">{numeral(countryInfo.population).format("0,0")}</h3>
                </div>
                <CountryStatsCard cardHeader={confirmedPerMillion.cardHeader} value={confirmedPerMillion.value} description={confirmedPerMillion.description} cardColor="red" />
                <CountryStatsCard cardHeader={activeRatio.cardHeader} value={activeRatio.value} description={activeRatio.description} cardColor="blue" />
                <CountryStatsCard cardHeader={recoveryRatio.cardHeader} value={recoveryRatio.value} description={recoveryRatio.description} cardColor="green" />
                <CountryStatsCard cardHeader={caseFatalityRatio.cardHeader} value={caseFatalityRatio.value} description={caseFatalityRatio.description} cardColor="grey" />
                <CountryStatsCard cardHeader={growthRate.cardHeader} value={growthRate.value} description={growthRate.description} cardColor="brown" />
                <CountryStatsCard cardHeader={testsPerMillion.cardHeader} value={testsPerMillion.value} description={testsPerMillion.description} cardColor="violet" />
            </CardContent>
        </Card>
    )
}

export default CountryStats
