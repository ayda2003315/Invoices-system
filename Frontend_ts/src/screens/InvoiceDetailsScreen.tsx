import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from 'react-native-paper';
import Animated from 'react-native-reanimated';

// Définir le type des routes disponibles
type RootStackParamList = {
  InvoiceDetails: { invoiceId: string };
};

type props = NativeStackScreenProps<RootStackParamList, 'InvoiceDetails'>;

const InvoiceDetailsScreen: React.FC<props> = ({ route, navigation }) => {
  const { invoiceId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Détails de la Facture {invoiceId}</Text>

      {/* Carte contenant les détails de la facture */}
      <View style={styles.card}>
        <Text style={styles.detailText}>Numéro de facture : {invoiceId}</Text>
        <Text style={styles.detailText}>Total : 100.00€</Text>
        <Text style={styles.detailText}>Date : 01/05/2025</Text>
      </View>

      {/* Bouton pour retourner à la liste des factures */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
        style={styles.buttonContainer}>
        <Button mode="contained" style={styles.button} color="#32CD32">
          Retour à la liste
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    width: '100%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    color: '#34495E',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InvoiceDetailsScreen;
