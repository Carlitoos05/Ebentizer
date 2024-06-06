import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image, SafeAreaView, StatusBar} from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore} from '../firebase';
import {collection, addDoc} from 'firebase/firestore';
const backImage = require ("../assets/backImage.png")


export default function SignUp({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
  
    const onHandleSignUp = () => {
  
       // Verificar que email y password no estén vacíos
       if (email !== '' && password !== '') {
        if (password.length >= 8) {
          createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        // Guarda el nombre completo en Firebase
                        addDoc(collection(firestore, 'users'), {
                          nombre: firstName,
                          apellido: lastName,
                          email: email,
                            // Otros datos del usuario si es necesario
                        })
                        .then(() => {
                          console.log("User data saved in Firestore");
                      }).catch((error) => {
                          console.error("Error adding user data: ", error);
                      });

                        console.log("Signup success");
                      })
                      .catch((error) => {
                          const errorCode = error.code;
                          const errorMessage = error.message;
                          Alert.alert("Error", errorMessage);
                      });
              } else {
                  Alert.alert("Parolă incorectă", "Parola trebuie să conțină cel puțin 8 caractere");
              }
          } else {
              Alert.alert("Ați lăsat un camp gol", "Vă rugăm, umpleți toate campurile.");
          }
      };

    return (
        <View style={styles.container}>
          <Image source={backImage} style={styles.backImage}/>
          <View style={styles.whiteSheet}/>
          <SafeAreaView style={styles.form}>
            <Text style={styles.title}>Sign up</Text>
            <TextInput
              style={styles.input}
              placeholder="Nume"
              autoCapitalize="words"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Prenume"
              autoCapitalize="words"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-adress"
              textContentType="emailAdress"
              autoFocus={true}
              value={email}
              onChangeText={(text) => setEmail(text)}
              />
    
              <TextInput
              style={styles.input}
              placeholder="Parolă"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              values={password}
              onChangeText={(text) => setPassword(text)}
              />
    
          <TouchableOpacity style={styles.button} onPress={onHandleSignUp}>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Sign Up</Text>
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
          color: "#8B0000",
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
          backgroundColor: '#8B0000',
          height: 58,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems:  'center',
          marginTop: 40,
        },
      });
