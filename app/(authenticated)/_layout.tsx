import React from 'react';
import { Stack } from 'expo-router';

export default function AuthenticatedLayout() {
  return (
    <Stack>
      <Stack.Screen name="id-entry" options={{ headerShown: false }} />
      <Stack.Screen 
        name="user-details" 
        options={{ 
          headerTitle: 'Dashboard',
          headerBackTitle: 'Back',
        }} 
      />
    </Stack>
  );
}
