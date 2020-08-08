import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography
} from '@material-ui/core';
import { Spring } from 'react-spring/renderprops';
import '../style/DonutChart.css'
const useStyles = makeStyles(theme => ({
    root: {
        height: '18.7rem'
    },
    chartContainer: {
        position: 'relative',
        height: '140px'
    },
    stats: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'center'
    },
    caseType: {
        textAlign: 'center',
        padding: theme.spacing(1)
    },
    deviceIcon: {
        color: theme.palette.icon
    }
}));

function DonutChart({ confirmed, active, recovered, deaths }) {
    const pieChartData = {
        active: Math.round(((active / confirmed) * 100) * 10) / 10,
        recovered: Math.round(((recovered / confirmed) * 100) * 10) / 10,
        deaths: Math.round(((deaths / confirmed) * 100) * 10) / 10
    }
    const { className, ...rest } = {};

    const classes = useStyles();
    const theme = useTheme();

    const data = {
        datasets: [
            {
                data: [pieChartData.active, pieChartData.recovered, pieChartData.deaths],
                backgroundColor: [
                    "#4c75f2",
                    "#28a745",
                    "#6c757d",
                ],
                borderWidth: 5,
                borderColor: theme.palette.white,
                hoverBorderColor: theme.palette.white
            }
        ],
        labels: ['Active', 'Recovered', 'Deaths']
    };

    const options = {
        legend: {
            display: false
        },
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        cutoutPercentage: 70,
        layout: { padding: 0 },
        tooltips: {
            enabled: true,
            mode: 'index',
            intersect: false,
            borderWidth: 0,
            borderColor: "rgba(0, 0, 0, 0.12)",
            backgroundColor: "#fff",
            titleFontColor: "rgba(0, 0, 0, 0.87)",
            bodyFontColor: "rgba(0, 0, 0, 0.54)",
            footerFontColor: "rgba(0, 0, 0, 0.54)"
        }
    };

    const casesStats = [
        {
            title: 'Active',
            value: pieChartData.active,
            color: "#4c75f2"
        },
        {
            title: 'Recovered',
            value: pieChartData.recovered,
            color: "#28a745"
        },
        {
            title: 'Deaths',
            value: pieChartData.deaths,
            color: "#6c757d"
        }
    ];

    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardContent>
                <div className={classes.chartContainer}>
                    <Spring
                        from={{ opacity: 0 }}
                        to={{ opacity: 1 }}>
                        {props => <div style={props}>
                            <Doughnut
                                data={data}
                                options={options}
                            />
                        </div>}

                    </Spring>
                </div>
                <div className={`${classes.stats} donutLegend animate__animated animate__fadeInUp`}>
                    {casesStats.map(caseType => (
                        <div
                            className={classes.caseType}
                            key={caseType.title}
                        >
                            <span className={classes.deviceIcon}>{caseType.icon}</span>
                            <Typography variant="h7">{caseType.title}</Typography>
                            <Typography
                                style={{ color: caseType.color }}
                                variant="h6"
                            >
                                <strong>{caseType.value}%</strong>
                            </Typography>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

DonutChart.propTypes = {
    className: PropTypes.string
};

export default DonutChart;
