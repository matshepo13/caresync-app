import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(login)" />
      <Stack.Screen name="(authenticated)" />
      <Stack.Screen name="appointments" options={{ headerTitle: 'Appointments' }} />
      <Stack.Screen name="CareSyncAIChat" options={{ headerTitle: 'CareSync AI' }} />
    </Stack>
  );
}
