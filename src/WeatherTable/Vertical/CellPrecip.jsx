
function formatPrecip(temp) {
    if (temp > 0) {
        return temp.toFixed(2)
    }

    return ""  // Concatenate the temperature with the degree symbol
}

export default function CellPrecip({ data, cellWidth, cellFontSize }) {


    const cellStyle = {
        padding: '4px',
        margin: 0,
        fontSize: `${cellFontSize}em`,
        width: `${cellWidth}px`,
        background: `${data.dayNightColor}`
    }

    return (
        <td style={cellStyle}>
            {formatPrecip(data.precip_amount * 100)}
        </td>
    )
}