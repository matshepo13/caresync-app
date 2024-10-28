import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';

interface VoiceInputScreenProps {
  visible: boolean;
  onClose: () => void;
  onRecordingComplete: (text: string) => void;
}

export default function VoiceInputScreen({ 
  visible, 
  onClose,
  onRecordingComplete 
}: VoiceInputScreenProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [transcribedText, setTranscribedText] = useState('');

  useEffect(() => {
    // Request permissions when component mounts
    Audio.requestPermissionsAsync();
    
    return () => {
      // Cleanup recording when component unmounts
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setTranscribedText(''); // Clear previous text
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      
      // Start speech recognition here
      // Note: This is a simplified example. You'll need to integrate
      // with a real speech-to-text service for production use
      
      setIsRecording(true);
      // Simulate real-time transcription (replace with actual implementation)
      startRealtimeTranscription();
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  // Add this function to handle real-time transcription
  const startRealtimeTranscription = () => {
    // This is where you'd implement real-time speech-to-text
    // For now, we'll just simulate it
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setIsRecording(false);
      setRecording(null);
      
      // Here you would typically:
      // 1. Upload the audio file to your speech-to-text service
      // 2. Get back the transcribed text
      // 3. Call onRecordingComplete with the text
      // For now, we'll just simulate it:
      onRecordingComplete("Sample transcribed text");
      onClose();
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome name="times" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Voice Recognition</Text>
        </View>

        <View style={styles.content}>
          {isRecording ? (
            <Text style={styles.transcribedText}>
              {transcribedText || 'Listening...'}
            </Text>
          ) : (
            <Text style={styles.prompt}>
              Say anything to Dr. Nightingale AI!
            </Text>
          )}
          
          <TouchableOpacity
            style={[styles.micButton, isRecording && styles.micButtonRecording]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <FontAwesome 
              name="microphone" 
              size={32} 
              color={isRecording ? "#FF4444" : "#FFFFFF"} 
            />
          </TouchableOpacity>
          
          {!isRecording && (
            <Text style={styles.readyText}>Ready?</Text>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  prompt: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  micButtonRecording: {
    backgroundColor: '#FFEEEE',
  },
  readyText: {
    fontSize: 18,
    color: '#666666',
  },
  transcribedText: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
    paddingHorizontal: 20,
  },
});
