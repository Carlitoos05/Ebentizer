import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from '../firebase';



export default function HomeScreen({ navigation }) {
  const [user, setUser]=useState("");


useEffect(()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;

      setUser(user.displayName)
    } else {
      // User is signed out
      // ...
    }
  });

  updateProfile(auth.currentUser, {
    displayName: "Carlos", photoURL: "https://example.com/jane-q-user/profile.jpg"
  }).then(() => {
    console.log(user)
  }).catch((error) => {
    // An error occurred
    // ...
  });
},[])


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido {user}</Text>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})