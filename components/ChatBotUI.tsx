import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getOpenAIResponse } from '@/services/openaiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatBotUIProps {
  initialMessage: string;
  onClose: () => void;
}

const ChatBotUI: React.FC<ChatBotUIProps> = ({ initialMessage, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (initialMessage) {
      setMessages([
        { id: '1', text: initialMessage, sender: 'user' },
      ]);
      handleBotResponse(initialMessage);
    }
  }, []);

  const handleBotResponse = async (userMessage: string) => {
    try {
      const apiMessages = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));
      apiMessages.push({ role: 'user', content: userMessage });

      const botResponse = await getOpenAIResponse(apiMessages);
      const newBotMessage: Message = { id: Date.now().toString(), text: botResponse, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, newBotMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorMessage: Message = { id: Date.now().toString(), text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = { id: Date.now().toString(), text: inputText, sender: 'user' };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setInputText('');
      handleBotResponse(inputText);
    }
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CareSync AI</Text>
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.messageBubble, item.sender === 'user' ? styles.userMessage : styles.botMessage]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message..."
          />
          <TouchableOpacity onPress={handleSend}>
            <Ionicons name="send" size={24} color="#40E0D0" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#40E0D0',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
});

export default ChatBotUI;
