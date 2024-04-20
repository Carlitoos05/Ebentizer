import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, SafeAreaView, StatusBar, Alert } from 'react-native';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
const backImage = require("../assets/backImage.png");

export default function ResetPassword({ navigation }) {
  const [email, setEmail] = useState('');


  const handleResetPassword = async () => {
    if (email) {
      await sendPasswordResetEmail(auth, email)
        .then(() => {
          Alert.alert("Email de recuperare trimes", "Sa trimis un email de recuperare parolei la emailul introdus");
          navigation.navigate("Login"); // Redirigir al usuario de vuelta a la pantalla de inicio de sesión
        })
        .catch((error) => {
          Alert.alert("Email invalid", "Vă rugăm, folosiți un email valid");
          console.error(error);
        });
    } else {
      Alert.alert("Camp gol", "Vă rugăm, introduceți un email");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Reset Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>Reset Password</Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    borderRadius: 10,
    marginBottom: 20,
    padding: 12,
    fontSize: 16,
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: "100%",
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
