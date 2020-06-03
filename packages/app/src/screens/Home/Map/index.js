import React, { useEffect, useState, useRef } from 'react'
import { View, Platform } from 'react-native'
import Geolocation from '@react-native-community/geolocation';
import { check, PERMISSIONS } from 'react-native-permissions';
import MapView from 'react-native-maps';

import Text from '../../../components/commons/text'
import styles from './styles';

const LOCATION = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.0421

export default function Map() {
    let _map = useRef(null)

    const [coords, setCoords] = useState(null)

    useEffect(() => {
        requestPermissions()
    }, [])

    const requestPermissions = async() => {
        if (Platform.OS === 'android') {
            await check(LOCATION)
        }

        requestLocation()
    }

    const requestLocation = async() => {
        const options = {
            timeout: 3000,
            maximumAge: 2000,
            enableHighAccuracy: true
        }

        Geolocation.getCurrentPosition(getPosition, getError, options)
    }

    const getPosition = ({ coords }) => {
        if (coords) {
            setCoords(coords);

            _map.current.animateToCoordinate({
                latitude: coords.latitude,
                longitude: coords.longitude
            }, 1)
        }
    }

    const getError = (error) => {
        console.log(error)
    }

    return (
        <MapView
            ref={_map}
            style={styles.map}
            showsUserLocation
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }}
        />
    )
}