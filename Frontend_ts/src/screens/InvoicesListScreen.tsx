import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Card, IconButton } from 'react-native-paper';
import Animated, { Easing } from 'react-native-reanimated';

// Définir le type des routes disponibles
type RootStackParamList = {
  InvoicesList: undefined;
  InvoiceDetails: { invoiceId: string };
};

type props = NativeStackScreenProps<RootStackParamList, 'InvoicesList'>;

const InvoicesListScreen: React.FC<props> = ({ navigation }) => {
  const [invoices, setInvoices] = useState([
    { id: '1', invoiceNumber: '1234', total: '100.00€' },
    { id: '2', invoiceNumber: '1235', total: '200.00€' },
    { id: '3', invoiceNumber: '1236', total: '150.00€' },
  ]);

  useEffect(() => {
    // Simuler un appel API pour charger les factures
    // fetchInvoices().then(data => setInvoices(data)); // Utiliser une fonction pour récupérer les données
  }, []);

  const renderItem = ({ item }: { item: { id: string; invoiceNumber: string; total: string } }) => (
    <View style={styles.invoiceItem}>
      <Text style={styles.invoiceText}>Numéro: {item.invoiceNumber}</Text>
      <Text style={styles.invoiceText}>Total: {item.total}</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('InvoiceDetails', { invoiceId: item.id })}
        activeOpacity={0.7}
        style={styles.buttonContainer}>
        <Button mode="contained" style={styles.button} color="#32CD32">
          Voir les détails
        </Button>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Factures</Text>
      <FlatList
        data={invoices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF', // Couleur de fond de l'écran
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
  },
  invoiceItem: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 15,
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 5,
  },
  invoiceText: {
    fontSize: 18,
    color: '#34495E',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InvoicesListScreen;
