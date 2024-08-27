import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import { Text } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './loginstyle';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '@/services/firebase';
import { useRouter } from 'expo-router';
import { collection, addDoc } from 'firebase/firestore';
import SuccessPopup from '@/components/SuccessPopup';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [profession, setProfession] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await addDoc(collection(firestore, 'DoctorsList'), {
        uid: user.uid,
        name,
        surname,
        profession,
        licenseNumber,
        workplace,
        email,
      });

      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        router.replace('/(authenticated)/id-entry');
      }, 2000);
    } catch (error) {
      console.error('Signup failed:', error);
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 2000);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={name}
          onChangeText={setName}
        />
        <Ionicons name="person-outline" size={24} color="white" style={styles.inputIcon} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Surname"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={surname}
          onChangeText={setSurname}
        />
        <Ionicons name="person-outline" size={24} color="white" style={styles.inputIcon} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Profession"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={profession}
          onChangeText={setProfession}
        />
        <Ionicons name="briefcase-outline" size={24} color="white" style={styles.inputIcon} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Medical License Number"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
        />
        <Ionicons name="document-text-outline" size={24} color="white" style={styles.inputIcon} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Current Workplace Hospital"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={workplace}
          onChangeText={setWorkplace}
        />
        <Ionicons name="business-outline" size={24} color="white" style={styles.inputIcon} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Ionicons name="mail-outline" size={24} color="white" style={styles.inputIcon} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Ionicons name="lock-closed-outline" size={24} color="white" style={styles.inputIcon} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      {showSuccessPopup && <SuccessPopup message="Signup Successful" />}
      {showErrorPopup && <SuccessPopup message="Signup Failed. Please try again." />}
    </ScrollView>
  );
}