import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Message } from '@/types';
import Avatar from './Avatar';
import Animated, { FadeInRight } from 'react-native-reanimated';

interface MessagePreviewProps {
  message: Message & { contact: any };
}

export default function MessagePreview({ message }: MessagePreviewProps) {
  const router = useRouter();
  
  // Format timestamp to readable time
  const formatTime = (timestamp: number) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffDays = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return messageDate.toLocaleDateString([], { weekday: 'short' });
    } else {
      return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  // Truncate message if too long
  const truncateMessage = (content: string, maxLength: number) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };
  
  const handlePress = () => {
    router.push(`/messages/${message.contact.id}`);
  };
  
  return (
    <Animated.View entering={FadeInRight.duration(300)}>
      <TouchableOpacity 
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Avatar contact={message.contact} size={50} showName={false} />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{message.contact.name}</Text>
            <Text style={styles.time}>{formatTime(message.timestamp)}</Text>
          </View>
          
          <Text style={styles.preview} numberOfLines={1}>
            {message.isFromMe ? 'You: ' : ''}
            {truncateMessage(message.content, 30)}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  time: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#999',
  },
  preview: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
});