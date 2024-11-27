import {StyleSheet, View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import {useEffect, useState} from "react";
import {router} from "expo-router";
import {Picker} from "@react-native-picker/picker";

interface School {
    id: string;
    name: string;
}

export default function ExploreScreen() {
    const [selectedStop, setSelectedStop] = useState<string | undefined>(); // Holds the selected school's ID
    const [stops, setStops] = useState<School[]>([]); // Explicitly type the state as an array of School objects
    const [StudentName, setStudentName] =  useState('')
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [regNumber, setregNumber] = useState('');
    const [Class, setClass] = useState('');

    useEffect(() => {
        submit()
    }, []);

    const submit = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/v1/school/_/stop`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Extract only id and name
                const stopList = result.data.stops.map((stop: any) => ({
                    id: stop.id,
                    name: stop.name,
                }));
                setStops(stopList); // Update the state with the processed schools
            } else {
                Alert.alert("Error", result.message || "Failed to fetch schools");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again later.");
            console.log(error);
        }
    };



    const addingStudent = async () => {
        if(!StudentName || !email) {
            Alert.alert('Error', 'Please fill in all the fields')
            return
        }
        try {
            console.log(JSON.stringify({
                user: {
                    email: email,
                    password: pass,
                    role: "student",
                },
                roleData: {
                    registrationNo: regNumber,
                    name: StudentName,
                    studentClass: Class,
                    schoolID: selectedStop,
                    stopID: stops
                }
            }))
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
                        role: "student",
                    },
                    roleData: {
                        registrationNo: regNumber,
                        name: StudentName,
                        studentClass: Class,
                        stopID: selectedStop
                    },
                }),
            });

            const result = await response.json()
            console.log('Response status:', response.status);

            console.log(result);
            if(response.ok){
                console.log('Student Added Successfully', result)
                Alert.alert('Student has been added')
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
                Create A Student
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Student"
                value={StudentName}
                onChangeText={setStudentName}
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
                placeholder="Registration Number"
                value={regNumber}
                onChangeText={setregNumber}
                keyboardType="web-search"
                autoCapitalize="none"
                placeholderTextColor="#1E1E1E"
            />



            <TextInput
                style={styles.input}
                placeholder="Class"
                keyboardType="web-search"
                value={Class}
                onChangeText={setClass}
                autoCapitalize="none"
                placeholderTextColor="#1E1E1E"
            />

            <Picker
                selectedValue={selectedStop}
                onValueChange={(itemValue) => {
                    setSelectedStop(itemValue); // Set the selected school's ID
                    console.log("Selected School ID:", itemValue);
                }}
                style={{ width: "100%", height: 50, backgroundColor: "#D9D9D9" }} // Adjust width and height
            >
                <Picker.Item label="Select a School" value="" />
                {stops.map((stops) => (
                    <Picker.Item key={stops.id} label={stops.name} value={stops.id} />
                ))}
            </Picker>

            {/*CHNAGE TO ADD BUS*/}
            <TouchableOpacity style={styles.button1} onPress={addingStudent}>
                <Text style={styles.buttonText1}>Add Student</Text>
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



