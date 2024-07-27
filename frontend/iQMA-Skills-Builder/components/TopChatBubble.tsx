import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TopChatBubble = ({ message }: { message: string }) => {
    return (
        <View style={styles.container}>
            <View style={styles.arrowContainer}>
                <View style={styles.arrow} />
            </View>
            <View style={styles.bubble}>
                <Text style={styles.text}>{message}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  bubble: {
    maxWidth: '80%',
    backgroundColor: "#7654F2",
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    position: 'relative',
  },
  text: {
    color: "#fff"
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -10,
    left: 20
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#7654F2',
    marginBottom: -2,
  },
});