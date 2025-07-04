import { useMemo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DateTime } from 'luxon';
import { zip } from 'lodash'




export default function CellTime({ data, cellWidth, cellFontSize }) {

    const df = useMemo(() => {
        if (!data) return;

        const dt = DateTime.fromFormat(data?.timestamp, 'yyyy-MM-dd HH:mm:ss');
        // Extract time of day with AM/PM
        const timeOfDay = dt.toFormat("ha").toLowerCase(); // Time in 'hh:mm AM/PM' format
        return timeOfDay

    }, [data])

    // console.log(data)

    return (
        <td
            style={{
                width: `${cellWidth}px`,
                color: "grey",
                fontSize: `${cellFontSize}em`,
                background: `${data.dayNightColor}`
            }}
            align="center">
            {df}
        </td>
    )
}