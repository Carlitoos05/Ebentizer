import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import {useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { auth, firebase } from '../firebase';
import { signOut } from 'firebase/auth'; // Importa la función de cerrar sesión desde firebase
import { AntDesign } from '@expo/vector-icons';

const Home = () => {
  const navigation = useNavigation();
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);


  const onSignOut = () => {
    signOut(auth)
    .catch(error => console.log(error));
  };


  useEffect(() => {
    // Obtener el nombre de usuario cuando se inicia sesión
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // Recupera el nombre completo del usuario
        firebase.database().ref('users/' + user.uid).once('value')
        .then(snapshot => {
            const userData = snapshot.val();
            if (userData && userData.name) {
                setDisplayName(userData.name);
            }
        })
        .catch(error => {
            console.error("Error fetching user data:", error);
          })
          .finally(() => {
            setLoading(false);
        });
      } 
      else {
      setLoading(false);
      }
    });
  return unsubscribe;
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={onSignOut}
        >
          <AntDesign name="logout" size={24} color= "#8B0000" style={{marginLeft: 10}}/>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
      

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#8B0000" />
      ) : (
        <Text style={styles.welcomeText}>Bienvenido, {displayName || 'Usuario'}</Text>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat")}
        style={styles.chatButton}
      >
        <Entypo name="chat" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

  export default Home;

  const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      backgroundColor: '#fff',
    },

    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },

    chatButton: {
      backgroundColor: '#8B0000',
      height: 50,
      width: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#8B0000',
      shadowOffSet: {
        width: 0,
        height: 2,
      },
      shadowOpacity: .9,
      shadowRadius: 8,
      marginRight: 20,
      marginBottom: 50,
    }
  });