import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';
import NextButton from '@/components/consultation/NextButton';
import HeaderText from '@/components/consultation/HeaderText';

export default function FeelingsScreen() {
  const [moodValue, setMoodValue] = useState(0.5);

  const getMoodInfo = (value: number) => {
    if (value < 0.25) return { emoji: '🤢', label: "I'm feeling nauseous" };
    if (value < 0.5) return { emoji: '🤒', label: "I have a fever" };
    if (value < 0.75) return { emoji: '🤧', label: "I have a cold" };
    if (value < 1) return { emoji: '🤮', label: "I'm vomiting" };
    return { emoji: '😐', label: "I'm feeling neutral" };
  };

  const currentMood = getMoodInfo(moodValue);

  return (
    <View style={styles.container}>
      <HeaderText>What's your mood?</HeaderText>
      
      <View style={styles.contentContainer}>
        
        
        <View style={styles.moodIconContainer}>
          <View style={styles.iconCircle}>
            <Text style={styles.emoji}>{currentMood.emoji}</Text>
          </View>
        </View>

        

        <Text style={styles.moodText}>{currentMood.label}</Text>

        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={moodValue}
          onValueChange={setMoodValue}
          minimumTrackTintColor="#318B76"
          maximumTrackTintColor="#E0E0E0"
          thumbTintColor="#318B76"
        />
      </View>

      <View style={styles.bottomContainer}>
        <NextButton 
          onPress={() => router.push('/consultation/medications')}
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
    paddingVertical: 20,
  },
  arrowContainer: {
    height: 24,
    justifyContent: 'center',
    marginVertical: 10,
  },
  arrow: {
    fontSize: 24,
    color: '#318B76',
  },
  moodIconContainer: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#318B7620',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 60,
  },
  moodText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 60,
    marginBottom: 20,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40,
  },
});