import { Stack } from "expo-router";
import { useAuth0, Auth0Provider } from "react-native-auth0";
import config from "../config/auth0-configuration";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
    return (
        <Auth0Provider domain={config.domain} clientId={config.clientId}>
            <AuthProvider>
                <Stack screenOptions={{
                    headerTitle: ''
                }}>
                    <Stack.Screen name="index" />
                </Stack>
            </AuthProvider>
        </Auth0Provider>
    );
}
