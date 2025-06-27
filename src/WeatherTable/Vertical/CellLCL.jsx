import { useMemo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DateTime } from 'luxon';
import { zip } from 'lodash'




export default function CellLCL({ data, cellWidth, cellFontSize }) {

    const df = useMemo(() => {
        if (!data) return;
        return (parseInt(data?.lcl) / 1000).toFixed(1)

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
            {df}K
        </td>
    )
}