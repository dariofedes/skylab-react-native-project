import { Platform } from 'react-native'
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const LOCATION = Platform.OS === 'android' ? 
    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION :
    PERMISSIONS.IOS.LOCATION_WHEN_IN_USE

export const requestLocationPermissions = async () => {
    return request(LOCATION)
        .then((result) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    return false
                case RESULTS.DENIED:
                    return false
                case RESULTS.BLOCKED:
                    return false
                case RESULTS.GRANTED:
                    return true
            }
        })
        .catch((error) => {
            // throw error
        });
}

export default {
    requestLocationPermissions
}