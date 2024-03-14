import React from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Dashboard = () => {
  const navigation = useNavigation();
  // render
  return (
    <LinearGradient
      style={styles.background}
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <StatusBar style="auto" />
      <Text>EBEN EZER </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Programe")}>
        <LinearGradient
          colors={["#004d40", "#009688"]}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Programe</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("AddProgram")}>
        <LinearGradient
          colors={["#004d40", "#009688"]}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Adauga un program</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cantari")}>
        <LinearGradient
          colors={["#004d40", "#009688"]}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Cantari</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Responsabili")}>
        <LinearGradient
          colors={["#004d40", "#009688"]}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Responsabili</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text>URMATOARELE PROGRAME </Text>
    </LinearGradient>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appButtonContainer: {
    margin: 5,
    elevation: 8,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
