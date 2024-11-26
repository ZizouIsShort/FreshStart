import {StyleSheet, View, Text, TextInput, TouchableOpacity, Alert} from "react-native";
import {useState} from "react";
import {router} from "expo-router";

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
        <View style={styles.container}>
            <Text style={styles.txt}>
                Create A School
            </Text>
            <TextInput
                style={styles.input}
                placeholder="School Name"
                value={skNm}
                onChangeText={setSchoolName}
                keyboardType="web-search"
                autoCapitalize="none"
                placeholderTextColor="#1E1E1E"
            />
            <TextInput
                style={styles.input}
                placeholder="School Location"
                keyboardType="web-search"
                value={skLoc}
                onChangeText={setSchoolLoc}
                autoCapitalize="none"
                placeholderTextColor="#1E1E1E"
            />
            <TouchableOpacity style={styles.button1} onPress={addingSchool}>
                <Text style={styles.buttonText1}>Add School</Text>
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
        height: '35%',
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



