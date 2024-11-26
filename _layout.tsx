import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="smth" options={{ title: 'Other Screen' }} />
            <Stack.Screen name="powerUser" options={{ title: 'Power Home' }} />
            <Stack.Screen name="coordinator" options={{ title: 'Coordinator Home' }} />
            <Stack.Screen name="home-student" options={{ title: 'Home Student' }} />
            <Stack.Screen name="createSchool" options={{title: 'Creating School'}}/>
            <Stack.Screen name="driver" options={{title: 'Driver'}}/>
            <Stack.Screen name="createDriver" options={{title: 'Creating Driver'}}/>
            <Stack.Screen name="createBus" options={{title: 'Creating Bus'}}/>
            <Stack.Screen name="createCoordinator" options={{title: 'Creating Coordinator'}}></Stack.Screen>
        </Stack>
    );
}