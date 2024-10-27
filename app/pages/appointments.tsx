import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useRouter } from 'expo-router';
import { Href } from 'expo-router';
import { styles } from '@/assets/fonts/stylings/mainstyles';
import { firestore } from '@/services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import SuccessPopup from '@/components/SuccessPopup';
import Navbar from '@/components/Navbar';
import { useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface AppointmentDetails {
  appointmentDateTime: string;
  department: string;
  doctorName: string;
  reason: string;
}

const AppointmentsPage = () => {
  const { id } = useLocalSearchParams();
  const [selectedDate, setSelectedDate] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentDetails[]>([]); // Initialize as an empty array
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const router = useRouter();

  const handleDateSelect = async (day: { dateString: string }) => {
    console.log('Selected date:', day.dateString); // Add this line for debugging
    setSelectedDate(day.dateString);
    try {
      const appointmentsRef = collection(firestore, 'Appointments_123456789');
      const q = query(
        appointmentsRef,
        where('appointmentDateTime', '>=', `${day.dateString}T00:00`),
        where('appointmentDateTime', '<=', `${day.dateString}T23:59`)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const appointmentsData = querySnapshot.docs
          .map(doc => doc.data() as AppointmentDetails)
          .sort((a, b) => new Date(a.appointmentDateTime).getTime() - new Date(b.appointmentDateTime).getTime());
        setAppointmentDetails(appointmentsData);
        setShowSuccessPopup(true);
        setTimeout(() => setShowSuccessPopup(false), 2000);
      } else {
        setAppointmentDetails([]);
        setShowErrorPopup(true);
        setTimeout(() => setShowErrorPopup(false), 2000);
      }
    } catch (error) {
      console.error('Error fetching appointment details:', error);
      setShowErrorPopup(true);
      setTimeout(() => setShowErrorPopup(false), 2000);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar userId={id as string} />
      <Text style={styles.title}>Appointments</Text>
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        minDate={'2024-01-01'}
        maxDate={'2024-12-31'}
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: 'hsl(186, 100%, 19%)' },
        }}
        theme={{
          selectedDayBackgroundColor: 'hsl(186, 100%, 19%)',
          todayTextColor: 'hsl(186, 100%, 19%)',
          arrowColor: 'hsl(186, 100%, 19%)',
          textSectionTitleColor: 'hsl(186, 100%, 19%)',
        }}
        style={styles.calendar}
      />
      <View style={styles.selectedDateContainer}>
        <Text style={styles.selectedDate}>Selected Date: {selectedDate}</Text>
        {appointmentDetails.length > 0 ? (
          appointmentDetails.map((appointment, index) => (
            <View key={index} style={localStyles.appointmentDetailsContainer}>
              <View style={localStyles.appointmentInfo}>
                <Text style={localStyles.appointmentText}>Time: {appointment.appointmentDateTime}</Text>
                <Text style={localStyles.appointmentText}>Doctor: {appointment.doctorName}</Text>
                <Text style={localStyles.appointmentText}>Department: {appointment.department}</Text>
                <Text style={localStyles.appointmentText}>Reason: {appointment.reason}</Text>
              </View>
              <TouchableOpacity 
                style={localStyles.callButton} 
                onPress={() => initiateCall(appointment.doctorId)}
              >
                <Ionicons name="call" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text>No appointments found for the selected date.</Text>
        )}
      </View>
      {showSuccessPopup && <SuccessPopup message="Appointment details pulled successfully!" />}
      {showErrorPopup && <SuccessPopup message="No appointment details found." />}
    </View>
  );
};

const localStyles = StyleSheet.create({
  appointmentDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    position: 'relative',
  },
  appointmentInfo: {
    flex: 1,
    paddingRight: 40,
  },
  appointmentText: {
    color: 'black',
    marginBottom: 2,
  },
  callButton: {
    position: 'absolute',
    top: 25,
    right: 20,
    backgroundColor: 'hsl(186, 100%, 19%)',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppointmentsPage;
