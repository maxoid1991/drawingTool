const info = {
    'totalCoords' : [],
    'coordsX'  : [],
    'coordsY'  : [],
    'newShape' : false,
    'button'   : true
};


const MainPageReducer = (data = info, action) => {

    switch (action.type) {
        case "polygonCoords" : 
            return {
                ...data,
                totalCoords : [...data.totalCoords, ...action.totalCoords],
                coordsX : [...data.coordsX, action.coordsX],
                coordsY : [...data.coordsY, action.coordsY]
            }
        case "newShape" : 
            return {
                ...data,
                newShape : action.value
        }

        case "clearCoords" : 
            return {
                ...data,
                totalCoords : [],
                coordsX : [],
                coordsY : []
            }    
        
        case "checkBtn" : 
            return {
                ...data,
                button : action.value
            }
    } 

    return data;
}

export { MainPageReducer };