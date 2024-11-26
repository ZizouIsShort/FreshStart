import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useState } from 'react';
import { Image } from 'expo-image';
import { router } from "expo-router";


export default function App() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if(!email || !password) {
            Alert.alert('Error', 'Please fill in all the fields')
            return
        }
        try {
            console.log(email, password)
            console.log('ur', process.env.EXPO_PUBLIC_HOST)
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/v1/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({email, password})
            });
            const result = await response.json()
            if(response.ok){
                console.log('Login Successful', result)
                const role = result.success_prop.data.role;
                if (role == 'power') {
                    router.push('/powerUser')
                }
                else if (role == 'student') {
                    router.push('/home-student')
                }
                else if(role == 'coordinator') {
                    router.push('/coordinator')
                }
                else if(role == 'driver') {
                    router.push('/driver')
                }
                else {
                    router.push('/explore')
                }
            }
            else{
                Alert.alert('Error', result.message || 'Login Failed');
            }
        }
        catch (error) {
            Alert.alert('Error', 'Something went wrong please try again later')
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.div}>
                <Image
                    source={require('../assets/Logo.png')}
                    style={styles.image}
                />
            </View>
            <View style={styles.div2}>
                <Text style={styles.title}>Way-Track</Text>
                <View style={styles.ipdiv}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#1E1E1E"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholderTextColor="#1E1E1E"
                    />
                </View>
                <View style={styles.buttondiv}>
                    <TouchableOpacity style={styles.button1} onPress={handleLogin}>
                        <Text style={styles.buttonText1}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={handleLogin}>
                        <Text style={styles.buttonText2}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    div: {
        height: '50%',
        width: '100%',
    },
    ipdiv: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    div2: {
        flexDirection: 'column',
        height: '50%',
        backgroundColor: '#FFFFFF',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingTop: 0,
    },
    buttondiv: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        width: '50%',
        justifyContent: 'space-between',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 39,
        marginBottom: 20,
        color: '#509DB9',
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
    button2: {
        backgroundColor: '#FF7C76',
        padding: 10,
        borderRadius: 5,
    },
    buttonText1: {
        color: 'black',
        fontSize: 16,
    },
    buttonText2: {
        color: 'white',
        fontSize: 16,
    }
})