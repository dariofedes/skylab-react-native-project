import Geolocation from '@react-native-community/geolocation';

let WATCH_ID
const OPTIONS = {
    timeout: 3000,
    maximumAge: 2000,
    enableHighAccuracy: true
}

export const requestLocation = (callback) => {
    Geolocation.getCurrentPosition(callback, (error) => {
        // throw error
    }, OPTIONS)
}

export const startTrackingLocation = (callback) => {
    WATCH_ID = Geolocation.watchPosition(callback, (error) => {
        // throw error
    }, OPTIONS)
}

export const stopTrackingLocation = () => {
    Geolocation.clearWatch(WATCH_ID)
} 

export default {
    requestLocation,
    startTrackingLocation,
    stopTrackingLocation
}