import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Send } from 'lucide-react-native';
import { useContacts } from '@/hooks/useContacts';
import { useMessages } from '@/hooks/useMessages';
import MessageBubble from '@/components/MessageBubble';

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const { contacts } = useContacts();
  const { messages, addMessage } = useMessages();
  const [newMessage, setNewMessage] = useState('');
  
  const contact = contacts.find(c => c.id === id);
  const chatMessages = messages.filter(m => m.contactId === id);
  
  const handleSend = () => {
    if (newMessage.trim().length === 0) return;
    
    addMessage({
      id: `msg-${Date.now()}`,
      contactId: id as string,
      content: newMessage,
      timestamp: Date.now(),
      isFromMe: true,
    });
    
    setNewMessage('');
  };
  
  if (!contact) return null;
  
  return (
    <View style={styles.container}>
      <FlatList
        data={chatMessages}
        renderItem={({ item }) => <MessageBubble message={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
      />
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          multiline
        />
        <TouchableOpacity 
          style={styles.sendButton} 
          onPress={handleSend}
          disabled={newMessage.trim().length === 0}
        >
          <Send color="#8A2BE2" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  messagesList: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});