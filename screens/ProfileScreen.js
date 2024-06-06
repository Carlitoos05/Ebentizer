import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase'; // Asegúrate de importar firebase desde el archivo correcto

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const saveProfile = () => {
    const user = firebase.auth().currentUser;
    if (user) {
        const db = firebase.firestore(); // Accede a Firestore
        const userRef = db.collection('users').doc(user.uid); // Referencia al documento del usuario
    
        userRef.set({
            name: name,
            lastName: lastName,
            email: email
      })
      .then(() => {
        console.log('Perfil actualizado correctamente');
        // Aquí puedes agregar cualquier acción adicional después de guardar el perfil
      })
      .catch(error => {
        console.error('Error al actualizar el perfil:', error);
        // Aquí puedes manejar el error de alguna manera, como mostrar un mensaje al usuario
      });
    } else {
      console.error('No se encontró ningún usuario actualmente autenticado');
      // Aquí puedes manejar la situación en la que no hay usuario autenticado, tal vez redirigir al usuario a iniciar sesión
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.label}>Apellidos</Text>
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
      />
      <Text style={styles.label}>Correo Electrónico</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={saveProfile} style={styles.button}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#8B0000',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
