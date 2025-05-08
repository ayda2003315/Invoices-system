import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

export default function InvoiceUploadScreen({ route }) {
  const { user, token } = route.params;
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({ base64: true, quality: 0.7 });
    if (!result.canceled) setImage(result.assets[0]);
  };

  const uploadInvoice = async () => {
    if (!image) return;
    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      name: 'invoice.jpg',
      type: 'image/jpeg',
    });
    const res = await fetch('http://localhost:3000/api/invoices/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    if (res.ok) Toast.show({ type: 'success', text1: 'Facture envoyée' });
    else Toast.show({ type: 'error', text1: 'Erreur', text2: data.message });
  };

  return (
    <View style={{ padding: 20 }}>
      <Button onPress={pickImage}>Prendre une photo</Button>
      {image && <Image source={{ uri: image.uri }} style={{ width: '100%', height: 200, marginVertical: 10 }} />}
      <Button onPress={uploadInvoice} disabled={!image}>Envoyer</Button>
    </View>
  );
}
