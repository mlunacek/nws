
function convert(value, units) {
    if (units === "wmoUnit:km_h-1")
        return value * 0.621371
    else if (units === "wmoUnit:degC")
        return value * 9 / 5 + 32
    else if (units === "wmoUnit:m")
        return value * 3.28
    return value
}

export { convert }