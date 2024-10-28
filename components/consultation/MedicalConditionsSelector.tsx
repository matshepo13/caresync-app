import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import NextButton from '@/components/consultation/NextButton';
import HeaderText from '@/components/consultation/HeaderText';

interface MedicalConditionsSelectorProps {
  onSubmit: (conditions: string[]) => void;
}

const commonConditions = [
  'Diabetes', 'Arthritis', 'Asthma', 'Depression',
  'OCD', 'Stroke', 'Heart Failure', 'Cancer',
  'Alzheimer', 'GERD', 'COPD', 'High Blood Pressure',
  'Thyroid', 'Carpal Tunnel', 'Cholesterol'
];

export default function MedicalConditionsSelector({ onSubmit }: MedicalConditionsSelectorProps) {
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCondition = (condition: string) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(prev => prev.filter(c => c !== condition));
    } else {
      setSelectedConditions(prev => [...prev, condition]);
    }
  };

  const filteredConditions = commonConditions.filter(condition =>
    condition.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <HeaderText>Please specify your medical conditions!</HeaderText>
      
      <View style={styles.searchContainer}>
        <Text style={styles.sectionTitle}>Most Common</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.conditionsContainer}>
        <View style={styles.conditionsGrid}>
          {filteredConditions.map((condition) => (
            <TouchableOpacity
              key={condition}
              style={[
                styles.conditionButton,
                selectedConditions.includes(condition) && styles.selectedCondition
              ]}
              onPress={() => toggleCondition(condition)}
            >
              <Text style={[
                styles.conditionText,
                selectedConditions.includes(condition) && styles.selectedConditionText
              ]}>
                {condition}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {selectedConditions.length > 0 && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedLabel}>Selected:</Text>
          <View style={styles.selectedTags}>
            {selectedConditions.map((condition) => (
              <View key={condition} style={styles.selectedTag}>
                <Text style={styles.selectedTagText}>{condition}</Text>
                <TouchableOpacity onPress={() => toggleCondition(condition)}>
                  <Text style={styles.removeTag}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.bottomContainer}>
        <NextButton 
          onPress={() => onSubmit(selectedConditions)}
          title="Continue →"
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
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginLeft: 20, // Adjust this negative value to decrease from the left
    marginRight: 20, // Adjust this negative value to decrease from the right
  },
  
  searchInput: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    flex: 1,
  },
  conditionsContainer: {
    flex: 1,
  },
  conditionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  conditionButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
  },
  selectedCondition: {
    backgroundColor: '#66BFA6', // Even lighter green
  },
  
  conditionText: {
    color: '#333',
    fontSize: 14,
  },
  selectedConditionText: {
    color: '#fff',
  },
  selectedContainer: {
    marginVertical: 20,
  },
  selectedLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  selectedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#318B76',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  selectedTagText: {
    color: '#fff',
    fontSize: 14,
  },
  removeTag: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 4,
  },
  bottomContainer: {
    padding: 20,
    paddingBottom: 40,
  },
});