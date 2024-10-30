import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles as mainStyles } from '@/assets/fonts/stylings/mainstyles';

// Add this type definition
type Clinic = {
  name: string;
  address: string;
  placeId: string;
};

const BookAppointment = () => {
  const [location, setLocation] = useState('');
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [purpose, setPurpose] = useState('');
  const [aiTicket, setAiTicket] = useState('');
  const [date, setDate] = useState(new Date());
  const [department, setDepartment] = useState('');

  const purposes = ['Check-up', 'Follow-up', 'Consultation', 'Treatment', 'Other'];
  const departments = ['General', 'Cardiology', 'Dermatology', 'Neurology', 'Orthopedics'];

  const hardcodedClinics: Clinic[] = [
    {
      name: 'Bekkersdal East Clinic',
      address: '3540 Phanyaphanya Street',
      placeId: 'east_clinic'
    },
    {
      name: 'Bekkersdal West Clinic',
      address: '3545 Khomo Ea Hlaba Avenue',
      placeId: 'west_clinic'
    }
  ];

  useEffect(() => {
  if (location) {
    setClinics(hardcodedClinics);
  }
}, [location]);

  const fetchNearbyClinics = async (location: string) => {
    try {
      console.log('Fetching nearby clinics for location:', location);
      const response = await fetch(
        `http://localhost:3000/api/nearby-clinics?location=${encodeURIComponent(location)}`
      );
      const data = await response.json();
      console.log('Raw API response:', data);
      
      if (data.results) {
        const nearbyClinicsList = data.results.map((result: any) => ({
          name: result.name,
          address: result.vicinity,
          placeId: result.place_id,
        }));
        console.log('Processed nearby clinics:', nearbyClinicsList);
        setClinics(nearbyClinicsList);
      } else {
        console.log('No results found in the API response');
      }
    } catch (error) {
      console.error('Error fetching nearby clinics:', error);
    }
  };

  const handleBookAppointment = () => {
    if (!selectedClinic || !purpose || !date || !department) {
      alert('Please fill in all required fields');
      return;
    }

    const appointmentDetails = {
      clinic: selectedClinic,
      purpose,
      aiTicket,
      date: date.toISOString(),
      department,
    };

    // Here you would typically send this data to your backend API
    console.log('Booking appointment:', appointmentDetails);

    // For now, we'll just show an alert
    alert('Appointment booked successfully!');

    // Reset form fields
    setSelectedClinic(null);
    setPurpose('');
    setAiTicket('');
    setDate(new Date());
    setDepartment('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>

          <GooglePlacesAutocomplete
            placeholder='Search for your location'
            onPress={(data, details = null) => {
              setLocation(data.description);
            }}
            query={{
              key: '',
              language: 'en',
            }}
            styles={{
              textInputContainer: styles.locationInput,
              textInput: styles.locationInputText,
            }}
          />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={purpose}
          onValueChange={(itemValue) => setPurpose(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select purpose" value="" />
          {purposes.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      <View style={styles.dateTimeContainer}>
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => setDate(selectedDate || date)}
          style={styles.datePicker}
        />
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={(event, selectedDate) => setDate(selectedDate || date)}
          style={styles.timePicker}
        />
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={department}
          onValueChange={(itemValue) => setDepartment(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select department" value="" />
          {departments.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleBookAppointment}>
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationInput: {
    width: '100%',
    marginBottom: 10,
  },
  locationInputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingLeft: 16,
    fontSize: 16,
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  datePicker: {
    flex: 1,
    marginRight: 8,
  },
  timePicker: {
    flex: 1,
    marginLeft: 8,
  },
  button: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookAppointment;
