import React from 'react';
import {
    Card,
    CardContent
} from '@material-ui/core';

import '../style/CountryStats.css'

function CountryStatsCard({ cardHeader, value, description, cardColor }) {
    return (
        <Card className={`countryStatsCard ${cardColor} animate__animated animate__fadeIn`}>
            <CardContent>
                <h4 className={`${cardColor}__light`}>{cardHeader}</h4>
                <h3 className={`${cardColor}__dark`}><strong>{value}</strong></h3>
                <br />
                <p className={`${cardColor}__light`}>{description}</p>
            </CardContent>
        </Card>
    )
}

export default CountryStatsCard
