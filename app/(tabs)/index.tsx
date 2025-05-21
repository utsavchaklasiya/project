import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import ContactCircle from '@/components/ContactCircle';
import { useContacts } from '@/hooks/useContacts';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContactsScreen() {
  const { contacts } = useContacts();
  
  // Calculate grid dimensions
  const numColumns = 2;
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Directory</Text>
      <View style={styles.gridContainer}>
        <FlatList
          data={contacts}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <View style={styles.gridItem}>
              <ContactCircle contact={item} />
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.gridContent}
        />
      </View>
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
    marginBottom: 24,
  },
  gridContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  gridContent: {
    paddingBottom: 20,
  },
  gridItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 24,
  },
});