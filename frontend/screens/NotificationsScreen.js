import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';
import io from 'socket.io-client';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([]);
  const socket = io('http://localhost:3000');

  useEffect(() => {
    socket.on('invoice_delay_alert', (data) => {
      setNotifications(prev => [...prev, data]);
    });
    return () => socket.disconnect();
  }, []);

  return (
    <ScrollView style={{ padding: 10 }}>
      {notifications.map((notif, index) => (
        <Card key={index} style={{ marginVertical: 5 }}>
          <Card.Content>
            <Text>{notif.message}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}