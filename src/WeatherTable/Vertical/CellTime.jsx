import { useMemo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DateTime } from 'luxon';
import { zip } from 'lodash'




export default function CellTime({ data, cellWidth }) {

    const df = useMemo(() => {
        if (!data) return;

        const dt = DateTime.fromFormat(data?.timestamp, 'yyyy-MM-dd HH:mm:ss');
        // Extract day of week and date
        const dayOfWeek = dt.toFormat('cccc'); // Full name of the day of the week
        const date = dt.toFormat('ccc dd'); // Date in 'YYYY-MM-DD' format

        // Extract time of day with AM/PM
        const timeOfDay = dt.toFormat("ha").toLowerCase(); // Time in 'hh:mm AM/PM' format
        return timeOfDay

    }, [data])

    console.log(data)

    return (
        <td
            style={{
                width: `${cellWidth}px`,
                fontSize: '12px',
                background: `${data.dayNightColor}`
            }}
            align="center">
            {df}
        </td>
    )
}