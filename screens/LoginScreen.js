import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Modal, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useAssets } from 'expo-asset';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../database/firebaseConfig'; // Import Firebase auth instance

export default function LoginScreen() {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [assets, error] = useAssets([require('../assets/houses.jpg')]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (error) {
    console.error('Error loading assets:', error);
    return null;
  }

  if (!assets || !assets[0]) {
    return null;
  }

  // Function to handle login and push data
const handleLogin = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Successful login
      const user = userCredential.user;
      
      // Push data to the user's database
      const userDataRef = ref(database, 'users/' + user.uid); // Use 'users' as your database path
      set(userDataRef, {
        lastLogin: new Date().toISOString(),
        // Add additional user data here as needed
      })
      .then(() => {
        console.log("User data pushed successfully");
      })
      .catch((error) => {
        console.error("Error pushing data: ", error);
      });
    })
    .catch((error) => {
      console.error("Error logging in: ", error);
    });
};



  return (
    <View style={styles.container}>
      <Image source={assets[0]} style={styles.backgroundImage} contentFit="cover" />

      <View style={styles.card}>
        <Text style={styles.title}>Student Off Rez Accommodation</Text>
        <Text style={styles.LoginText}>Login</Text>

        <Image source={assets[0]} style={styles.cardImage} />

        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#007BFF" style={styles.iconmail} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.passwordContainer}>
          <Icon name="lock" size={20} color="#007BFF" style={styles.iconpass} />
          <TextInput
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="#007BFF" style={styles.eyeIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpLink}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backgroundImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, resizeMode: 'cover', opacity: 0.5 },
  iconmail: { position: 'absolute', left: 10, top: 15 },
  iconpass: { position: 'absolute', left: 10, top: 15 },
  card: { backgroundColor: '#ffffff', borderRadius: 10, padding: 5, width: '90%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 5, alignItems: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  LoginText: { fontSize: 20, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  cardImage: { width: '90%', height: 170, borderRadius: 10, marginBottom: 15 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderColor: '#ccc', borderWidth: 1, borderRadius: 15, marginBottom: 10, width: '100%' },
  input: { flex: 1, height: 50, paddingHorizontal: 40 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 15 },
  passwordInput: { flex: 1, height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 15, width: '80%', paddingHorizontal: 40 },
  eyeIcon: { position: 'absolute', right: 10, top: -12 },
  button: { backgroundColor: '#007BFF', borderRadius: 5, height: 45, justifyContent: 'center', alignItems: 'center', width: '50%' },
  buttonText: { color: '#ffffff', fontWeight: 'bold' },
  signUpLink: { marginTop: 15, color: '#007BFF', textAlign: 'center' },
});
