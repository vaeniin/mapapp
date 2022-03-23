export const validateLatLon = (coords) => {

    const check_lat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
    const check_lon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
    
    let result = coords.every(e => {
        return check_lat.test(e.latitude) && check_lon.test(e.longitude);
    });
    
    return result;
};