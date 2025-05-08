import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text, Title } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://172.16.107.139/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.token) {
        Toast.show({ type: 'success', text1: 'Connexion réussie' });
        navigation.replace('Home', { user: data.user, token: data.token });
      } else {
        Toast.show({ type: 'error', text1: 'Erreur', text2: data.error });
      }
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Erreur serveur' });
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Title>Connexion</Title>
      <TextInput label="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 10 }} />
      <TextInput label="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
      <Button mode="contained" onPress={handleLogin} style={{ marginTop: 20 }}>Se connecter</Button>
    </View>
  );
}