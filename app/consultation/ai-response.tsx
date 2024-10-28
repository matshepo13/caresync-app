import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useConsultation } from '@/app/context/ConsultationContext';
import { getOpenAIResponse } from '@/services/openaiService';

interface Condition {
  name: string;
  probability: number;
  explanation: string;
}

interface Medication {
  name: string;
  effectiveness: number;
}

const getConditionColor = (index: number) => {
  const colors = ['#64B5F6', '#42A5F5', '#2196F3'];
  return colors[index % colors.length];
};

const getMedicationColor = (index: number) => {
  const colors = ['#FFC107', '#FF9800', '#FF6D00'];
  return colors[index % colors.length];
};

export default function AIResponseScreen() {
  const { prompt } = useLocalSearchParams<{ prompt: string }>();
  const { consultationData } = useConsultation();
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(true);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);

  useEffect(() => {
    const fetchAIResponse = async () => {
      try {
        const systemPrompt = `You are a medical AI assistant. Based on the patient's symptoms and information, provide:
        1. A compassionate response that starts with "I'm so sorry that you are not feeling well"
        2. Analyze their symptoms
        3. Mention that based on the information previously provided and their symptom explaination, it is likely that the patient has a common condition.
        4. Briefly explain what the patient is experiencing
        5. List possible conditions with probabilities (in JSON format)
        6. Recommend over-the-counter medications with effectiveness ratings (in JSON format)
        7. Provide general health advice

        Please include structured data in this format:
        ---CONDITIONS---
        [{"name": "condition name", "probability": number, "explanation": "simple explanation of the condition"}]
        ---MEDICATIONS---
        [{"name": "medication name", "effectiveness": number}]

        Note: Only include medications with effectiveness >= 75%

        Patient Information:
        Age: ${consultationData.age}
        Gender: ${consultationData.gender}
        Medical Conditions: ${consultationData.medicalConditions?.join(', ') || 'None'}
        Current Feeling: ${consultationData.feeling}
        Medications: ${consultationData.medications?.join(', ') || 'None'}
        Allergies: ${consultationData.allergies?.selectedTypes?.join(', ') || 'None'}`;

        const response = await getOpenAIResponse([
          { role: 'system', content: systemPrompt },
          { role: 'user', content: decodeURIComponent(prompt) }
        ]);
        
        const conditionsMatch = response.match(/---CONDITIONS---([\s\S]*?)---MEDICATIONS---/);
        const medicationsMatch = response.match(/---MEDICATIONS---([\s\S]*?)(\n\n|$)/);
        
        if (conditionsMatch?.[1]) {
          const parsedConditions = JSON.parse(conditionsMatch[1].trim());
          setConditions(parsedConditions);
        }
        
        if (medicationsMatch?.[1]) {
          const parsedMedications = JSON.parse(medicationsMatch[1].trim());
          setMedications(parsedMedications);
        }

        const cleanResponse = response.replace(/---CONDITIONS---[\s\S]*?(\n\n|$)/, '')
                                    .replace(/---MEDICATIONS---[\s\S]*?(\n\n|$)/, '');
        setAiResponse(cleanResponse);
      } catch (error) {
        console.error('Error getting AI response:', error);
        setAiResponse('Error getting AI response. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAIResponse();
  }, [prompt]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Virtual Doctor's Response</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#318B76" />
      ) : (
        <>
          <View style={styles.section}>
            <Text style={styles.responseText}>{aiResponse}</Text>
          </View>

          {/* Possible Conditions Section */}
          <View style={styles.statisticsSection}>
            <View style={styles.headerContainer}>
              <Text style={styles.number}>1</Text>
              <Text style={styles.statisticsHeader}>
                Ok then, here are the possible conditions that you might experience based on your current symptoms:
              </Text>
            </View>
            
            {conditions.map((condition, index) => (
              <View key={index} style={styles.conditionContainer}>
                <View style={styles.conditionItem}>
                  <View style={styles.conditionHeader}>
                    <Text style={styles.conditionName}>{condition.name}</Text>
                    <Text style={styles.percentage}>{condition.probability}%</Text>
                  </View>
                  <View style={styles.progressBarBackground}>
                    <View 
                      style={[
                        styles.progressBar, 
                        { 
                          width: `${condition.probability}%`,
                          backgroundColor: getConditionColor(index)
                        }
                      ]} 
                    />
                  </View>
                </View>
                <Text style={styles.explanationText}>{condition.explanation}</Text>
              </View>
            ))}
          </View>

          {/* Medications Section */}
          <View style={styles.statisticsSection}>
            <View style={styles.headerContainer}>
              <Text style={styles.number}>2</Text>
              <Text style={styles.statisticsHeader}>
                Highly recommended over-the-counter medications:
              </Text>
            </View>
            
            {medications.map((medication, index) => (
              <View key={index} style={styles.conditionItem}>
                <View style={styles.conditionHeader}>
                  <Text style={styles.conditionName}>{medication.name}</Text>
                  <Text style={styles.percentage}>{medication.effectiveness}%</Text>
                </View>
                <View style={styles.progressBarBackground}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { 
                        width: `${medication.effectiveness}%`,
                        backgroundColor: getMedicationColor(index)
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  aiResponse: {
    fontSize: 16,
    lineHeight: 24,
  },
  conditionItem: {
    marginBottom: 8,
  },
  conditionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  conditionName: {
    fontSize: 16,
    fontWeight: '500',
  },
  percentage: {
    fontSize: 16,
    color: '#666',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  responseText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  statisticsSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#318B76',
    marginRight: 10,
  },
  statisticsHeader: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  conditionContainer: {
    marginBottom: 20,
  },
  explanationText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    marginLeft: 4,
    lineHeight: 20,
  },
});