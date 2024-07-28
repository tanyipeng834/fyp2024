import React from 'react';
import { View, Image, ImageSourcePropType } from 'react-native';
import { Stack } from "expo-router";
import { useAuth0, Auth0Provider } from "react-native-auth0";
import config from "../config/auth0-configuration";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout() {
    return (
        <Auth0Provider domain={config.domain} clientId={config.clientId}>
            <AuthProvider>
                <Stack screenOptions={{
                    headerTitle: '',
                    headerTitleAlign: 'center'
                }}>
                    <Stack.Screen name="index" />
                    <Stack.Screen 
                        name="LearnerAssessmentDemographics" 
                        options={{ headerTitle: () => <Header imageName="progress-bar-1" /> }}
                    />
                </Stack>
            </AuthProvider>
        </Auth0Provider>
    );
}

const images: { [key: string]: ImageSourcePropType } = {
    'progress-bar-1': require('@/assets/images/progress-bar-1.png'),
};

const Header = ({ imageName } : { imageName: string }) => (
    <View>
        <Image source={images[imageName]}/>
    </View>
);