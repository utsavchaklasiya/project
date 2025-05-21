import { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, Send } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useContacts } from '@/hooks/useContacts';
import { useMessages } from '@/hooks/useMessages';
import MessageBubble from '@/components/MessageBubble';
import Avatar from '@/components/Avatar';
import { Contact, Message } from '@/types';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function MessageScreen() {
  const { id } = useLocalSearchParams();
  const { contacts } = useContacts();
  const { messages, addMessage } = useMessages();
  const [newMessage, setNewMessage] = useState('');
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  
  // Find the contact
  const contact = contacts.find(c => c.id === id) as Contact;
  
  // Get messages for this contact
  const contactMessages = messages
    .filter(message => message.contactId === id)
    .sort((a, b) => a.timestamp - b.timestamp);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (contactMessages.length > 0 && flatListRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [contactMessages.length]);
  
  const handleSend = () => {
    if (newMessage.trim().length === 0) return;
    
    // Create new message
    const message: Message = {
      id: `msg-${Date.now()}`,
      contactId: id as string,
      content: newMessage,
      timestamp: Date.now(),
      isFromMe: true,
    };
    
    addMessage(message);
    setNewMessage('');
  };
  
  if (!contact) {
    return (
      <View style={styles.container}>
        <Text>Contact not found</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Screen 
        options={{
          headerShown: false,
        }}
      />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <ArrowLeft color="#333" size={24} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Avatar contact={contact} size={40} showName={false} />
          <Text style={styles.headerName}>{contact.name}</Text>
        </View>
        <View style={styles.placeholder} />
      </View>
      
      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={contactMessages}
          renderItem={({ item }) => (
            <MessageBubble message={item} />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesContainer}
        />
        
        <Animated.View 
          style={styles.inputContainer}
          entering={FadeInDown.duration(300)}
        >
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={handleSend}
            disabled={newMessage.trim().length === 0}
          >
            <Send
              color="#8A2BE2"
              size={22}
              opacity={newMessage.trim().length === 0 ? 0.5 : 1}
            />
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginLeft: 12,
    color: '#333',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});