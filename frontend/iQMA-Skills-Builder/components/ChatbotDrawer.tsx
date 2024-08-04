import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, View } from "react-native";

import ChatbotScreen from "../app/screens/Chatbot";

// defines the drawer routes and params
type ChatDrawerParamList = {
    'Decision Making': {chatId: string};
    'Creative Thinking': {chatId: string};
    'Problem Solving': {chatId: string};
    ChatD: {chatId: string};
}

// to know about the route
const Drawer = createDrawerNavigator<ChatDrawerParamList>();

// to ensure receives correct props for rendering drawer content
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View style={styles.bottomDrawerSection}>
                <DrawerItem
                label="Return to Chat"
                onPress={() => props.navigation.closeDrawer()}
                style={styles.closeDrawer}
                />
            </View>
        </DrawerContentScrollView>
    );
}

// to open left tab for chat bot
const ChatbotDrawer: React.FC<any> = ({navigation}) => (
    <Drawer.Navigator screenOptions={{
        drawerActiveTintColor: '#8A2BE2',
        drawerLabelStyle: styles.labelItem,
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
        {/* need to set initial params or it will be undefined */}
        {/* drawer screen needs to be in navigation level */}
        <Drawer.Screen name="Decision Making" component={ChatbotScreen}  initialParams={{ chatId: 'Decision Making' }}/>
        <Drawer.Screen name="Creative Thinking" component={ChatbotScreen}  initialParams={{ chatId: 'Creative Thinking' }}/>
        <Drawer.Screen name="Problem Solving" component={ChatbotScreen}  initialParams={{ chatId: 'Problem Solving' }}/>

        {/* <Drawer.Screen name="Home" component={HomeScreen} /> */}
    </Drawer.Navigator>
);


const styles = StyleSheet.create({
    labelItem: {
        padding: 5,
    },
    closeDrawer: {
        // backgroundColor: '#8A2BE2',
        borderWidth: 1,
        justifyContent: 'center',
    },
    bottomDrawerSection: {
        marginTop: 200,
      },
});

export default ChatbotDrawer;