import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import HeaderText from '@/components/consultation/HeaderText';
import { FontAwesome } from '@expo/vector-icons';
import VoiceInputScreen from '../VoiceInputScreen';

interface TextualAnalysisProps {
  onSubmit: (symptoms: string) => void;
  allergies?: {
    hasAllergies: boolean;
    selectedTypes?: string[];
  };
}

export default function TextualAnalysis({ onSubmit, allergies }: TextualAnalysisProps) {
  const [symptoms, setSymptoms] = useState('');
  const [showVoiceInput, setShowVoiceInput] = useState(false);

  const handleNext = () => {
    onSubmit(symptoms);
    router.push('/consultation/next-step');
  };

  const handleVoiceRecordingComplete = (text: string) => {
    setSymptoms(text);
  };

  return (
    <View style={styles.container}>
      <HeaderText>Textual AI Health Analysis</HeaderText>
      
      {allergies?.hasAllergies && allergies.selectedTypes && (
        <Text style={styles.subtitle}>
          Selected allergies: {allergies.selectedTypes.join(', ')}
        </Text>
      )}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Type your symptoms here..."
          value={symptoms}
          onChangeText={setSymptoms}
          textAlignVertical="top"
        />
      </View>
      <TouchableOpacity 
        style={[styles.continueButton, { marginBottom: 16 }]}
        onPress={() => setShowVoiceInput(true)}
      >
        <FontAwesome name="microphone" size={20} color="#fff" />
        <Text style={[styles.continueText, { marginLeft: 8 }]}>Use Voice Instead</Text>
      </TouchableOpacity>

      <VoiceInputScreen
        visible={showVoiceInput}
        onClose={() => setShowVoiceInput(false)}
        onRecordingComplete={handleVoiceRecordingComplete}
      />

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleNext}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginBottom: 24,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    minHeight: 120,
  },
  continueButton: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#318B76',
    alignItems: 'center',
    marginBottom: 40,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});
