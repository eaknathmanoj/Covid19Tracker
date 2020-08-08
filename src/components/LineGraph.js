import React, { useState, useEffect } from 'react';
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { casesTypeColors, buildActiveCases } from "../util";
import '../style/LineGraph.css'

const timelineOptions = {
    "Last 7 days": {
        "days": "7",
        "unit": "day"
    },
    "Last 30 days": {
        "days": "30",
        "unit": "week"
    },
    "Last 3 months": {
        "days": "90",
        "unit": "month"
    },
    "Last 6 months": {
        "days": "180",
        "unit": "month"
    },
    "From the beginning": {
        "days": "365",
        "unit": "month"
    }
}


function LineGraph({ casesType = "cases", country, dataType, timeline }) {

    const options = {
        legend: {
            display: false,
        },
        elements: {
            point: {
                radius: 0
            }
        },
        maintainAspectRatio: false,
        tooltips: {
            mode: "index",
            intersect: false,
            callbacks: {
                label: function (tooltipItem) {
                    return numeral(tooltipItem.value).format("0,0");
                }
            }
        },
        scales: {
            xAxes: [
                {
                    gridLines: {
                        display: true
                    },
                    type: "time",
                    time: {
                        format: "MM/DD/YY",
                        tooltipFormat: "ll",
                        unit: timelineOptions[timeline] ?.unit
                    }
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        callback: function (value) {
                            return numeral(value).format("0a");
                        }
                    }
                }
            ]
        }
    };
    const [data, setData] = useState({});
    useEffect(() => {
        if (!timelineOptions[timeline])
            return;
        const days = timelineOptions[timeline]["days"];
        const url = country === 'worldwide' ? `https://disease.sh/v3/covid-19/historical/all?lastdays=${days}` : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=${days}`;
        const fetchData = async () => {
            await fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    data = buildActiveCases(data);
                    const chartData = buildChartData(data, casesType, dataType);
                    setData(chartData);
                })
        }
        fetchData();
    }, [country, dataType, timeline]);

    const buildChartData = (data, casesType, dataType) => {
        const chartData = [];
        if (dataType == "cumulative") {
            for (let date in data[casesType]) {
                const newDataPoint = {
                    x: date,
                    y: data[casesType][date]
                }
                chartData.push(newDataPoint);
            }
        }
        else if (dataType == "daily") {
            let lastDataPoint;
            for (let date in data[casesType]) {
                if (lastDataPoint) {
                    const newDataPoint = {
                        x: date,
                        y: data[casesType][date] - lastDataPoint
                    }
                    newDataPoint.y = newDataPoint.y > 0 ? newDataPoint.y : 0;
                    chartData.push(newDataPoint);
                }
                lastDataPoint = data[casesType][date];
            }
        }
        return chartData;
    };

    return (
        <div className={`${casesType} animate__animated animate__fadeIn`}>
            {data ?.length > 0 && (
                <Line
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: casesTypeColors[casesType].graphColor,
                                borderColor: casesTypeColors[casesType].rgb,
                                data: data
                            }
                        ]
                    }} />
            )}
        </div>
    )
}

export default LineGraph
