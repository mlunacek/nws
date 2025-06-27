

export default function CellWindDirection({ data, cellWidth }) {

    function generateStyle(value) {
        const arrowStyle = {
            fontFamily: 'iconfont', // Assuming iconfont is a loaded font in your project
            color: '#5b7e9e', // Setting the color for the arrow
            fontSize: '14px', // Adjust the font size to suit your needs
            transform: `rotate(${value}deg)`, // Rotate the number 4 based on the value prop
            display: 'inline-block',
            transformOrigin: 'center', // Make sure the rotation happens around the center
            zIndex: 5,
        };
        return arrowStyle;
    }


    return (
        <td
            style={{ width: `${cellWidth}px`, fontSize: '8px' }}
            align="center">
            <div style={generateStyle(data)}>{data ? 4 : ""}</div>
        </td>
    )
}