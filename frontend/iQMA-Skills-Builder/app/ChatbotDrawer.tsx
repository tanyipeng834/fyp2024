import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";

import ChatbotScreen from "./screens/Chatbot";
import React from "react";
import { StyleSheet } from "react-native";

// defines the drawer routes and params
type ChatDrawerParamList = {
    ChatA: {chatId: string};
    ChatB: {chatId: string};
    ChatC: {chatId: string};
    ChatD: {chatId: string};
}

// to know about the route
const Drawer = createDrawerNavigator<ChatDrawerParamList>();

// to ensure receives correct props for rendering drawer content
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />

            <DrawerItem
                label="Close drawer"
                onPress={() => props.navigation.closeDrawer()}
                activeTintColor="#8A2BE2"
                activeBackgroundColor="#8A2BE2"
            />
        </DrawerContentScrollView>
    );
}

// to open left tab for chat bot
const ChatbotDrawer: React.FC<any> = ({navigation}) => (
    // <Drawer.Navigator 
    //     drawerContent={(props) => (
    //     <View style={{flex: 1, paddingTop: 50}}>
    //         <Button title="Close" onPress={() => navigation.goBack()} />
    //         <Button title="Home" onPress={() => navigation.navigate('Home')} />
    //         <Button title="Profile" onPress={() => navigation.navigate('ProfilePage')} />
    //     </View>
    // )}>
    <Drawer.Navigator screenOptions={{
        drawerActiveTintColor: '#8A2BE2',
        drawerLabelStyle: styles.labelItem,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
        {/* need to set initial params or it will be undefined */}
        {/* drawer screen needs to be in navigation level */}
        <Drawer.Screen name="ChatA" component={ChatbotScreen}  initialParams={{ chatId: 'A' }}/>
        <Drawer.Screen name="ChatB" component={ChatbotScreen}  initialParams={{ chatId: 'B' }}/>
        <Drawer.Screen name="ChatC" component={ChatbotScreen}  initialParams={{ chatId: 'C' }}/>

    </Drawer.Navigator>
);


const styles = StyleSheet.create({
    labelItem: {
        padding: 5,
    }
});

export default ChatbotDrawer;