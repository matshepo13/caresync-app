import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Text } from '@/components/Themed';
import { styles } from '../(login)/loginstyle';
import { useRouter } from 'expo-router';
import { checkIdInFirestore } from '@/app/(authenticated)/userService';

export default function IdEntryScreen() {
  const [medicalRecordNumber, setMedicalRecordNumber] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      console.log('Submitting Medical Record Number:', medicalRecordNumber); // Debugging statement
      const isValidId = await checkIdInFirestore(medicalRecordNumber, 'DoctorsList');
      console.log('Is valid ID:', isValidId); // Debugging statement
      if (isValidId) {
        router.push({
          pathname: '/(authenticated)/user-details/[id]',
          params: { id: medicalRecordNumber }
        });
      } else {
        Alert.alert('Error', 'Invalid Medical Record Number. Please try again.');
      }
    } catch (error) {
      console.error('Error checking ID:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Medical Record Number</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Medical Record Number"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={medicalRecordNumber}
          onChangeText={setMedicalRecordNumber}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}