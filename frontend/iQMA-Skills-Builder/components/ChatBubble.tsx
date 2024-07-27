import { StyleSheet, Text, View } from 'react-native';

import React from 'react';

type ChatBubbleProps = {
    text: string;
    isUser: boolean;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isUser }) => {
    return (
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    bubble: {
        padding: 10,
        borderRadius: 20,
        marginVertical: 5,
        maxWidth: '80%',
    },
    userBubble: {
        alignSelf: 'flex-end',
        backgroundColor: '#8A2BE2',
        color: '#FFFFFF',
    },
    botBubble: {
        alignSelf: 'flex-start',
        backgroundColor: '#D3CCE3',
    },
    text: {
        color: '#000',
    },
});

export default ChatBubble;
