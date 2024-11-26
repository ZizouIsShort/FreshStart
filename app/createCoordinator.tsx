import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import {useEffect, useState} from "react";
import { Picker } from "@react-native-picker/picker";
import {router} from "expo-router";

// Define the type for school objects
interface School {
    id: string;
    name: string;
}

export default function ExploreScreen() {
    const [selectedSchool, setSelectedSchool] = useState<string | undefined>(); // Holds the selected school's ID
    const [schools, setSchools] = useState<School[]>([]); // Explicitly type the state as an array of School objects
    const[email, setEmail] =  useState('');
    const[pass, setPass] = useState('');
    const[name, setName] = useState('');
        const HoGaya = async () => {
                try {
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
                                role: "coordinator"
                            },
                            roleData: {
                                name: name,
                                schoolID: selectedSchool
                            }
                        })

                    });
                    const result = await response.json()
                    if(response.ok){
                        console.log('School Added Successfully', result)
                        Alert.alert('Coordinator Added Successfully')
                        router.push('/powerUser')
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

    useEffect(() => {
        submit()
    }, []);
    const submit = async () => {
        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/v1/school`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Extract only id and name
                const schoolList = result.data.schools.map((school: any) => ({
                    id: school.id,
                    name: school.name,
                }));
                setSchools(schoolList); // Update the state with the processed schools
            } else {
                Alert.alert("Error", result.message || "Failed to fetch schools");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again later.");
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={submit}>
                <Text style={styles.txt}>Create A Coordinator</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input}
                placeholder="Coordinator Name"
                value={name}
                onChangeText={setName}
                keyboardType="web-search"
                autoCapitalize="none"
                placeholderTextColor="#1E1E1E"
            />
            <TextInput
                style={styles.input}
                placeholder="Coordinator Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="web-search"
                autoCapitalize="none"
                placeholderTextColor="#1E1E1E"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={pass}
                onChangeText={setPass}
                keyboardType="web-search"
                autoCapitalize="none"
                placeholderTextColor="#1E1E1E"
            />

            <Picker
                selectedValue={selectedSchool}
                onValueChange={(itemValue) => {
                    setSelectedSchool(itemValue); // Set the selected school's ID
                    console.log("Selected School ID:", itemValue);
                }}
                style={{ width: "100%", height: 50, backgroundColor: "#D9D9D9" }} // Adjust width and height
            >
                <Picker.Item label="Select a School" value="" />
                {schools.map((school) => (
                    <Picker.Item key={school.id} label={school.name} value={school.id} />
                ))}
            </Picker>
            <TouchableOpacity style={styles.button1} onPress={HoGaya}>
                <Text style={styles.buttonText1}>Add Coordinator</Text>
            </TouchableOpacity>
        </View>
    );
    }


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#e8dddc",
        alignItems: "center",
        height: "45%",
        margin: "auto",
        width: "75%",
        padding: 20,
        borderRadius: 15,
    },
    input: {
        width: "75%",
        height: 40,
        marginBottom: 25,
        paddingHorizontal: 10,
        borderRadius: 13,
        backgroundColor: "#D9D9D9",
    },
    button1: {
        backgroundColor: "#84D6F4",
        padding: 10,
        borderRadius: 5,
    },
    buttonText1: {
        color: "black",
        fontSize: 16,
    },
    txt: {
        fontSize: 16,
    },
});
