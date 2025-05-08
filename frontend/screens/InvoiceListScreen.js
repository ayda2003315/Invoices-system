import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

export default function InvoiceListScreen({ route }) {
  const { user, token } = route.params;
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/invoices/${user.role === 'client' ? 'client' : ''}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setInvoices);
  }, []);

  return (
    <ScrollView style={{ padding: 10 }}>
      {invoices.map(inv => (
        <Card key={inv._id} style={{ marginBottom: 10 }}>
          <Card.Content>
            <Text>Montant : {inv.total} €</Text>
            <Text>Status : {inv.status}</Text>
            <Text>Échéance : {new Date(inv.dueDate).toLocaleDateString()}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}