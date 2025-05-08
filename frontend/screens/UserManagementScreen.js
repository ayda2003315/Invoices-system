import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';

export default function UserManagementScreen({ route }) {
  const { token } = route.params;
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('comptable');

  const fetchUsers = () => {
    fetch('http://localhost:3000/api/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setUsers);
  };

  const addUser = async () => {
    const res = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ email, role })
    });
    if (res.ok) {
      setEmail('');
      fetchUsers();
    }
  };

  useEffect(fetchUsers, []);

  return (
    <ScrollView style={{ padding: 10 }}>
      <TextInput label="Email" value={email} onChangeText={setEmail} />
      <TextInput label="Rôle (manager/comptable/client)" value={role} onChangeText={setRole} />
      <Button onPress={addUser}>Ajouter utilisateur</Button>

      {users.map(u => (
        <Card key={u._id} style={{ marginVertical: 5 }}>
          <Card.Content>
            <Text>{u.email}</Text>
            <Text>Rôle: {u.role}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}