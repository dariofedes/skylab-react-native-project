import Geolocation from '@react-native-community/geolocation';

export const requestLocation = (callback) => {
    const options = {
        timeout: 3000,
        maximumAge: 2000,
        enableHighAccuracy: true
    }

    return Geolocation.getCurrentPosition(callback, (error) => {
        // throw error
    }, options)
}

export default {
    requestLocation
}