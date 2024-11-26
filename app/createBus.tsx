import {StyleSheet, View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import {Picker} from "@react-native-picker/picker";
interface Driver {
    id: string;
    name: string;
}

export default function ExploreScreen() {
    const[Busnum, setBusNum] =  useState('');
    const[Platenum, setPlateNum] = useState('');
    const [drivers, setDrivers] = useState<Driver[]>([]);
    const [selectedDriver, setSelectedDriver] = useState<string | undefined>();
    useEffect(() => {
        fetchDrivers()
    }, []);

    const fetchDrivers = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/v1/school/_/driver`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Extract only id and name
                const driverList = result.data.drivers.map((driver: any) => ({
                    id: driver.id,
                    name: driver.name,
                }));
                setDrivers(driverList); // Update the state with the processed schools
            } else {
                Alert.alert("Error", result.message || "Failed to fetch Buses");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again later.");
            console.log(error);
        }
    };

    // const addingBus = async () => {
    //     if(!Busnum || !Platenum) {
    //         Alert.alert('Error', 'Please fill in all the fields')
    //         return
    //     }
    //     try {
    //         console.log(Busnum, Platenum)
    //         const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/v1/school/_/bus`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             credentials: 'include',
    //             body:JSON.stringify({busNo: Busnum, registrationNo: Platenum})
    //         });
    //         const result = await response.json()
    //         if(response.ok){
    //             console.log('Bus Added Successfully', result)
    //             Alert.alert('Bus has been added')
    //             router.push('/coordinator')
    //         }
    //         else{
    //             Alert.alert('Error', result.message || 'Adding Failed');
    //         }
    //     }
    //     catch (error) {
    //         Alert.alert('Error', 'Something went wrong please try again later')
    //         console.log(error)
    //     }
    // }
    const HoGaya = async () => {
        if(!Busnum || !Platenum) {
                    Alert.alert('Error', 'Please fill in all the fields')
                    return
                }
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/v1/school/_/bus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                        registrationNo: Platenum,
                        busNo: Busnum,
                        driverID:selectedDriver
                })

            });
            const result = await response.json()
            if(response.ok){
                console.log('Bus Added Successfully', result)
                Alert.alert('Bus Added Successfully')
                router.push('/coordinator')
            }
            else{
                Alert.alert('Error', result.message || 'Adding Failed');
            }
        }
        catch (error) {
            Alert.alert('Error', 'Something went wrong please try again later')
            console.log(error)
        }
    }





    return (
    <View style={styles.container}>
        <Text style={styles.txt}>
            Create A Bus
        </Text>
        <TextInput
            style={styles.input}
            placeholder="Bus Number"
            value={Busnum}
            onChangeText={setBusNum}
            keyboardType="web-search"
            autoCapitalize="none"
            placeholderTextColor="#1E1E1E"
        />
        <TextInput
            style={styles.input}
            placeholder="Registration Number"
            keyboardType="web-search"
            value={Platenum}
            onChangeText={setPlateNum}
            autoCapitalize="none"
            placeholderTextColor="#1E1E1E"
        />
        <Picker
            selectedValue={selectedDriver}
            onValueChange={(itemValue) => {
                setSelectedDriver(itemValue); // Set the selected school's ID
                console.log("Selected Driver ID:", itemValue);
            }}
            style={{ width: "100%", height: 50, backgroundColor: "#D9D9D9", }} // Adjust width and height
        >
            <Picker.Item label="Select a Driver" value="" />
            {drivers.map((driver) => (
                <Picker.Item key={driver.id} label={driver.name} value={driver.id} />
            ))}
        </Picker>
        {/*CHNAGE TO ADD BUS*/}
        <TouchableOpacity style={styles.button1} onPress={HoGaya}>
            <Text style={styles.buttonText1}>Add Bus</Text>
        </TouchableOpacity>
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#e8dddc',
        alignItems: "center",
        height: '45%',
        margin: "auto",
        width: '75%',
        padding: 20,
        borderRadius: 7,
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
        borderRadius: 7,
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