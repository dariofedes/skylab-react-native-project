import React, { useEffect, useState, useRef } from 'react'
import MapView from 'react-native-maps';

import { requestLocationPermissions } from '@skylab/services/src/Permissions'
import { requestLocation } from '@skylab/services/src/Geolocation'

import styles from './styles';

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.0421

export default function Map() {
    let _map = useRef(null)
    const [coords, setCoords] = useState(null)

    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = async() => {
        const res = await requestLocationPermissions()

        if (res) {
            requestLocation(({ coords }) => {
                setCoords(coords);
    
                _map.current.animateToCoordinate({
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }, 1)
            })

        }
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