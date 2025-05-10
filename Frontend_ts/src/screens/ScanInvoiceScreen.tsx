import React, { useState } from 'react';
import { View, Alert, StyleSheet, Text } from 'react-native';
import { Button, IconButton, Avatar, Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const ScanInvoiceScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  // Fonction pour ouvrir la galerie et choisir une image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
      sendToServer(result.uri);
    }
  };

  // Fonction pour capturer une photo avec l'appareil photo
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
      sendToServer(result.uri);
    }
  };

  // Envoyer l'image au backend pour l'OCR
  const sendToServer = async (imageUri: string) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: 'invoice.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post('http://localhost:3000/extract-invoice', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Texte extrait :', response.data.extracted_text);
      Alert.alert('Facture scannée !', 'Texte extrait : ' + response.data.extracted_text);
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'image :', error);
      Alert.alert('Erreur', 'Impossible d\'envoyer l\'image.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanner une Facture</Text>

      <Card style={styles.card}>
        <Card.Title title="Prendre une photo" />
        <Card.Content>
          <Button icon="camera" mode="contained" onPress={takePhoto}>
             Prendre une photo
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title="Choisir une image" />
        <Card.Content>
          <Button icon="image" mode="contained" onPress={pickImage}>
             Choisir une image
          </Button>
        </Card.Content>
      </Card>

      {imageUri && (
        <View style={styles.imageContainer}>
          <Avatar.Image size={200} source={{ uri: imageUri }} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  card: {
    marginBottom: 20,
    width: '100%',
    borderRadius: 10,
  },
  imageContainer: {
    marginTop: 20,
  },
});

export default ScanInvoiceScreen;
