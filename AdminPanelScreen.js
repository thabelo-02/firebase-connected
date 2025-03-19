import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AdminPanelScreen = ({ navigation }) => {
  const handleAddHouse = () => {
    // Logic to add a new house (for now, just a placeholder)
    alert('Add house functionality will be added later.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Panel</Text>
      <Button title="Add New House" onPress={handleAddHouse} />
      {/* Add more admin functionalities here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});

export default AdminPanelScreen;