import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Collapse } from '@mui/material';
import { DateTime } from 'luxon';
import { first } from 'lodash';

import { useAtomValue } from 'jotai'
import { nwsHorizontalExpandAtom } from '@/NWS/atoms';

import RowWindDirection from './RowWindDirection';
import RowWindSpeed from './RowWindSpeed';
import RowTime from './RowTime';
import RowDate from './RowDate';
import RowTemperature from './RowTemperature';
import RowPrecip from './RowPrecip';
import RowSnowfall from './RowSnowfall';
import RowClouds from './RowClouds';
import RowBreak from './RowBreak';
import RowRainEvent from './RowRainEvent';
import RowThunderstormEvent from './RowThunderstormEvent';
import RowThunderProp from './RowThunderProp';
import RowSnowEvent from './RowShowEvent';
import RowHazeEvent from './RowHazeEvent';
import RowIcon from './RowIcon'
import RowPrecipPercent from './RowPrecipPercent';

const formatTime24hr = (time) => {
    const hours = time.getHours()
    const minutes = time.getMinutes() / 60
    return hours + minutes
};

export default function HorizontalTable({ location, data }) {

    const padding = 5;
    const cellWidth = 35;
    const cellHeight = 20;
    const cellHeightSmall = 16;
    const legendWidth = 100;
    const windsAloft = 0.7

    const nightColor = "#eaeaf6"
    const dayColor = "#f8f8f8"

    const windSpeedFontSize = 0.8
    const tempFontSize = 0.7
    const timeFontSize = 0.7


    const tableStyle = {
        tableLayout: 'fixed',  // Forces the table to respect cell width
        minWidth: '1000px', // Or whatever makes sense for your columns
        width: 'max-content', // Let it grow based on content
    };

    const expand = useAtomValue(nwsHorizontalExpandAtom)

    const tableRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - tableRef.current.offsetLeft);
        setScrollLeft(tableRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - tableRef.current.offsetLeft;
        const walk = (x - startX) * 1; // Scroll speed multiplier
        tableRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };


    if (!data) {
        return <>Loading</>
    }


    return (
        <Box sx={{
            overflowX: 'auto',
            width: '100%',
            maxWidth: '100%',
        }}
        >
            <div
                ref={tableRef}
                style={{
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    maxWidth: '100%',
                    display: 'block',  // Ensures block context for overflow
                    cursor: isDragging ? 'grabbing' : 'grab',
                    WebkitOverflowScrolling: 'touch', // Smooth scroll on mobile
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >

                <table style={tableStyle}>
                    <tbody>
                        <RowDate
                            column="timestamp"
                            data={data}
                            legendWidth={legendWidth}
                            padding={padding}
                            cellHeight={cellHeight}
                            cellWidth={cellWidth} />

                        <RowTime
                            column="timestamp"
                            data={data}
                            legendWidth={legendWidth}
                            padding={padding}
                            cellHeight={cellHeight}
                            cellWidth={cellWidth}
                            cellFontSize={timeFontSize} />

                        <RowIcon
                            data={data}
                            padding={0.5}
                            cellWidth={cellWidth}
                            cellHeight={cellHeight}
                            cellFontSize={timeFontSize}
                            legendWidth={legendWidth}
                        />

                        <RowTemperature
                            column="temperature"
                            data={data}
                            legendWidth={legendWidth}
                            padding={padding}
                            cellHeight={cellHeightSmall}
                            cellWidth={cellWidth}
                            cellFontSize={tempFontSize} />

                        <RowPrecip
                            column="precip_amount"
                            data={data}
                            legendWidth={legendWidth}
                            padding={padding}
                            cellHeight={cellHeightSmall}
                            cellWidth={cellWidth}
                            cellFontSize={tempFontSize} />

                        {expand &&
                            <>
                                <RowClouds
                                    column="sky_cover"
                                    data={data}
                                    legendWidth={legendWidth}
                                    padding={padding}
                                    cellHeight={cellHeightSmall}
                                    cellWidth={cellWidth}
                                    cellFontSize={tempFontSize} />

                                <RowPrecipPercent
                                    column="precip_percent"
                                    data={data}
                                    legendWidth={legendWidth}
                                    padding={padding}
                                    cellHeight={cellHeightSmall}
                                    cellWidth={cellWidth}
                                    cellFontSize={tempFontSize} />

                                <RowThunderProp
                                    column="thunder_percent"
                                    data={data}
                                    legendWidth={legendWidth}
                                    padding={padding}
                                    cellHeight={cellHeightSmall}
                                    cellWidth={cellWidth}
                                    cellFontSize={tempFontSize} />




                                <RowSnowfall
                                    column="snowfall_amount"
                                    data={data}
                                    legendWidth={legendWidth}
                                    padding={padding}
                                    cellHeight={cellHeightSmall}
                                    cellWidth={cellWidth}
                                    cellFontSize={tempFontSize} />


                                <RowRainEvent
                                    column="rain_showers"
                                    data={data}
                                    legendWidth={legendWidth}
                                    padding={padding}
                                    cellHeight={cellHeightSmall}
                                    cellWidth={cellWidth}
                                    cellFontSize={tempFontSize} />

                                <RowThunderstormEvent
                                    column="thunderstorms"
                                    data={data}
                                    legendWidth={legendWidth}
                                    padding={padding}
                                    cellHeight={cellHeightSmall}
                                    cellWidth={cellWidth}
                                    cellFontSize={tempFontSize} />

                                <RowSnowEvent
                                    column="snow_showers"
                                    data={data}
                                    legendWidth={legendWidth}
                                    padding={padding}
                                    cellHeight={cellHeightSmall}
                                    cellWidth={cellWidth}
                                    cellFontSize={tempFontSize} />

                                <RowHazeEvent
                                    column="haze"
                                    data={data}
                                    legendWidth={legendWidth}
                                    padding={padding}
                                    cellHeight={cellHeightSmall}
                                    cellWidth={cellWidth}
                                    cellFontSize={tempFontSize} />
                            </>
                        }

                        <RowWindSpeed
                            column="wind_speed"
                            name={"Wind"}
                            data={data}
                            legendWidth={legendWidth}
                            padding={padding}
                            cellHeight={cellHeight}
                            cellWidth={cellWidth}
                            cellFontSize={windSpeedFontSize} />

                        <RowWindSpeed
                            column="wind_gust"
                            name={"Gusts"}
                            data={data}
                            legendWidth={legendWidth}
                            padding={padding}
                            cellHeight={cellHeight}
                            cellWidth={cellWidth}
                            cellFontSize={windSpeedFontSize} />

                        <RowWindDirection
                            column="wind_dir"
                            data={data}
                            legendWidth={legendWidth}
                            padding={padding}
                            cellHeight={cellHeight}
                            cellWidth={cellWidth}
                        />

                        <RowBreak
                            data={data}
                            legendWidth={legendWidth}
                            padding={padding}
                            cellHeight={cellHeight}
                            cellWidth={cellWidth}
                            cellFontSize={windSpeedFontSize}
                        />


                    </tbody>
                </table>
            </div>
        </Box>
    );
}

