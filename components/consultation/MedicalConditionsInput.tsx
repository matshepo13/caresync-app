import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import NextButton from '@/components/consultation/NextButton';
import HeaderText from '@/components/consultation/HeaderText';

import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

interface MedicalConditionsInputProps {
  onSubmit: (hasMedicalConditions: boolean | null) => void;
}

export default function MedicalConditionsInput({ onSubmit }: MedicalConditionsInputProps) {
  const [selectedOption, setSelectedOption] = useState<boolean | null>(null);
  
  return (
    <View style={styles.container}>
      <HeaderText>Do you have existing medical conditions?</HeaderText>
      
      <View style={styles.contentContainer}>
        <Image 
          source={require('@/assets/images/bed.png')}
          style={styles.image}
          resizeMode="contain"
        />
        
        <View style={styles.optionsContainer}>
                    <TouchableOpacity
            style={[styles.option, styles.yesOption]}
            onPress={() => {
                setSelectedOption(true);
                router.push('/consultation/conditions-selector');
            }}
>
  <Text style={styles.optionText}>Yes, I do</Text>
</TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, styles.noOption]}
            onPress={() => {
              setSelectedOption(false);
              router.push('/consultation/feelings');
            }}
          >
            <Text style={styles.optionText}>No, I don't</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, styles.unknownOption]}
            onPress={() => {
              setSelectedOption(null);
              router.push('/consultation/feelings');
            }}
          >
            <Text style={styles.optionText}>I don't know</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <NextButton 
          onPress={() => onSubmit(selectedOption)}
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
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    alignItems: 'center',
  },
  yesOption: {
    backgroundColor: '#318B76',
    borderColor: '#318B76',
  },
  noOption: {
    backgroundColor: '#AAC7B2',
    borderColor: '#AAC7B2',
  },
  unknownOption: {
    backgroundColor: '#E0E0E0',
    borderColor: '#E0E0E0',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40,
    marginTop: 'auto',
  },
});
