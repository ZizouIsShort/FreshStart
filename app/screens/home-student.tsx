import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Menu, User, Home, Plus, UserCircle, ChevronRight } from 'lucide-react-native';
import MapView from 'react-native-maps';
import {useNavigation} from "expo-router";

export default function HomeScreen() {
    let Name;
    const [studentData, setStudentData] = useState(null);
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/v1/student/details`, {
                    headers: { Authorization: `Bearer YOUR_ACCESS_TOKEN` },
                });
                setStudentData(await response.json());
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchStudentData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={styles.name}>{studentData.name}</Text>
                    <Text style={styles.role}>Role</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Bell color="#000" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Menu color="#000" size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.content}>
                <View style={styles.welcomeCard}>
                    <User color="#fff" size={24} />
                    <Text style={styles.welcomeText}>Welcome { Name } !</Text>
                </View>

                {/* Tasks Section */}
                <View style={styles.tasksSection}>
                    <Text style={styles.sectionTitle}>Tasks</Text>
                    <TouchableOpacity style={styles.taskCard}>
                        <View>
                            <Text style={styles.taskTitle}>Track Bus</Text>
                            <Text style={styles.taskStatus}>Ongoing</Text>
                        </View>
                        <ChevronRight color="#000" size={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                </View>
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Home color="#75B5D3" size={24} />
                    <Text style={styles.navText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.addButton}>
                    <Plus color="#fff" size={32} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <UserCircle color="#75B5D3" size={24} />
                    <Text style={styles.navText}>Profile</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#75B5D3',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    role: {
        fontSize: 16,
        color: '#fff',
    },
    headerIcons: {
        flexDirection: 'row',
        gap: 16,
    },
    iconButton: {
        padding: 4,
    },
    content: {
        flex: 1,
    },
    welcomeCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        margin: 16,
        padding: 16,
        backgroundColor: '#75B5D3',
        borderRadius: 12,
    },
    welcomeText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '500',
    },
    tasksSection: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    taskCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#E6F4F9',
        borderRadius: 12,
    },
    taskTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    taskStatus: {
        fontSize: 14,
        color: '#666',
    },
    mapContainer: {
        margin: 16,
        height: 200,
        borderRadius: 12,
        overflow: 'hidden',
    },
    map: {
        flex: 1,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: '#75B5D3',
        marginTop: 4,
    },
    addButton: {
        backgroundColor: '#75B5D3',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
});

