import React from 'react';
import { View } from 'react-native';
import { Button, Title } from 'react-native-paper';

export default function HomeScreen({ navigation, route }) {
  const { user } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Title>Bienvenue {user.role} 👋</Title>
      {user.role !== 'client' && (
        <Button mode="contained" onPress={() => navigation.navigate('Upload Invoice')} style={{ marginVertical: 10 }}>
          Scanner / Télécharger une facture
        </Button>
      )}
      <Button mode="outlined" onPress={() => navigation.navigate('Invoices')} style={{ marginVertical: 10 }}>
        Voir mes factures
      </Button>
      {user.role === 'manager' && (
        <>
          <Button onPress={() => navigation.navigate('User Management')} style={{ marginVertical: 10 }}>Gérer les utilisateurs</Button>
          <Button onPress={() => navigation.navigate('Notifications')} style={{ marginVertical: 10 }}>Notifications</Button>
        </>
      )}
    </View>
  );
}
