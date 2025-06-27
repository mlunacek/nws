import React, { useMemo } from 'react';
import { Box, Link } from '@mui/material';
import { DateTime } from 'luxon';

import CellTime from './CellTime'
import CellWindDirection from './CellWindDirection';
import CellWindSpeed from './CellWindSpeed';
import CellTemperature from './CellTemperature';
import CellPrecip from './CellPrecip'
import CellIcons from './CellIcons'
import CellLCL from './CellLCL'

const stickyHeader = {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    background: '#ececec',
    borderBottom: '1px solid #fff',
    fontSize: `0.9em`,
    color: 'grey',
    padding: '8px'
}

const nightColor = "#eaeaf6"
const dayColor = "#f8f8f8"

export default function VerticalTable({ location, data }) {

    const forecastWeatherLink = useMemo(() => {
        if (location) {
            return `https://forecast.weather.gov/MapClick.php?lat=${location.lat}&lon=${location.lon}&lg=english&FcstType=graphical`
        }
    }, [location])

    // const noaaLink = useMemo(() => {
    //     if (location) {
    //         return `https://www.nws.noaa.gov/wtf/MapClick.php?lat=${location.lat}&lon=${location.lon}&FcstType=textr&unit=0&lg=ep`
    //     }
    // }, [location])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',  // Full viewport height
                width: '100%',
            }}
        >

            <Box
                sx={{
                    flex: '1 1 auto',
                    overflowY: 'auto',
                    maxHeight: '100%',
                    width: '100%',
                }}
            >


                <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                    <thead>
                        {/* <tr>
                            <td colSpan={8}
                                style={{
                                    textAlign: 'center',
                                    paddingLeft: 5,
                                    background: "#ececec"
                                }}>
                                View the forecast data at{' '}
                            </td>
                        </tr> */}
                        <tr>
                            <td colSpan={8} style={{
                                textAlign: 'center',
                                padding: 10,
                            }}>
                                View the forecast data at{' '}
                                <Link href={forecastWeatherLink} target="_blank" rel="noreferrer">
                                    forecast.weather.gov
                                </Link>
                            </td>
                        </tr>
                        <tr>
                            <th style={stickyHeader}>Time</th>
                            <th style={stickyHeader}></th>
                            <th style={stickyHeader}>Temp</th>
                            <th style={stickyHeader}>Prec</th>
                            <th style={stickyHeader}>LCL</th>
                            <th style={stickyHeader}>Dir</th>
                            <th style={stickyHeader}>Wind</th>
                            <th style={stickyHeader}>Gust</th>
                            {/* <th style={stickyHeader}>Thunder</th> */}
                            {/* <th style={stickyHeader}>Sky</th> */}
                        </tr>
                    </thead>

                    <tbody >
                        {data.map((d, i) => {

                            const currentDate = DateTime.fromFormat(d.timestamp, 'yyyy-MM-dd HH:mm:ss').toFormat('ccc dd')
                            const prevDate = i > 0 ? DateTime.fromFormat(data[i - 1].timestamp, 'yyyy-MM-dd HH:mm:ss').toFormat('ccc dd') : null;
                            const showDateRow = currentDate !== prevDate;

                            return (
                                <React.Fragment key={i}>
                                    {showDateRow && (
                                        <tr>
                                            <td colSpan={7}
                                                style={{
                                                    textAlign: 'center',
                                                    paddingLeft: 5,
                                                    background: dayColor
                                                }}>
                                                {currentDate}
                                            </td>
                                        </tr>
                                    )}
                                    <tr key={i} >
                                        <CellTime data={d} cellWidth={30} cellFontSize={1.3} />
                                        <CellIcons data={d} />
                                        <CellTemperature data={d} cellWidth={40} cellFontSize={1.1} />
                                        <CellPrecip data={d} cellWidth={40} cellFontSize={0.7} />
                                        <CellLCL data={d} cellWidth={40} cellFontSize={0.8} />
                                        <CellWindDirection data={d.wind_dir} cellWidth={40} />
                                        <CellWindSpeed data={data} column={"wind_speed"} index={i} cellWidth={40} cellFontSize={1.25} />
                                        <CellWindSpeed data={data} column={"wind_gust"} index={i} cellWidth={40} cellFontSize={1.25} />

                                        {/* <CellThunder data={d.thunder_percent} cellWidth={40} cellFontSize={0.7} /> */}
                                        {/* <CellClouds data={d.sky_cover} cellWidth={40} cellFontSize={0.7} /> */}


                                    </tr>
                                </React.Fragment>
                            )
                        })}

                    </tbody>
                </table>
            </Box>
        </Box >
    )

}