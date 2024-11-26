import React, { useState, useEffect } from 'react';
import {Platform, Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, {Marker} from "react-native-maps";

export default function App() {
    const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const kahaHai = async () => {
        try{
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/v1/school/_/bus/_/location`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({latitude: latitude,longitude: longitude})
            })
            const result = await response.json();
            if (response.ok && result.success) {
                console.log(result)
            }
            else {
                console.log('Error')
            }

        }
        catch (error) {
            console.log('Something happened', error)
        }
    }

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude);
            setLocation(location.coords);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    console.warn("latitude: ", latitude);
    console.warn("longitude: ", longitude);

    setInterval(kahaHai, 2000);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.naamKaam}>
                    <Text style={styles.naam}>Driver Bhai</Text>
                    <Text style={styles.kaam}>Driver</Text>
                </View>
                <View style={styles.rightWaala}>
                    <Image source={require('../assets/btnNotifications.png')}/>
                    <Image source={require('../assets/01.png')}/>
                </View>
            </View>
            <View style={styles.belowHeader}>
                <Image source={require('../assets/img.png')}/>
                <Text style={styles.wlcm}>Welcome Driver</Text>
            </View>
            <Text style={styles.task}>My Location</Text>
            <View style={styles.container1}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: latitude,
                        longitude: longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: latitude,
                            longitude: longitude,
                        }}
                        title="Student Location"
                        description="This is a marker for Student Current Location"
                    />
                </MapView>
            </View>
            <TouchableOpacity onPress={kahaHai}>
                <Text style={styles.task}>Send Location</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container1: {
        width: "80%",
        height: "45%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: "center",
    },
    header: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        height: '15%',
        backgroundColor: '#509DB9',
        borderBottomLeftRadius: 13,
        borderBottomRightRadius: 13,
        width: '100%',
    },
    naamKaam: {
        flexDirection: "column",
        marginLeft: '10%',
    },
    naam: {
        fontSize: 20,
        marginBottom: 2,
        color: '#ffffff',
    },
    kaam: {
        color: '#ffffff',
    },
    rightWaala: {
        width: '15%',
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: '10%',
    },
    belowHeader: {
        flexDirection: "row",
        backgroundColor: '#84D6F4',
        alignItems: 'center',
        marginTop: '6%',
        justifyContent: "center",
        padding: 15,
        borderRadius: 5,
    },
    wlcm: {
        fontSize: 25,
        color: '#ffffff',
    },
    task: {
        fontSize: 25,
        marginTop: 60,
    },
    taskDiv: {
        backgroundColor: '#90DEFB',
        flexDirection: "row",
        width: '90%',
        justifyContent: 'space-between',
        height: '10%',
        padding: 15,
        marginTop: 15,
        borderRadius: 5,
    },
    div1: {
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    div2: {
        flexDirection: 'column',
        justifyContent: "space-between",
    },
    txt: {
        color: '#007B7F',
    },
    map: {
        marginTop: 60,
        flex: 1,
        width: '75%',
        height: '50%',
    },
    badaDiv: {
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: '#FFFFFF',
        height: '25%',
        width: '75%',
        marginTop: 15,

    },
    chotaDiv: {
        flexDirection: "column",
        backgroundColor: '#90DEFB',
        height: '35%',
        alignItems: "center",
        padding: 10,
        borderRadius: 7.5,
        justifyContent: "space-between",
    },
});
