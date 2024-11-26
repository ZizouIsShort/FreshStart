import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Menu, User, Home, Plus, UserCircle, ChevronRight, LocateIcon } from 'lucide-react-native';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from "expo-router";

interface ApiResponse {
    success: boolean;
    message: string;
    data: {
        user: {
            id: string;
            email: string;
            image: string;
            role: string;
            registrationNo: string;
            name: string;
            studentClass: string;
            stopID: string;
            busID: string;
            schoolID: string;
        }
    }
}
interface ApiResponse2{
    success: boolean;
    message: string;
    data: {
        location: {
            longitude: string;
            latitude: string;
        }
    }
}

export default function HomeScreen() {
    const [studentData, setStudentData] = useState<ApiResponse | null>(null);
    const [studentLocation, setStudentLocation] = useState<ApiResponse2 | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchStudentData();
        fetchStudentLocation();
    }, []);

    const fetchStudentData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/v1/auth/_`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result: ApiResponse = await response.json();

            if (result.success && result.data?.user) {
                setStudentData(result);
                setError(null);
            } else {
                setError(result.message || 'No user data found');
                setStudentData(null);
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
            setError(error instanceof Error ? error.message : 'Network error');
            setStudentData(null);
        } finally {
            setLoading(false);
        }
    };
    const fetchStudentLocation = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.EXPO_PUBLIC_HOST}/v1/student/_/location`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result: ApiResponse2 = await response.json();

            if (result.success) {
                setStudentLocation(result);
                setError(null);
            } else {
                setError(result.message || 'No user data found');
                setStudentLocation(null);
            }
        } catch (error) {
            console.error('Error fetching student data:', error);
            setError(error instanceof Error ? error.message : 'Network error');
            setStudentLocation(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (error || !studentData) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Error: {error || 'No user data available'}</Text>
            </SafeAreaView>
        );
    }


    return (
        <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.name}>{studentData.data.user.name} </Text>
                    <Text style={styles.role}>{studentData.data.user.role}</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Bell color="#fff" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Menu color="#fff" size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.contentWrapper}>
                <ScrollView style={styles.content}>

                    <View style={styles.welcomeCard}>
                        <User color="#fff" size={24} />
                        <Text style={styles.welcomeText}>{studentData.data.user.email}</Text>
                    </View>


                    <View style={styles.tasksSection}>
                        <Text style={styles.sectionTitle}>Tasks</Text>
                        <TouchableOpacity style={styles.taskCard}>
                            <View>
                                <Text style={styles.taskTitle}>Reg No. : {studentData.data.user.registrationNo}</Text>
                                <Text style={styles.taskStatus}>{studentData.data.user.studentClass}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {studentLocation && studentLocation.data && (
                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: parseFloat(studentLocation.data.location.latitude),
                                    longitude: parseFloat(studentLocation.data.location.longitude),
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: parseFloat(studentLocation.data.location.latitude),
                                        longitude: parseFloat(studentLocation.data.location.longitude),
                                    }}
                                    title="Student Location"
                                    description="This is a marker for Student Current Location"
                                />
                            </MapView>
                        </View>
                    )}

                </ScrollView>
            </View>

            <View style={styles.bottomNav}>
                <View style={styles.fetchLocationContainer}>
                    <TouchableOpacity style={styles.fetchLocationButton} onPress={fetchStudentLocation}>
                        <LocateIcon color="#fff" size={24} />
                        <Text style={styles.fetchLocationText}>Fetch Location</Text>
                    </TouchableOpacity>
                </View>
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
        width: '100%',
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
    contentWrapper: {
        flex: 1,
        width: '100%',
    },
    content: {
        flexGrow: 1,
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
        height: 300,
        borderRadius: 12,
        overflow: 'hidden',
    },
    map: {
        flex: 1,
    },
    fetchLocationContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    fetchLocationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#75B5D3',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    fetchLocationText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        width: '100%',
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

