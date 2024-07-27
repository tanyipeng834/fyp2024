// import './gesture-handler';

import 'react-native-gesture-handler';

import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Auth0Provider, useAuth0 } from "react-native-auth0";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { useEffect, useState } from "react";

import { AuthProvider } from "@/context/AuthContext";
import ChatbotDrawer from "./ChatbotDrawer";
import ChatbotScreen from "./screens/Chatbot";
import { ColorProperties } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import HomeScreen from "./screens/Home";
import { Image } from "react-native";
import ProfilePage from "./screens/ProfilePage";
import { Stack } from "expo-router";
import config from "../config/auth0-configuration";
import { create } from "react-test-renderer";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import useColorScheme from "@/hooks/useColorScheme";

const LogoTitle = () => {
    return (
    <View style= {styles.container}>
        <Image source={{uri: 'https://reactjs.org/logo-og.png'}}
        style={styles.logo} />
        <Text style={styles.title}>IQMA Skills Builder</Text>
    </View>
    );
  }

const Tab = createBottomTabNavigator();

// for bottom tabs
const AppTabs: React.FC = () => {
    const colorScheme = useColorScheme();
    const tabBarOptions = {
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#BBBBBB',
        style: {
            backgroundColor: '#8A2BE2',
        },
    }
    return (
        // screen options expects an object or a function that returns an object
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerTitle(props) {
        return <LogoTitle />;
      },
      headerStyle: { backgroundColor: '#8A2BE2' },
      tabBarActiveTintColor: tabBarOptions.activeTintColor,
      tabBarInactiveTintColor: tabBarOptions.inactiveTintColor,
      tabBarStyle: tabBarOptions.style,
    })}>
      <Tab.Screen name="screens/Home" component={HomeScreen} options={{ title: 'Home Page' }}/>
      <Tab.Screen name="screens/Chatbot" component={ChatbotDrawer} options={{ title: 'Chat With Me' }}/>
      <Tab.Screen name="screens/ProfilePage" component={ProfilePage} options={{ title: 'Profile' }}/>
    </Tab.Navigator>
  );
}

// place to put ur headers, footers, and other layout components
export default function RootLayout() {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    },[]);
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#8A2BE2" />
            </View>
          );
    }
    return (
        <Auth0Provider domain={config.domain} clientId={config.clientId}>
            <AuthProvider>
                {/* <NavigationContainer> */}
                    {/* <Stack>
                        <Stack.Screen name="index" />
                    </Stack> */}
                    <AppTabs />
                {/* </NavigationContainer> */}
            </AuthProvider>
        </Auth0Provider>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    logo: {
        width: 25,
        height: 25,
    },
    title: {
        fontSize: 18,
        color: '#fff', 
    },
});