import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import NextButton from '@/components/consultation/NextButton';
import HeaderText from '@/components/consultation/HeaderText';

interface MedicationsInputProps {
  onSubmit: (takesMedications: boolean) => void;
}

export default function MedicationsInput({ onSubmit }: MedicationsInputProps) {
  const [selectedOption, setSelectedOption] = useState<boolean | null>(null);

  const handleNext = () => {
    if (selectedOption !== null) {
      if (selectedOption === true) {
        router.push('/consultation/medication-selector');
      } else {
        onSubmit(selectedOption);
        router.push('/consultation/allergies'); // Changed from 'next-step' to 'allergies'
      }
    }
  };

  return (
    <View style={styles.container}>
      <HeaderText>Do you take any medications?</HeaderText>
      
      <View style={styles.contentContainer}>
        <Image 
          source={require('@/assets/images/pillls.png')}
          style={styles.image}
          resizeMode="contain"
        />
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              selectedOption === true && styles.selectedOption
            ]}
            onPress={() => setSelectedOption(true)}
          >
            <Text style={[
              styles.optionText,
              selectedOption === true && styles.selectedOptionText
            ]}>Yes, I do</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.option,
              selectedOption === false && styles.selectedOption
            ]}
            onPress={() => setSelectedOption(false)}
          >
            <Text style={[
              styles.optionText,
              selectedOption === false && styles.selectedOptionText
            ]}>No, I don't</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <NextButton 
          onPress={handleNext}
          disabled={selectedOption === null}
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: '80%',
    height: 200,
    marginBottom: 40,
  },
  optionsContainer: {
    width: '100%',
    gap: 12,
  },
  option: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#318B76',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40,
  },
});
