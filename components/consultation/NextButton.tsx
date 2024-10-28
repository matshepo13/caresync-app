import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface NextButtonProps {
  onPress: () => void;
  title?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function NextButton({ 
  onPress, 
  title = 'Continue',
  style,
  textStyle,
}: NextButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#318B76', 
    paddingVertical: 15,
    marginBottom: 25, // Increased margin to move button up
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});