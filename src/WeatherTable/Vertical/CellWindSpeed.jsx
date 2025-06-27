import { useMemo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DateTime } from 'luxon';
import { zip } from 'lodash'

import windyColorScale from '@/WeatherTable/windColorScale.js'


const GraidentCell = ({ d, index, cellWidth, cellFontSize }) => {

    const cellStyle = {
        padding: '4px',
        margin: 0,
        fontSize: `${cellFontSize}em`,
        width: `${cellWidth}px`,
        // border: '1px solid #ddd',  // Add borders to each cell
        textAlign: 'center',
        background: `linear-gradient(to bottom, ${d.prevColor}, ${d.currentColor}, ${d.nextColor})`
    };


    return (
        <td key={index} style={cellStyle}>
            {d.current ? d.current : ""}
        </td>
    );
};



export default function CellWindSpeed({ data, column, index, cellWidth, cellFontSize }) {

    const scale = windyColorScale()

    const windSpeed = data.map((d) => d[column])

    // Handle the boundaries for i-1 and i+1
    const prevValue = index > 0 ? windSpeed[index - 1] : null;  // i-1 (or null for the first element)
    const currValue = windSpeed[index]
    const nextValue = index < windSpeed.length - 1 ? windSpeed[index + 1] : null;  // i+1 (or null for the last element)

    const d = {
        prev: parseInt(prevValue),
        current: parseInt(currValue),  // i
        next: parseInt(nextValue),
        prevColor: scale((prevValue + currValue) / 2),
        currentColor: scale(currValue),
        nextColor: scale((nextValue + currValue) / 2)
    };


    return (
        <GraidentCell key={index} d={d} index={index} cellWidth={cellWidth} cellFontSize={cellFontSize} />
    )
}
