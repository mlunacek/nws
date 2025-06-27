
export default function CellTemperature({ data, cellWidth, cellFontSize }) {

    const cellStyle = {
        padding: '4px',
        margin: 0,
        fontSize: `${cellFontSize}em`,
        width: `${cellWidth}px`,
        background: `${data?.dayNightColor}`
    }

    return (
        <td style={cellStyle}>
            {`${data["temperature"]}°`}
        </td>
    )
}
