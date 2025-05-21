import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Avatar from './Avatar';
import { Contact } from '@/types';

interface ContactCircleProps {
  contact: Contact;
}

export default function ContactCircle({ contact }: ContactCircleProps) {
  const router = useRouter();
  const scale = useSharedValue(1);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  
  const handlePress = () => {
    // Add a small scale animation on press
    scale.value = withSpring(0.95, { damping: 15 }, () => {
      scale.value = withSpring(1);
      // Navigate to the messages screen
      router.push(`/messages/${contact.id}`);
    });
  };
  
  return (
    <Animated.View 
      style={[styles.container, animatedStyle]}
      entering={FadeIn.delay(contact.id.charCodeAt(0) * 50).duration(400)}
    >
      <TouchableOpacity
        style={styles.touchable}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <Avatar contact={contact} size={100} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
  },
  touchable: {
    alignItems: 'center',
  }
});