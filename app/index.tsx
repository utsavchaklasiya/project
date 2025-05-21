import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useContacts } from '@/hooks/useContacts';
import Avatar from '@/components/Avatar';

export default function ContactsScreen() {
  const router = useRouter();
  const { contacts } = useContacts();
  
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.contactItem}
            onPress={() => router.push(`/chat/${item.id}`)}
          >
            <Avatar contact={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listContent: {
    padding: 16,
  },
  contactItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 24,
  },
});