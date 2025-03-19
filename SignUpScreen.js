import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfPass] = useState('');
  const [phone, setPhone] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignup = () => {
    if (!isAgreed) {
      Alert.alert('Please agree to the terms and conditions.');
      return;
    }

    if (password !== confpassword) {
      Alert.alert('Passwords do not match.');
      return;
    }

    // Log user details (you can replace this with actual processing logic)
    console.log('User Details:', { username, email, phone, password });
    
    // Show success modal
    setModalVisible(true);
  };

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const openTerms = () => {
    Linking.openURL('https://example.com/terms'); // Replace with your actual terms URL
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.navigate('Login'); // Navigate to Login after closing
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#000" style={styles.icon} />
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#000" style={styles.icon} />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="#000" style={styles.icon} />
          <TextInput
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#000" style={styles.icon} />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            style={styles.input}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon name={secureTextEntry ? "eye-slash" : "eye"} size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#000" style={styles.icon} />
          <TextInput
            placeholder="Confirm Password"
            value={confpassword}
            onChangeText={setConfPass}
            secureTextEntry={secureTextEntry}
            style={styles.input}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Icon name={secureTextEntry ? "eye-slash" : "eye"} size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setIsAgreed(!isAgreed)}
          >
            <Icon name={isAgreed ? "check-square" : "square-o"} size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.checkboxText}>
            I have read and understood the terms and conditions.
          </Text>
        </View>
        <TouchableOpacity onPress={openTerms}>
          <Text style={styles.link}>Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Welcome, {username}!</Text>
            <Text style={styles.modalText}>You have successfully registered.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Continue to Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  card: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  input: { flex: 1, height: 40, marginLeft: 10 },
  icon: {
    position: 'absolute',
    left: 2,
    transition: 'transform 0.2s',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    flex: 1,
  },
  link: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#ffffff' },
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  modalButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#fff',
  },
});

export default SignUpScreen;