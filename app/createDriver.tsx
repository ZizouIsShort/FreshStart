import {StyleSheet, View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import {useState} from "react";
import {router} from "expo-router";

export default function ExploreScreen() {
    const[driverName, setDriverName] =  useState('');
    const[Contact, setContact] = useState('');
    const[email, setEmail] = useState('');
    const[pass, setPass] = useState('');
    const addingDriver = async () => {
        if(!driverName || !Contact) {
            Alert.alert('Error', 'Please fill in all the fields')
            return
        }
        try {
            console.log(driverName, Contact, email, pass)
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/v1/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    user: {
                        email: email,
                        password: pass,
                        role: "driver",
                    },
                    roleData: {
                        name: driverName,
                        contactNo: Contact,
                    },
                }),
            });
            const result = await response.json()
            if(response.ok){
                console.log('Driver Added Successfully', result)
                Alert.alert('Driver has been added')
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
                Create A Driver
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Driver name"
                value={driverName}
                onChangeText={setDriverName}
                keyboardType="web-search"
                autoCapitalize="none"
                placeholderTextColor="#1E1E1E"
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="web-search"
                autoCapitalize="none"
                placeholderTextColor="#1E1E1E"
            />

            <TextInput
                style={styles.input}
                placeholder="Pass"
                value={pass}
                onChangeText={setPass}
                keyboardType="web-search"
                autoCapitalize="none"
                placeholderTextColor="#1E1E1E"
            />

            <TextInput
                style={styles.input}
                placeholder="Contact Number"
                keyboardType="web-search"
                value={Contact}
                onChangeText={setContact}
                autoCapitalize="none"
                placeholderTextColor="#1E1E1E"
            />
            {/*CHNAGE TO ADD BUS*/}
            <TouchableOpacity style={styles.button1} onPress={addingDriver}>
                <Text style={styles.buttonText1}>Add Driver</Text>
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

