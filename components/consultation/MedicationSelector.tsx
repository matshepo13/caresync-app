import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import HeaderText from '@/components/consultation/HeaderText';
import NextButton from '@/components/consultation/NextButton';

// Common medications list
const commonMedications = [
  'Abilify',
  'Abilify Maintena',
    'Axpelliamus',
  'Bactrim',
  'Bactrim DS',
  "Panado"
  
];

interface MedicationSelectorProps {
  onSubmit: (medications: string[]) => void;
}

export default function MedicationSelector({ onSubmit }: MedicationSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  const filteredMedications = commonMedications.filter(medication =>
    medication.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMedication = (medication: string) => {
    if (selectedMedications.includes(medication)) {
      setSelectedMedications(prev => prev.filter(m => m !== medication));
    } else {
      setSelectedMedications(prev => [...prev, medication]);
    }
  };

  const handleContinue = () => {
    onSubmit(selectedMedications);
    router.push('/consultation/allergies');
  };

  return (
    <View style={styles.container}>
      <HeaderText>Then please specify your medications!</HeaderText>

      <View style={styles.searchContainer}>
        <View style={styles.alphabetRow}>
          {['A', 'B', 'C', 'X', 'Y', 'Z'].map((letter) => (
            <Text key={letter} style={styles.alphabetLetter}>{letter}</Text>
          ))}
          <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
            <Ionicons name="search" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        {showSearch && (
          <TextInput
            style={styles.searchInput}
            placeholder="Search medications..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        )}
      </View>

      <ScrollView style={styles.medicationsList}>
        {filteredMedications.map((medication) => (
          <TouchableOpacity
            key={medication}
            style={[
              styles.medicationItem,
              selectedMedications.includes(medication) && styles.medicationItemSelected
            ]}
            onPress={() => toggleMedication(medication)}
          >
            <Text style={styles.medicationName}>{medication}</Text>
            <View style={[
              styles.checkbox,
              selectedMedications.includes(medication) && styles.checkboxSelected
            ]}>
              {selectedMedications.includes(medication) && (
                <Ionicons name="checkmark" size={16} color="#fff" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedMedications.length > 0 && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedLabel}>Selected:</Text>
          <View style={styles.selectedTags}>
            {selectedMedications.map((medication) => (
              <View key={medication} style={styles.selectedTag}>
                <Text style={styles.selectedTagText}>{medication}</Text>
                <TouchableOpacity onPress={() => toggleMedication(medication)}>
                  <Text style={styles.removeTag}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      <NextButton 
        onPress={handleContinue}
        text="Continue"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    marginBottom: 20,
  },
  alphabetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  alphabetLetter: {
    fontSize: 16,
    color: '#666',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    marginTop: 20,
  },
  medicationsList: {
    flex: 1,
  },
  medicationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  medicationItemSelected: {
    backgroundColor: '#E8F5F3',
  },
  medicationName: {
    fontSize: 16,
    color: '#333',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#318B76',
    borderColor: '#318B76',
  },
  selectedContainer: {
    marginTop: 20,
    marginBottom: 25,
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
    backgroundColor: '#E8F5F3',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  selectedTagText: {
    color: '#318B76',
    fontSize: 14,
  },
  removeTag: {
    color: '#318B76',
    fontSize: 18,
    marginLeft: 4,
    fontWeight: '500',
  },
});
