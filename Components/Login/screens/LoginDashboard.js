import React, { useEffect, useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { db } from "../../../firebase";
import { ref, onValue, set } from "firebase/database";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Image, StyleSheet } from "react-native";
// import { auth } from "../../../firebase";

export default function Dashboard({ navigation }) {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [user, setUser] = useState("");

  const image = require("../../Logotipos Finales/Logotipos/Color/Color.png");

  const getUser = () => {
    const usersRef = ref(database, `Usuarios/${currentUser.uid}`);
    onValue(usersRef, (snapshot) => {
      const grup = snapshot.val();

      setUser(grup);
    });
  };
  useEffect(() => {
    getUser;
  }, []);

  useEffect(() => {
    if (user.role === "user") {
      navigation.navigate("Dashboard");
    }
  }, [user]);

  function handlerLogout() {
    setUser("");
    signOut(auth).then(() => {
      console.log("signed out");
    });
    navigation.reset({
      index: 0,
      routes: [{ name: "StartScreen" }],
    });
  }

  console.log("usuario", user);

  return (
    <Background>
      <Image source={image} style={styles.image} />
      {/* <Header>{driver ? driver.name : ""}</Header> */}
      <Paragraph>Asteapta sa fii AUTORIZAT !</Paragraph>
      <Button mode="outlined" onPress={handlerLogout}>
        Logout
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});
