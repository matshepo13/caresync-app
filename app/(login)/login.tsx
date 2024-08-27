import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './loginstyle';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useRouter } from 'expo-router';
import SuccessPopup from '@/components/SuccessPopup';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        router.replace('/(authenticated)/id-entry');
      }, 2000);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error (show error message to user)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="name@email.com"
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
          placeholder="••••••••"
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Ionicons name="lock-closed-outline" size={24} color="white" style={styles.inputIcon} />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <View style={styles.rememberContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setRememberMe(!rememberMe)}
        >
          {rememberMe && <View style={styles.checkboxInner} />}
        </TouchableOpacity>
        <Text style={styles.rememberText}>Remember</Text>
      </View>
      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotText}>Forgot</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.joinButton} onPress={() => router.push('/(login)/signup')}>
        <Text style={styles.joinText}>Join Us !</Text>
      </TouchableOpacity>
      {showSuccessPopup && <SuccessPopup message="Login Successful" />}
    </View>
  );
}