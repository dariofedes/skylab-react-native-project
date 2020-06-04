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
    let _list = useRef(null)

    const [data, setData] = useState([])
    const [selectedItemId, setSelectedItemId] = useState(null)
    const [coords, setCoords] = useState({
        latitude: 28.485833,
        longitude: -80.544444,
    })

    useEffect(() => {
        // getLocation()
        getLandingData()

        // return () => stopTrackingLocation()
    }, [])

    const receiveCoords = coords => {
        setCoords(coords);
        

        _map && _map.current.animateCamera({
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

        // const newCoords = {
        //     latitude: result[0].location.latitude,
        //     longitude: result[0].location.longitude,
        // }

        // receiveCoords(newCoords)
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
                {/* <Marker
                    coordinate={{
                        latitude: 41.388587,
                        longitude: 2.180523,
                    }}
                >
                    <Icon name='map-pin' size={50} color='purple'/>
                </Marker> */}

                {data.map(landing => {
                    return <Marker
                        key={landing.id}
                        title={landing.full_name}
                        pinColor={selectedItemId === landing.id ? 'purple' : 'red'}
                        coordinate={{
                            latitude: landing.location.latitude,
                            longitude: landing.location.longitude,
                        }}
                    />
                })}
            </MapView>

            {/* <MapView
                ref={_map}
                style={styles.map}
                showsUserLocation
                showsCompass={false}
                initialRegion={{
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                }}
            /> */}

            <FlatList 
                ref={_list}
                style={styles.listContainer}
                data={data}
                horizontal
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                    return <ListItem item={item} onPress={() => {
                        setSelectedItemId(item.id)

                        _list.current.scrollToIndex({ animated: true, index })

                        _map.current.animateCamera({
                            center: {
                                latitude: item.location.latitude,
                                longitude: item.location.longitude
                            },
                            heading: 180,
                        });
                    }}/>
                }}
            />
        </View>
    )
}