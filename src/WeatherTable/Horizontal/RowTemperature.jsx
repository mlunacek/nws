import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DateTime } from 'luxon';
import StickyCell from './StickyCell'

// Function to convert timestamp string to 12-hour time format with am/pm
function formatTemperature(temp) {
    if (temp) {
        return `${temp}°`;
    }  // Concatenate the temperature with the degree symbol
    return ""
}

export default function RowTemperature({ column, data, legendWidth, padding, cellWidth, cellHeight, cellFontSize }) {

    // console.log(data.map((d) => d.sunValue))

    return (
        <tr style={{ padding: `${padding}px`, height: `${cellHeight}px` }}>
            <StickyCell padding={padding} legendWidth={legendWidth} name="Temp" units="°F" />

            {data.map((d, index) => (
                <td
                    style={{
                        width: `${cellWidth}px`,
                        fontSize: `${cellFontSize}em`,
                        // background: `linear-gradient(to right, ${d.sunValue.p}, ${d.sunValue.n})`
                        background: `${d.dayNightColor}`,
                    }}
                    key={index}
                    align="center">
                    {formatTemperature(d?.[column])}
                </td>
            ))}
        </tr>
    )
}
