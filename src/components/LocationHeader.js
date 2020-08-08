import React from 'react'
import { Card, CardContent } from "@material-ui/core";
import '../style/LocationHeader.css';
import numeral from "numeral";

function LocationHeader({ countryInfo }) {
    const countryName = countryInfo.country ? countryInfo.country : "Worldwide";
    const getLastUpdatedDate = () => {
        if (!countryInfo.updated)
            return
        const date = new Date(countryInfo.updated);
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        return `Last updated on ${date.getUTCDate()} ${monthNames[date.getUTCMonth()]}, ${date.getUTCHours()}:${date.getUTCMinutes()} UTC`
    }
    const getTested = () => {
        const tested = countryInfo.tests;
        if (!tested)
            return
        return `${numeral(tested).format("0,0")}`
    }
    return (
        <Card className="LocationHeader">
            <CardContent className="LocationHeader__card">
                <div className="LocationHeader__card--left">
                    <h3 className="headerCountry animate__animated animate__fadeIn">
                        {countryName}
                    </h3>
                    <h5 className="lastUpdated animate__animated animate__fadeIn">
                        {getLastUpdatedDate()}
                    </h5>

                </div>
                <div className="LocationHeader__card--right animate__animated animate__fadeIn">
                    <h4 className="tested">
                        Tested
                    </h4>
                    <h3 className="testedNumber animate__animated animate__fadeIn">
                        {getTested()}
                    </h3>
                </div>
            </CardContent>
        </Card>
    )
}

export default LocationHeader
