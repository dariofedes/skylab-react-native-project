import React, { useEffect, useState, useRef } from 'react'
import { View, FlatList } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Feather'

import { requestLocationPermissions } from '@skylab/services/src/Permissions'
import { 
    requestLocation,     
    startTrackingLocation,
    stopTrackingLocation
} from '@skylab/services/src/Geolocation'
import { getRocketsAllLandings } from '@skylab/client-logic/src/space/Landing'
import { orderByDistance } from '@skylab/utils/src/Geolocation'

import ListItem from '../../../components/ListItem'
import styles from './styles';

const LATITUDE_DELTA = 0.0322
const LONGITUDE_DELTA = 0.0221

export default function Map() {
    let _map = useRef(null)
    const [data, setData] = useState([])
    const [coords, setCoords] = useState({
        latitude: 41.388587,
        longitude: 2.180523,
    })

    useEffect(() => {
        getLocation()
        getLandingData()

        // return () => stopTrackingLocation()
    }, [])

    const receiveCoords = coords => {
        setCoords(coords);

        _map.current.animateCamera({
            center: {
                latitude: coords.latitude,
                longitude: coords.longitude
            },
            heading: 180,
          });
    }

    const getLocation = async() => {
        const res = await requestLocationPermissions()

        if (res) {
            // requestLocation(({ coords }) => receiveCoords(coords))
            // startTrackingLocation(({ coords }) => receiveCoords(coords))
        }
    }

    const getLandingData = async () => {
        const result = await getRocketsAllLandings()
        const orderedData = orderByDistance(coords, result)

        setData(orderedData)
    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={_map}
                style={styles.map}
                showsUserLocation
                initialRegion={{
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: 41.388587,
                        longitude: 2.180523,
                    }}
                >
                    <Icon name='map-pin' size={50} color='purple'/>
                </Marker>
            </MapView>

            <FlatList 
                style={styles.listContainer}
                data={data}
                horizontal
                renderItem={({ item }) => {
                    return <ListItem item={item}/>
                }}
            />
        </View>
    )
}