import React from 'react';
import { Stack } from 'expo-router';
import AgeInput from '@/components/consultation/AgeInput';
import GenderInput from '@/components/consultation/GenderInput';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(login)" />
      <Stack.Screen name="(authenticated)" />
      <Stack.Screen name="appointments" options={{ headerTitle: 'Appointments' }} />
      <Stack.Screen name="CareSyncAIChat" options={{ headerTitle: 'CareSync AI' }} />
      <Stack.Screen name="pages/BookAppointment" options={{ headerTitle: 'Book Appointment' }} />
      <Stack.Screen name="Age" options={{ headerTitle: 'Age' }} />
      <Stack.Screen name="Gender" options={{ headerTitle: 'Gender' }} />
    </Stack>
  );
}
