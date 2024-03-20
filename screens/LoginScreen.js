import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import { auth } from '../firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {

     // Verificar que email y password no estén vacíos
     if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico y contraseña.');
      return;
    }

    // Llamar a signInWithEmailAndPassword con email y password
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Inicio de sesión exitoso');
        navigation.navigate('Home');
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        Alert.alert('Error', 'Error al iniciar sesión. Por favor, verifica tu correo electrónico y contraseña.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        onChangeText={setEmail}
        value={email}s
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.touchable}>
        <Text style={styles.texto}> Iniciar Sesión </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  touchable: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 100,
  },
  texto: {
    fontSize: 20,
    fontWeight: 'bold',
  },

});
