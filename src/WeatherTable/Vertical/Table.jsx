import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { DateTime } from 'luxon';
import { first } from 'lodash';

import CellTime from './CellTime'
import CellWindDirection from './CellWindDirection';
import CellWindSpeed from './CellWindSpeed';
import CellTemperature from './CellTemperature';

import CellThunder from './CellThunder'
import CellPrecip from './CellPrecip'
import CellClouds from './CellClouds'
import CellIcons from './CellIcons'

const formatTime24hr = (time) => {
    const hours = time.getHours()
    const minutes = time.getMinutes() / 60
    return hours + minutes
};

const tableStyle = {
    tableLayout: 'fixed',  // Forces the table to respect cell width
    width: '100%', // Or whatever makes sense for your columns
    width: 'max-content', // Let it grow based on content
};

const stickyHeader = {
    position: 'sticky',
    top: 0,
    zIndex: 10,
    background: '#ececec',
    borderBottom: '1px solid #fff',
    fontSize: `0.7em`,
    color: 'grey',
    padding: '4px'
}

const nightColor = "#eaeaf6"
const dayColor = "#f8f8f8"

export default function VerticalTable({ data }) {

    const tableRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);


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
                        <tr>
                            <th style={stickyHeader}>Time</th>
                            <th style={stickyHeader}>Icons</th>
                            <th style={stickyHeader}>Temp</th>
                            <th style={stickyHeader}>Precip</th>
                            <th style={stickyHeader}>Direction</th>
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
                                        <CellTime data={d} cellWidth={30} />
                                        <CellIcons data={d} />
                                        <CellTemperature data={d} cellWidth={40} cellFontSize={1.1} />
                                        <CellPrecip data={d} cellWidth={40} cellFontSize={0.7} />
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