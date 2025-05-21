import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useContacts } from '@/hooks/useContacts';

export default function RootLayout() {
  useFrameworkReady();
  const { contacts } = useContacts();

  return (
    <>
      <Stack
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'Inter-SemiBold',
            fontSize: 18,
          },
        }}>
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Contacts',
            headerTitleStyle: {
              fontFamily: 'Inter-Bold',
              fontSize: 24,
              color: '#333',
            },
            headerStyle: {
              backgroundColor: '#F8F9FA',
            },
          }} 
        />
        <Stack.Screen 
          name="chat/[id]"
          options={({ route }) => {
            const id = route.params?.id;
            const contact = contacts.find(c => c.id === id);
            return {
              title: contact?.name || 'Chat',
              headerBackTitle: 'Back',
              headerStyle: {
                backgroundColor: '#FFFFFF',
              },
            };
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}