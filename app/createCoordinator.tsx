import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React, {useEffect, useState} from "react";
import { Picker } from "@react-native-picker/picker";
import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";

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
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Create A Coordinator</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Coordinator Name"
                            value={name}
                            onChangeText={setName}
                            autoCapitalize="words"
                            placeholderTextColor="#6B7280"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Coordinator Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#6B7280"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={pass}
                            onChangeText={setPass}
                            secureTextEntry
                            autoCapitalize="none"
                            placeholderTextColor="#6B7280"
                        />
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedSchool}
                                onValueChange={(itemValue) => {
                                    setSelectedSchool(itemValue);
                                    console.log("Selected School ID:", itemValue);
                                }}
                                style={styles.picker}
                            >
                                <Picker.Item label="Select a School" value="" />
                                {schools.map((school) => (
                                    <Picker.Item key={school.id} label={school.name} value={school.id} />
                                ))}
                            </Picker>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={HoGaya}>
                            <Text style={styles.buttonText}>Add Coordinator</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
        fontSize: 16,
        color: '#1F2937',
    },
    pickerContainer: {
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    button: {
        backgroundColor: '#3B82F6',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    }
});