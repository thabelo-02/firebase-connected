import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  Modal,
  Button,
} from 'react-native';

const StudentHomeScreen = () => {
  // Sample houses for demonstration
  const houses = [
    {
      houseName: "Cozy Cottage",
      location: "123 Main St",
      description: "A cozy cottage in the countryside.",
      images: ["https://example.com/cottage.jpg"],
      landlordEmail: "landlord1@example.com",
      landlordPhone: "123-456-7890",
    },
    {
      houseName: "Modern Apartment",
      location: "456 Elm St",
      description: "A modern apartment in the city.",
      images: ["https://example.com/apartment.jpg"],
      landlordEmail: "landlord2@example.com",
      landlordPhone: "987-654-3210",
    },
    // Add more sample houses as needed
  ];

  const [settingsVisible, setSettingsVisible] = useState(false);

  const handleContactLandlord = (landlordEmail, landlordPhone) => {
    Alert.alert(
      'Contact Landlord',
      'Choose a contact method',
      [
        { text: 'Email', onPress: () => Linking.openURL(`mailto:${landlordEmail}`) },
        { text: 'Call', onPress: () => Linking.openURL(`tel:${landlordPhone}`) },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const toggleSettingsModal = () => {
    setSettingsVisible(!settingsVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleSettingsModal}>
        <Text style={styles.menuButtonText}>☰</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Available Houses</Text>
      <ScrollView>
        {houses.map((house, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: house.images[0] }} style={styles.houseImage} />
            <Text style={styles.houseName}>{house.houseName}</Text>
            <Text style={styles.detail}>Location: {house.location}</Text>
            <Text style={styles.detail}>Description: {house.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => handleContactLandlord(house.landlordEmail, house.landlordPhone)}>
                <Text style={styles.contactButton}>Contact Landlord</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={settingsVisible}
        onRequestClose={toggleSettingsModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Settings</Text>
            <Button title="Profile" onPress={() => {}} />
            <Button title="Help" onPress={() => {}} />
            <Button title="Logout" onPress={() => {}} />
            <Button title="Cancel" onPress={toggleSettingsModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  menuButton: {
    position: 'absolute',
    top: 10,
    left: 300,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  menuButtonText: {
    fontSize: 20,
    color: '#007BFF',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  houseImage: { width: '100%', height: 150, borderRadius: 10 },
  houseName: { fontSize: 18, fontWeight: 'bold' },
  detail: { fontSize: 14, marginBottom: 5 },
  buttonContainer: { marginTop: 10 },
  contactButton: { color: '#007BFF' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});

export default StudentHomeScreen;