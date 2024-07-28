// app/Chatbot.tsx

import {DrawerContentComponentProps, DrawerNavigationProp, DrawerScreenProps} from "@react-navigation/drawer";
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import ChatBubble from "@/components/ChatBubble";
import { ScrollView } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { createStackNavigator } from 'react-navigation-stack';

type DrawerParamList = {
    ChatA: { chatId: string };
    ChatB: { chatId: string };
    ChatC: { chatId: string };
};

// ensurees chatbot screen receives correct props
// use drawerscreenprops to type the props of chatbot screen
type ChatbotScreenProps = DrawerScreenProps<DrawerParamList, 'ChatA' | 'ChatB' | 'ChatC' >;

// Insert api call here - getting response from chatbot
const getChatbotResponse = async (role: string, message: string) => {
    try {
        const response = await fetch(`http://10.0.2.2:8000/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                role: role, 
                content: message, 
            }),
        });
        const data = await response.json();
        return data;
        } catch (error) {
            console.error('Error:', error);
        }
    };

const ChatbotScreen: React.FC<ChatbotScreenProps> = ({ route }) => {
    const {chatId} = route.params;
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
        {text: `Hello! How can I assist you with ${chatId}?`, isUser: false},
    ])
    const handleSend = async () => {
        setMessages([...messages, {text: message, isUser: true}]);
        // getChatbotResponse('User', message).then((response) => {
        //     setMessages([...messages, {text: response.content, isUser: response.role == 'User' ? true : false}]);
        // });
        // setMessages([...messages, { text: message, isUser: true }, { text: `You said: ${message}`, isUser: false }]);
        setMessage('');

        const response = await getChatbotResponse('user', message);
        console.log('Message to send: ', message);
        console.log('Response from pressing Send: ', response);
        if (response) {
            // Add the chatbot response to the chat
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: response.content, isUser: false },
            ]);
          }
    };
    
    const conversation = [
        { text: `Hello! How can I assist you with ${chatId}?`, isUser: false },
        { text: `I need help with ${chatId}.`, isUser: true },
        { text: `Sure, what do you need to know about ${chatId}?`, isUser: false },
        { text: `I want to understand more about its features.`, isUser: true },
        { text: `Okay, let me explain the features of ${chatId}.`, isUser: false }
    ];

    if (!chatId) {
        return (
          <View style={styles.container}>
            <Text>No chat selected</Text>
          </View>
        );
      }
      return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.chatContainer}>
                {messages.map((msg,index) => (
                    <ChatBubble key={index} text={msg.text} isUser={msg.isUser} />
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} 
                value={message} 
                onChangeText={setMessage} 
                placeholder="Type your messsage..."
                onSubmitEditing={handleSend}
                keyboardType="email-address"/> 
                <TouchableOpacity onPress={handleSend}>
                    {/* <Text>Send</Text> */}
                    <AntDesign name="upcircle" size={24} color="#8A2BE2" />
                </TouchableOpacity>
            </View>
        </View>
    );

}


  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    chatContainer: {
        padding: 10,
    },
    inputContainer:{
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#FFFFFF',
    },
    input: {
        flex: 1,
        borderColor: '#CCC',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
    }
});
export default ChatbotScreen;
