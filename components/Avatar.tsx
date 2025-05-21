import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Contact } from '@/types';

interface AvatarProps {
  contact: Contact;
  size?: number;
  showName?: boolean;
}

export default function Avatar({ contact, size = 60, showName = true }: AvatarProps) {
  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.circle, 
          { 
            width: size, 
            height: size, 
            borderRadius: size / 2,
            backgroundColor: contact.color 
          }
        ]}
      >
        <Text 
          style={[
            styles.initials,
            { fontSize: size * 0.36 }
          ]}
        >
          {getInitials(contact.name)}
        </Text>
      </View>
      
      {showName && (
        <Text style={styles.name}>{contact.name}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  initials: {
    color: '#FFF',
    fontFamily: 'Inter-Bold',
  },
  name: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#333',
    textAlign: 'center',
  },
});