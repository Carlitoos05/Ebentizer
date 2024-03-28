import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, signOut } from "firebase/auth";
import { database } from "../firebase";
import { ref, onValue } from "firebase/database";
import { SimpleLineIcons } from "@expo/vector-icons";

const Dashboard = () => {
  const navigation = useNavigation();
  const auth = getAuth();

  const [user, setUser] = useState("");
  const [rol, setRol] = useState();

  const image = require("../Components/Logotipos Finales/Símbolos/White/MedioLogo.png");

  //Obtener los datos del usuario Autentificado//

  useEffect(() => {
    const userId = auth.currentUser.uid;
    const userRef = ref(database, `Usuarios/${userId}`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUser(data);
    });
  }, []);

  console.log("usuario", user);
  const onLogOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("LoginScreen");
        console.log("sign-out");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <LinearGradient
      style={styles.background}
      colors={["#cc6d13", "#3b5998", "#101d3f"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text>Hello {user?.name}</Text>
        <SimpleLineIcons
          name="logout"
          size={24}
          color="black"
          onPress={onLogOut}
        />
        <Text style={styles.title}>ORGANIZARE PROGRAME</Text>

        <View style={styles.butonsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Programe")}>
            <LinearGradient
              colors={["#004d40", "#009688"]}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Programe</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Grupuri")}>
            <LinearGradient
              colors={["#004d40", "#009688"]}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Grupuri</Text>
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
          {user?.role === "admin" && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Administrar")}
            >
              <LinearGradient
                colors={["#b22222", "#fa8072"]}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}>Administrar</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
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
  title: {
    fontSize: 45,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  image: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    // opacity: 0.5,
  },

  butonsContainer: {
    // backgroundColor: "red",
    height: "70%",
    width: "100%",
    display: "flex",
    alignItems: "flex-start",
    marginLeft: 10,
    // flexDirection: "column-reverse",
    justifyContent: "flex-end",
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
