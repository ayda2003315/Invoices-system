import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const DashboardCard = ({ title, description, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardDesc}>{description}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchRoleFromToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
        setUserName(decoded.name || 'Utilisateur');
      }
      setLoading(false);
    };

    fetchRoleFromToken();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>👋 Bonjour, {userName}</Text>
      <Text style={styles.role}>Rôle : {role}</Text>

      {role === 'manager' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔔 Notifications</Text>
          <Text style={styles.notification}>📌 Facture #12347 en retard de 3 jours</Text>
          <Text style={styles.notification}>📌 2 factures arrivent à échéance demain</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Tableau de bord</Text>

        <DashboardCard
          title="Scanner une facture"
          description="Utiliser l'appareil photo ou importer une image"
          onPress={() => navigation.navigate('Scan')}
        />

        <DashboardCard
          title="Voir les factures"
          description="Consulter l'historique et les détails"
          onPress={() => navigation.navigate('Invoices')}
        />

        {role === 'manager' && (
          <DashboardCard
            title="Gérer les utilisateurs"
            description="Ajouter, modifier ou supprimer des comptes"
            onPress={() => navigation.navigate('Users')}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7faff',
    flexGrow: 1,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 10,
  },
  role: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  notification: {
    backgroundColor: '#fff8dc',
    padding: 10,
    borderRadius: 6,
    marginBottom: 5,
    fontSize: 14,
    color: '#d2691e',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderLeftWidth: 5,
    borderLeftColor: '#32CD32',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
