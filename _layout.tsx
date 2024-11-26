import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="smth" options={{ title: 'Other Screen' }} />
            <Stack.Screen name="powerUser" options={{ title: 'Power Home' }} />
            <Stack.Screen name="coordinator" options={{ title: 'Coordinator Home' }} />
        </Stack>
    );
}