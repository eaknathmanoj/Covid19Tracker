import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import '../style/Infobox.css';
import { useSpring, animated } from 'react-spring'
import { formatNumber } from '../util';
import numeral from "numeral";

function InfoBox({ title, cases, total, active, color, ...props }) {
    const spring = useSpring({ number: 999, from: { number: 0 } });
    const infoBoxColor = {
        "red": "infoBox-red",
        "blue": "infoBox-blue",
        "green": "infoBox-green",
        "grey": "infoBox-grey"
    }

    const infoBoxColor_cases = {
        "red": "infoBox__cases--red",
        "blue": "infoBox__cases--blue",
        "green": "infoBox__cases--green",
        "grey": "infoBox__cases--grey"
    }

    return (
        <Card className={`infoBox ${active && "infoBox--selected__"}${color} ${infoBoxColor[color]} animate__animated animate__fadeIn`}
            onClick={props.onClick}>
            <CardContent className="infoBox__cardContent">
                <h4 className={`infoBox_title ${color}__dark`}>
                    {title}
                </h4>
                {cases && (
                    <h4 className={`infoBox_cases ${infoBoxColor_cases[color]} ${color}__light`}>
                        {cases}
                    </h4>)
                }
                {/* {!cases && (
                    // <animated.span>{spring.number.interpolate((total) =>
                    //     formatNumber(total, 'int')
                    // )}</animated.span>
                )} */}
                <h2 className={`infoBox_total ${color}__dark`}>
                    {numeral(total).format("0,0")}
                </h2>
            </CardContent>
        </Card>
    )
}

export default InfoBox
