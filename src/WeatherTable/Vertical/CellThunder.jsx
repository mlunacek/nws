
function formatPrecip(temp) {
    if (temp > 0) {
        return parseInt(temp)
    }

    return ""  // Concatenate the temperature with the degree symbol
}

export default function CellThunder({ data, cellWidth, cellFontSize }) {


    const cellStyle = {
        padding: '4px',
        margin: 0,
        fontSize: `${cellFontSize}em`,
        width: `${cellWidth}px`
    }

    return (
        <td style={cellStyle}>
            {formatPrecip(data)}
        </td>
    )
}