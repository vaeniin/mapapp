export const getCoordinate = (coordinates) => {
    try {
        let x = coordinates.map(c => c.latitude)
        let y = coordinates.map(c => c.longitude)
    
        let minX = Math.min.apply(null, x)
        let maxX = Math.max.apply(null, x)
    
        let minY = Math.min.apply(null, y)
        let maxY = Math.max.apply(null, y)
    
        return {
            latitude: (minX + maxX) / 2,
           longitude: (minY + maxY) / 2
        }
    } catch (e) {
        return coordinates;
    }
}