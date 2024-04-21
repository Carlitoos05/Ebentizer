import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import {useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth'; // Importa la función de cerrar sesión desde firebase
import { AntDesign } from '@expo/vector-icons';

const Home = () => {
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth)
    .catch(error => console.log(error));
  };


  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome name="search" size={24} color= "#888" style={{marginLeft: 15}}/>
      ),

      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10
          }}
          onPress={onSignOut}
        >

          <AntDesign name="logout" size={24} color= "#888" style={{marginRight: 10}}/>
        </TouchableOpacity>
      )
    });
  }, [navigation]);
      
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat")}
        style={styles.chatButton}
      >
        <Entypo name="chat" size={24} color= "#ccc" />
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
    chatButton: {
      backgroundColor: '#007bff',
      height: 50,
      width: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#007bff',
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