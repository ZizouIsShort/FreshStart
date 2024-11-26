import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from '../../screens/home-student';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <SafeAreaProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                </Stack.Navigator>
        </SafeAreaProvider>
    );
}

