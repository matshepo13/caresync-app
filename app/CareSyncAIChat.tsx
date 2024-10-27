import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getUserDetails } from '@/app/(authenticated)/userService';
import ChatBotUI from '@/components/ChatBotUI';

const CareSyncAIChat = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [showChat, setShowChat] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [userDetails, setUserDetails] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (id) {
        try {
          const details = await getUserDetails(id as string);
          if (details) {
            setUserDetails(details);
            setInitialMessage(`Hello AI Doc, I am Matshepo, I have this condition Rheumatoid Arthritis, I need your help today`);
          } else {
            console.error('User details not found');
            Alert.alert('Error', 'User details not found. Please try again.');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
          Alert.alert('Error', 'Failed to load user details. Please try again.');
        }
      }
    };
    fetchUserDetails();
  }, [id]);

  const handleNewConversation = () => {
    if (userDetails) {
      setShowChat(true);
    } else {
      console.error('User details not loaded');
      Alert.alert('Error', 'Unable to load user details. Please try again.');
    }
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  if (showChat) {
    return <ChatBotUI initialMessage={initialMessage} onClose={handleCloseChat} />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/img1.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Your Medical AI Companion</Text>
      <Text style={styles.subtitle}>
        Here to help you with your health concerns.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleNewConversation}>
        <Text style={styles.buttonText}>New Conversation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F0F8FF',
  },
  image: {
    width: 200,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  button: {
    backgroundColor: '#40E0D0',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CareSyncAIChat;
