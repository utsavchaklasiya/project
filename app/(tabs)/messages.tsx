import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useMemo } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContacts } from '@/hooks/useContacts';
import { useMessages } from '@/hooks/useMessages';
import MessagePreview from '@/components/MessagePreview';

export default function MessagesScreen() {
  const { contacts } = useContacts();
  const { messages } = useMessages();
  
  // Get the most recent message for each contact
  const recentMessages = useMemo(() => {
    const contactMessages = new Map();
    
    // Group messages by contact and find the most recent one
    messages.forEach((message) => {
      const currentMessage = contactMessages.get(message.contactId);
      if (!currentMessage || message.timestamp > currentMessage.timestamp) {
        contactMessages.set(message.contactId, message);
      }
    });
    
    // Convert map to array and combine with contact data
    return Array.from(contactMessages.entries()).map(([contactId, message]) => {
      const contact = contacts.find(c => c.id === contactId);
      return {
        ...message,
        contact
      };
    }).sort((a, b) => b.timestamp - a.timestamp);
  }, [contacts, messages]);
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recent Messages</Text>
      <FlatList
        data={recentMessages}
        renderItem={({ item }) => (
          <MessagePreview message={item} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#333',
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});