

export default function CellIcons({ data, cellWidth, cellFontSize }) {

    const cellStyle = {
        padding: '4px',
        margin: 0,
        fontSize: `${cellFontSize}em`,
        width: `${cellWidth}px`,
        background: `${data.dayNightColor}`
    }

    return (
        <td style={cellStyle}>
            {data?.icon &&
                <img src={data?.icon} alt="Weather Icon" width="30" height="30" />
            }
        </td>
    )
}