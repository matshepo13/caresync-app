import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import NextButton from '@/components/consultation/NextButton';
import HeaderText from '@/components/consultation/HeaderText';
import { router } from 'expo-router';


interface AgeInputProps {
  onSubmit: (age: string) => void;
  navigation: any; // You can use proper type from @react-navigation/native
}

export default function AgeInput({ onSubmit }: AgeInputProps) {
  const [selectedAge, setSelectedAge] = useState('19');
  
  const handleNext = () => {
    onSubmit(selectedAge);
    router.push({
      pathname: '/consultation/gender'
    } as any);
  };

  return (
    <View style={styles.container}>
      <HeaderText>Please tell us your current age</HeaderText>
      
      <View style={styles.contentContainer}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedAge}
            onValueChange={(itemValue) => setSelectedAge(itemValue)}
            style={styles.picker}
            itemStyle={styles.pickerItem}
          >
            {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
              <Picker.Item 
                key={age} 
                label={age.toString()} 
                value={age.toString()}
                color="#000000"
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <NextButton onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  pickerWrapper: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: Dimensions.get('window').width,
    height: 300,
  },
  pickerItem: {
    fontSize: 60,
    fontWeight: 'normal',
    color: '#000000',
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40,
    marginTop: 'auto',
  },
});
