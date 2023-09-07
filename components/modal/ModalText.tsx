import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

export const ModalText = ({ error }: { error: string }) => {
  const [modalVisible, setModalVisible] = useState(true);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.modalContent}>
            <Text>{error}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.text}>Tancar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2, // Add border width
    borderColor: '#000', // Add border color
  },
  closeButton: {
    width: 80,
    height: 40,
    backgroundColor: '#228B22',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
});

export default ModalText;
