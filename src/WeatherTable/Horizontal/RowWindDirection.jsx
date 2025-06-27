
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { pad } from 'lodash';
import StickyCell from './StickyCell'

export default function RowWindDirection({ column, data, legendWidth, padding, cellWidth, cellHeight }) {


    function generateStyle(value) {
        const arrowStyle = {
            fontFamily: 'iconfont', // Assuming iconfont is a loaded font in your project
            color: '#5b7e9e', // Setting the color for the arrow
            fontSize: '14px', // Adjust the font size to suit your needs
            transform: `rotate(${value}deg)`, // Rotate the number 4 based on the value prop
            display: 'inline-block',
            transformOrigin: 'center', // Make sure the rotation happens around the center
        };
        return arrowStyle;
    }


    return (
        <tr style={{ padding: `${padding}px`, height: `${cellHeight}px` }}>
            <StickyCell padding={padding} legendWidth={legendWidth} name="Direction" />
            {data.map((d, index) => (
                <td
                    style={{ width: `${cellWidth}px`, fontSize: '8px' }}
                    key={index}
                    align="center">
                    <div style={generateStyle(d[column])}>{d[column] ? 4 : ""}</div>
                    {/* {d[column] !== undefined ? d[column] : 'N/A'} */}
                </td>
            ))}
        </tr>
    )
}

