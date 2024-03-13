import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { db } from './firebase';
import index from "./login/js/index";



export default function App() {
  return (

    <View style={styles.container}>

      <TouchableOpacity>
        <Text>Adaugă</Text>
      </TouchableOpacity>
      <Text>Hola Mundo</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
