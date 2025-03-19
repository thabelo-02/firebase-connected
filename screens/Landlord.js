import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const LandlordScreen = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [houseName, setHouseName] = useState('');
  const [houses, setHouses] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [selectedLandlordEmail, setSelectedLandlordEmail] = useState('');
  const [selectedLandlordPhone, setSelectedLandlordPhone] = useState('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, result.uri]);
    }
  };

  const handlePost = () => {
    const newHouse = { houseName, location, description, images };
    setHouses([...houses, newHouse]);
    Alert.alert('House Posted!', `House ${houseName} has been posted.`);
    resetForm();
  };

  const resetForm = () => {
    setHouseName('');
    setLocation('');
    setDescription('');
    setImages([]);
    setModalVisible(false);
  };

  const removeHouse = (index) => {
    const updatedHouses = houses.filter((_, i) => i !== index);
    setHouses(updatedHouses);
  };

  const toggleSettingsModal = () => {
    setSettingsVisible(!settingsVisible);
  };

  const openContactModal = (email, phone) => {
    setSelectedLandlordEmail(email);
    setSelectedLandlordPhone(phone);
    setContactVisible(true);
  };

  const handleContactAction = (action) => {
    if (action === 'email') {
      Alert.alert('Sending Email', `Emailing ${selectedLandlordEmail}`);
      // Add actual email sending logic here
    } else if (action === 'call') {
      Alert.alert('Calling', `Calling ${selectedLandlordPhone}`);
      // Add actual calling logic here
    }
    setContactVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleSettingsModal}>
        <Icon name="bars" size={20} color="#007BFF" />
      </TouchableOpacity>

      <Text style={styles.header}>Manage Your Houses</Text>
      <ScrollView>
        {houses.map((house, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: house.images[0] }} style={styles.houseImage} />
            <Text style={styles.houseName}>{house.houseName}</Text>
            <Text style={styles.detail}>Location: {house.location}</Text>
            <Text style={styles.detail}>Description: {house.description}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => openContactModal("landlord@example.com", "123-456-7890")}>
                <Text style={styles.contactButton}>Contact Landlord</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeHouse(index)}>
                <Text style={styles.removeButton}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Icon name="plus" size={20} color="#ffffff" />
      </TouchableOpacity>

      {/* Modal for Adding New House */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add New House</Text>
            <TextInput placeholder="House Name" value={houseName} onChangeText={setHouseName} style={styles.input} />
            <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
            <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} multiline />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              <Text style={styles.imagePickerText}>Pick Images</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              {images.map((img, index) => (
                <Image key={index} source={{ uri: img }} style={styles.image} />
              ))}
            </View>
            <Button title="Post" onPress={handlePost} />
            <Button title="Cancel" onPress={resetForm} />
          </View>
        </View>
      </Modal>

      {/* Contact Options Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={contactVisible}
        onRequestClose={() => setContactVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Contact Landlord</Text>
            <Button title="Email" onPress={() => handleContactAction('email')} />
            <Button title="Call" onPress={() => handleContactAction('call')} />
            <Button title="Cancel" onPress={() => setContactVisible(false)} />
          </View>
        </View>
      </Modal>

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
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  contactButton: { color: '#007BFF' },
  removeButton: { color: 'red' },
  addButton: {
    backgroundColor: '#007BFF',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
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
  input: { height: 40, borderColor: 'black', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10, width: '100%' },
  imagePicker: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePickerText: { color: '#fff' },
  imageContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 },
  image: { width: 100, height: 100, borderRadius: 10, margin: 5 },
});

export default LandlordScreen;