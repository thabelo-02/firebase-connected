import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PaymentsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePayment = (method) => {
    setPaymentMethod(method);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    // Here you would handle the payment processing logic
    // After successful payment, navigate back to home
    setModalVisible(false);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Payment Method</Text>

      <TouchableOpacity style={styles.button} onPress={() => handlePayment('EcoCash')}>
        <Icon name="money" size={20} color="#ffffff" />
        <Text style={styles.buttonText}>Pay with EcoCash</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handlePayment('PayNow')}>
        <Icon name="credit-card" size={20} color="#ffffff" />
        <Text style={styles.buttonText}>Pay with PayNow</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              You have selected {paymentMethod}. Proceed with payment?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: 10,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#28a745',
    borderRadius: 10,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
});

export default PaymentsScreen;