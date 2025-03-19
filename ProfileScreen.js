import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ProfileScreen = ({ route, navigation }) => {
  const { userDetails } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.detail}>Full Name: {userDetails.fullName}</Text>
      <Text style={styles.detail}>Email: {userDetails.email}</Text>
      <Text style={styles.detail}>ID Number: {userDetails.idNumber}</Text>
      <Text style={styles.detail}>Phone: {userDetails.phone}</Text>
      <Button title="Back to Home" onPress={() => navigation.navigate('Home', { userDetails, isAdmin: userDetails.isAdmin })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  detail: { fontSize: 18, marginBottom: 8 },
});

export default ProfileScreen;