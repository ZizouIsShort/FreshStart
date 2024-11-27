import {StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import {router} from "expo-router";
import React, { useState } from 'react';;
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExploreScreen() {
    const[skNm, setSchoolName] =  useState('');
    const[skLoc, setSchoolLoc] = useState('');



    const addingSchool = async () => {
        if(!skNm || !skLoc) {
            Alert.alert('Error', 'Please fill in all the fields')
            return
        }
        try {
            console.log(skNm, skLoc)
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/v1/school`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({name: skNm,location: skLoc})
            });
            const result = await response.json()
            if(response.ok){
                console.log('School Added Successfully', result)
                Alert.alert('School has been added')
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.formContainer}>
                    <Text style={styles.title}>Create A School</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="School Name"
                        value={skNm}
                        onChangeText={setSchoolName}
                        keyboardType="default"
                        autoCapitalize="words"
                        placeholderTextColor="#6B7280"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="School Location"
                        value={skLoc}
                        onChangeText={setSchoolLoc}
                        keyboardType="default"
                        autoCapitalize="words"
                        placeholderTextColor="#6B7280"
                    />
                    <TouchableOpacity style={styles.button} onPress={addingSchool}>
                        <Text style={styles.buttonText}>Add School</Text>
                    </TouchableOpacity>
                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 400,
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
    },
});



