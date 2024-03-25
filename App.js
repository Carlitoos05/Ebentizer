import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Navigation from "./Navigation";
import { StateProvider } from "./context";

export default function App() {
  return (
    <StateProvider>
      <Navigation />
    </StateProvider>
  );
}

const styles = StyleSheet.create({});
