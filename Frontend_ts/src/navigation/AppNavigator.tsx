

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ScanInvoiceScreen from '../screens/ScanInvoiceScreen';

import InvoicesListScreen from '../screens/InvoicesListScreen';
import InvoiceDetailsScreen from '../screens/InvoiceDetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Création des navigateurs
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


// Stack pour la gestion des factures
 function InvoiceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="InvoicesList" options={{ title: "Factures" }}>
        {props => <InvoicesListScreen {...props} />}
      </Stack.Screen>
      
      
      <Stack.Screen name="InvoiceDetails" component={InvoiceDetailsScreen} options={{ title: 'Détails de la facture' }} />
    </Stack.Navigator>
  );
}


// Navigation principale
export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconname= '';

          switch (route.name) {
            case 'Home':
              iconname = 'home';
              break;
            case 'Scan':
              iconname = 'camera';
              break;
            case 'Invoices':
              iconname = 'document-text';
              break;
            case 'Settings':
              iconname = 'settings';
              break;
            default:
              iconname = 'home';
              break;
          }

          return <Ionicons name={iconname} size={size} color={color} />;
        },
      })}
    >
      
      <Tab.Screen name="Home"  options={{ title: "Accueil" }}>
        {props => <HomeScreen {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Scan" component={ScanInvoiceScreen} />
      <Tab.Screen name="Invoices" component={InvoiceStack} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

