const polygonCoordsAction = (totalCoords, coordsX, coordsY) => {
    return {
        type: "polygonCoords",
        totalCoords,
        coordsX,
        coordsY
    }
}

const clearCoords = () => {
    return {
        type: "clearCoords"
    }
}

const newShape = (value) => {
    return {
        type: "newShape",
        value
    }
}

const checkBtn = (value) => {
    return {
        type: 'checkBtn',
        value
    }
}


export { polygonCoordsAction, newShape, clearCoords, checkBtn };