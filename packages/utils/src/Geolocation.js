import * as Geolib from 'geolib';

/**
 * 
 * @param {Object} firstCoords one point coords to get distance from
 * @param {Object} secondCoords other point coords to get distance from
 * Coords @type {Object} containing latitude and longitude 
 * 
 * @returns {Number} distance in meters
 */
export const getDistance = (firstCoords, secondCoords) => {
    return Geolib.getDistance(
        { latitude: firstCoords.latitude, longitude: firstCoords.longitude },
        { latitude: secondCoords.latitude, longitude: secondCoords.longitude },
    );
}

/**
 * 
 * @param {Array} allCoords array of Coords 
 * Coords @type {Object} containing latitude and longitude 
 * 
 * @returns {Object} containing latitude and longitude 
 */
export const getCenter = allCoords => {
    return Geolib.getCenter(allCoords);
}

/**
 * 
 * @param {Object} point containing latitude and longitude (the nearest to order by)
 * @param {Array} coords array of Coords 
 * Coords @type {Object} containing latitude and longitude 
 * 
 * @returns {Array} array of Coords ordered
 */
export const orderByDistance = (point, coords) => {
    return Geolib.orderByDistance(point, coords);
}

/**
 * 
 * @param {Object} point containing latitude and longitude (the nearest to find)
 * @param {Array} coords array of Coords 
 * Coords @type {Object} containing latitude and longitude 
 * 
 * @returns {Object} the nearest ones latitude and longitude
 */
export const findNearest = (point, coords) => {
    return Geolib.findNearest(point, coords);
}


export default {
    getDistance,
    getCenter,
    orderByDistance,
    findNearest
}