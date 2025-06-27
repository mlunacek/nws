export default function CellClouds({ data, cellWidth, cellFontSize }) {


    const cellStyle = {
        padding: '4px',
        margin: 0,
        fontSize: `${cellFontSize}em`,
        width: `${cellWidth}px`
    }

    return (
        <td style={cellStyle}>
            {data}
        </td>
    )
}