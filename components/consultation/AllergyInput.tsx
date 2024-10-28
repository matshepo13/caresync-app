import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import HeaderText from '@/components/consultation/HeaderText';
import NextButton from './NextButton';


interface AllergyInputProps {
  onSubmit: (hasAllergies: boolean, selectedTypes?: string[]) => void;
}

export default function AllergyInput({ onSubmit }: AllergyInputProps) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const allergyTypes = [
    'Nuts',
    'Cheese', 
    'Bread',
    'Pollen',
    'Eggs',
    'Fish',
    'Soy',
    'Wheat',
    'Milk',
    'Tree Nuts',
    'Peanuts',
    'Latex',
   
    
    'Mold'
  ];

  const handleTypeSelect = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(prev => prev.filter(t => t !== type));
    } else {
      setSelectedTypes(prev => [...prev, type]);
    }
  };

  const handleNext = () => {
    // Remove the condition checking for selectedTypes.length
    onSubmit(selectedTypes.length > 0, selectedTypes);
    
    router.push({
      pathname: '/consultation/textual-analysis',
      params: {
        hasAllergies: selectedTypes.length > 0 ? 'true' : 'false',
        selectedTypes: selectedTypes.join(',')
      }
    });
  };

  
  return (
    <View style={styles.container}>
      <HeaderText>Do you have any ongoing allergy?</HeaderText>
      
      <View style={styles.contentContainer}>
        <Image 
          source={require('@/assets/images/allergy.png')}
          style={styles.image}
          resizeMode="contain"
        />
        
        <View style={styles.allergyTypesContainer}>
          {allergyTypes.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.allergyType,
                selectedTypes.includes(type) && styles.selectedType
              ]}
              onPress={() => handleTypeSelect(type)}
            >
              <Text style={[
                styles.allergyTypeText,
                selectedTypes.includes(type) && styles.selectedTypeText
              ]}>
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <NextButton
          onPress={handleNext}
          text="Continue"
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
    alignItems: 'center',
    paddingVertical: 20,
  },
  image: {
    width: '60%',
    height: 160,
    marginVertical: 30,
  },
  allergyTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    width: '100%',
    height: 200, // Added height
  },
  allergyType: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  selectedType: {
    backgroundColor: '#e8f5f2',
    borderColor: '#318B76',
  },
  allergyTypeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedTypeText: {
    color: '#318B76',
  },
  bottomContainer: {
    gap: 12,
    paddingBottom: 40,
  },
  continueButton: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#318B76',
    alignItems: 'center',
  },
  noAllergyButton: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#e8f5f2',
    alignItems: 'center',
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  noAllergyText: {
    color: '#318B76',
    fontSize: 16,
    fontWeight: '500',
  },
});
