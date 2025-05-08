import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import io from 'socket.io-client';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import InvoiceUploadScreen from './screens/InvoiceUploadScreen';
import InvoiceListScreen from './screens/InvoiceListScreen';
import UserManagementScreen from './screens/UserManagementScreen';
import NotificationsScreen from './screens/NotificationsScreen';

const Stack = createStackNavigator();
const socket = io('http://localhost:3000');

export default function App() {
  useEffect(() => {
    socket.on('invoice_delay_alert', (data) => {
      Toast.show({
        type: 'info',
        text1: 'Notification Manager',
        text2: data.message,
      });
    });
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Upload Invoice" component={InvoiceUploadScreen} />
          <Stack.Screen name="Invoices" component={InvoiceListScreen} />
          <Stack.Screen name="User Management" component={UserManagementScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
}