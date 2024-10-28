import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import AppBar from '@/components/Appbar';
import Navbar from '@/components/Navbar';
import { Ionicons } from '@expo/vector-icons';
import AgeInput from '@/components/consultation/AgeInput';

export default function VirtualConsultation() {
  const [isChecked, setIsChecked] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [responses, setResponses] = useState({
    age: '',
    // ... other responses will be added later
  });

  const handleStartConsultation = () => {
    if (isChecked) {
      setShowQuestionnaire(true);
    }
  };

  const handleAgeSubmit = (age: string) => {
    setResponses(prev => ({ ...prev, age }));
    // Navigate to next question
    router.push('/symptoms-input'); // You'll create this route later
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBarContainer}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Virtual Consultation</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {!showQuestionnaire ? (
          // Show original consent screen
          <View style={styles.content}>
            <Image 
              source={require('@/assets/images/sthe.png')}
              style={styles.image}
              resizeMode="contain"
            />
            
            <Text style={styles.title}>Hassle-Free Virtual Doctor Consultation</Text>
            <Text style={styles.subtitle}>Connect with healthcare professionals from the comfort of your home</Text>

            <View style={styles.termsContainer}>
              <Pressable 
                style={styles.checkbox} 
                onPress={() => setIsChecked(!isChecked)}
              >
                {isChecked && <Ionicons name="checkmark" size={18} color="#3EB489" />}
              </Pressable>
              <Text style={styles.termsText}>
                Do you agree to the Popi Act Terms and Conditions?
              </Text>
            </View>

            <TouchableOpacity 
              style={[
                styles.startButton,
                !isChecked && styles.startButtonDisabled
              ]}
              onPress={handleStartConsultation}
              disabled={!isChecked}
            >
              <Text style={[
                styles.buttonText,
                !isChecked && styles.buttonTextDisabled
              ]}>Start a Consultation</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Show age input
          <AgeInput onSubmit={handleAgeSubmit} />
        )}
      </ScrollView>

      <Navbar userId={''} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48, // Adjust for status bar
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  appBarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
  },
  image: {
    width: '80%',
    height: 150, // Reduced height for smaller screens
    marginBottom: 20,
  },
  title: {
    fontSize: 22, // Slightly smaller for small screens
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 14, // Smaller for small screens
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#40E0D0',
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  startButton: {
    backgroundColor: '#40E0D0',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    width: '80%', // More responsive width
    alignItems: 'center',
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
    elevation: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    color: '#888',
  },
});
