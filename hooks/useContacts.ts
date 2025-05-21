import { useState } from 'react';
import { Contact } from '@/types';

// Mock data for contacts
const contactsData: Contact[] = [
  { id: '1', name: 'You', color: '#8A2BE2' },
  { id: '2', name: 'Home', color: '#20B2AA' },
  { id: '3', name: 'Love', color: '#FF6347' },
  { id: '4', name: 'Family', color: '#4169E1' },
  { id: '5', name: 'Friends', color: '#FF69B4' },
  { id: '6', name: 'School', color: '#32CD32' },
];

export function useContacts() {
  const [contacts] = useState<Contact[]>(contactsData);
  
  return {
    contacts,
  };
}