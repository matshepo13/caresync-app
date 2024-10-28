import React from 'react';
import {
  Text,
  StyleSheet,
  TextStyle,
} from 'react-native';

interface HeaderTextProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export default function HeaderText({ children, style }: HeaderTextProps) {
  return (
    <Text style={[styles.headerText, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 35,
    fontWeight: '700',
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});