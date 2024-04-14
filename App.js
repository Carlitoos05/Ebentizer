import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Navigation from "./Navigation";
import { StateProvider } from "./context";
import "react-native-get-random-values";

export default function App() {
  return (
    <StateProvider>
      <Navigation />
    </StateProvider>
  );
}

const styles = StyleSheet.create({});
