import { StyleSheet, View, Text } from 'react-native';
import { Message } from '@/types';
import Animated, { FadeInRight, FadeInLeft } from 'react-native-reanimated';

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  // Format timestamp to readable time
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <Animated.View 
      style={[
        styles.container,
        message.isFromMe ? styles.myMessageContainer : styles.theirMessageContainer
      ]}
      entering={message.isFromMe ? FadeInRight.duration(300) : FadeInLeft.duration(300)}
    >
      <View 
        style={[
          styles.bubble,
          message.isFromMe ? styles.myBubble : styles.theirBubble
        ]}
      >
        <Text style={[
          styles.message,
          message.isFromMe ? styles.myMessage : styles.theirMessage
        ]}>
          {message.content}
        </Text>
        <Text style={[
          styles.timestamp,
          message.isFromMe ? styles.myTimestamp : styles.theirTimestamp
        ]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    maxWidth: '80%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  theirMessageContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    paddingBottom: 24,
  },
  myBubble: {
    backgroundColor: '#8A2BE2',
  },
  theirBubble: {
    backgroundColor: '#E9E9EB',
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 22,
  },
  myMessage: {
    color: '#FFFFFF',
  },
  theirMessage: {
    color: '#333333',
  },
  timestamp: {
    position: 'absolute',
    bottom: 6,
    right: 12,
    fontSize: 11,
    fontFamily: 'Inter-Regular',
  },
  myTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  theirTimestamp: {
    color: 'rgba(0, 0, 0, 0.5)',
  },
});