import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { DateTime } from 'luxon';

import StickyCell from './StickyCell'
import { useAtom } from 'jotai'
import { nwsHorizontalExpandAtom } from '@/NWS/atoms';

export default function RowIcon({ data, padding, cellWidth, cellHeight, legendWidth }) {

    // console.log(data.map(d => d.icon))
    const [expand, setExpand] = useAtom(nwsHorizontalExpandAtom)

    function handleClick() {
        setExpand(!expand)
    }

    return (
        <tr style={{ padding: `${padding}px`, height: `25px` }}>
            <StickyCell padding={padding} legendWidth={legendWidth} name="" units="" >
                {/* <Button variant="text" onClick={handleClick}>click</Button> */}
                <Button
                    variant="text"
                    component="span"
                    disableRipple
                    sx={{
                        color: 'inherit',
                        font: 'inherit',
                        textTransform: 'none',
                        padding: 0,
                        minWidth: 'auto',
                    }}
                    onClick={handleClick}
                >
                    {expand ? "less" : "more"}
                </Button>

            </StickyCell >
            {
                data.map((d, index) => (
                    <td
                        style={{
                            width: `${cellWidth}px`,
                            height: `${cellHeight}px`,
                            // background: `linear-gradient(to right, ${d.sunValue.p}, ${d.sunValue.n})`
                            background: `${d.dayNightColor}`,
                        }}
                        key={index}
                        align="center">
                        {d?.icon &&
                            <img src={d?.icon} alt="Weather Icon" width="25" height="25" />
                        }
                    </td>
                ))
            }
        </tr >
    )
}
