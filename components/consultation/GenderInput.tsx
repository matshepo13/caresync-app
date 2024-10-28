import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NextButton from '@/components/consultation/NextButton';
import HeaderText from '@/components/consultation/HeaderText';

interface GenderInputProps {
  onSubmit: (gender: 'male' | 'female') => void;
}

export default function GenderInput({ onSubmit }: GenderInputProps) {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
  
  return (
    <View style={styles.container}>
      <HeaderText>What's your official gender?</HeaderText>
      <Text style={styles.subtitle}>Please answer truthfully to our AI so we can deliver better.</Text>
      
      <View style={styles.contentContainer}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.genderOption,
              selectedGender === 'male' && styles.selectedOption
            ]}
            onPress={() => setSelectedGender('male')}
          >
            <FontAwesome 
              name="mars" 
              size={32} 
              color={selectedGender === 'male' ? '#fff' : '#000'} 
            />
            <Text style={[
              styles.genderText,
              selectedGender === 'male' && styles.selectedText
            ]}>Male</Text>
            <Text style={[
              styles.chromosomeText,
              selectedGender === 'male' && styles.selectedText
            ]}>XY Chromosome</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderOption,
              selectedGender === 'female' && styles.selectedOption
            ]}
            onPress={() => setSelectedGender('female')}
          >
            <FontAwesome 
              name="venus" 
              size={32} 
              color={selectedGender === 'female' ? '#fff' : '#000'} 
            />
            <Text style={[
              styles.genderText,
              selectedGender === 'female' && styles.selectedText
            ]}>Female</Text>
            <Text style={[
              styles.chromosomeText,
              selectedGender === 'female' && styles.selectedText
            ]}>XX Chromosome</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <NextButton 
          onPress={() => selectedGender ? onSubmit(selectedGender) : null}
          title="Continue"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  genderOption: {
    flex: 1,
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'flex-end', // Changed from center to flex-start
    alignItems: 'center', // Changed from center to flex-end
    backgroundColor: '#fff',
    padding: 15,
  },
  selectedOption: {
    backgroundColor: '#40E0D0',
    borderColor: '#40E0D0',
  },
  genderText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  chromosomeText: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
  },
  selectedText: {
    color: '#fff',
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40,
    marginTop: 'auto',
  },
});
