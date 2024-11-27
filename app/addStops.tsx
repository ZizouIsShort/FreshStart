import {useEffect, useState} from "react";
import {Alert, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import {router} from "expo-router";

export default function stops() {
    const [lat, setLat] = useState("");
    const [long, setLong] = useState("");
    const [stopName, setStopName] = useState("");
    const [bus, setBus] = useState({} as { id: string, busNo: string });
    const [buses, setBuses] = useState([]);

    const fetchBuses = async () => {
        const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/v1/school/_/bus`, {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            },
            credentials: "include"
        })

        const result = await response.json()
        if (response.ok) {
            console.log(result)
            setBuses(result.data.buses)
        }
    }

    useEffect(() => {
        fetchBuses()
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.txt}>
                Add a Stop
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Stop Name"
                value={stopName}
                onChangeText={setStopName}
                keyboardType="web-search"
                autoCapitalize="none"
                placeholderTextColor="#1E1E1E"
            />

            <TextInput
                style={styles.input}
                placeholder="23.259668"
                defaultValue={"23.259668"}
                value={lat}
                onChangeText={setLat}
                keyboardType="web-search"
                autoCapitalize="none"
                placeholderTextColor="#1E1E1E"
            />

            <TextInput
                style={styles.input}
                placeholder="72.650257"
                defaultValue={"72.650257"}
                value={long}
                onChangeText={setLong}
                keyboardType="web-search"
                autoCapitalize="none"
                placeholderTextColor="#1E1E1E"
            />

            <Picker
                selectedValue={bus}
                onValueChange={(itemValue) => {
                    setBus(itemValue); // Set the selected school's ID
                    console.log("Selected School ID:", itemValue);
                }}
                style={{width: "100%", height: 50, backgroundColor: "#D9D9D9"}} // Adjust width and height
            >
                <Picker.Item label="Select a Bus" value=""/>
                {buses.map((bus: { id: string, busNo: string }) => (
                    <Picker.Item key={bus.id} label={bus.busNo.toString()} value={bus.id}/>
                ))}
            </Picker>

            <TouchableOpacity style={styles.button1} onPress={async () => {
                const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/v1/school/_/bus/${bus}/stop`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        name: stopName,
                        latitude: lat,
                        longitude: long
                    })
                })

                const result = await response.json()
                console.log('Response status:', response.status);

                console.log(result);
                if (response.ok) {
                    console.log('Stop Added Successfully', result)
                    Alert.alert('Stop has been added')
                    router.push('/coordinator')
                } else {
                    Alert.alert('Error', result.message || 'Adding Failed');
                }
            }}>
                <Text style={styles.buttonText1}>Add Student</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#e8dddc',
        alignItems: "center",
        height: '65%',
        margin: "auto",
        width: '75%',
        padding: 20,
        borderRadius: 15,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    input: {
        width: '75%',
        height: 40,
        marginBottom: 25,
        paddingHorizontal: 10,
        borderRadius: 13,
        backgroundColor: '#D9D9D9',
    },
    button1: {
        backgroundColor: '#84D6F4',
        padding: 10,
        borderRadius: 5,
    },
    buttonText1: {
        color: 'black',
        fontSize: 16,
    },
    txt: {
        fontSize: 16,
    }
});