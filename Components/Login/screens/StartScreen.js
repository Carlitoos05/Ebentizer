import { React, useEffect, useState } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Image, StyleSheet } from "react-native";

export default function StartScreen({ navigation }) {
  const [user, setUser] = useState();

  const image = require("../../Logotipos Finales/Logotipos/Color/Color.png");

  // const getUser = () => {
  //   actualUser = ;
  //   setUser(actualUser);
  // };

  // useEffect(() => {
  //   getUser;
  // }, [user]);
  // console.log(user);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (authUser) => {
  //     if (authUser) {
  //       setUser(authUser);
  //       console.log("state changed");
  //     }
  //   });
  // }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     console.log("focus");
  //     if (user) {
  //       navigation.navigate("Dashboard");
  //     }
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  return (
    <Background>
      <Image source={image} style={styles.image} />
      {/* <Header>Login Template</Header>
      <Paragraph>
        The easiest way to start with your amazing application.
      </Paragraph> */}
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>
    </Background>
  );
}
const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 300,
  },
});
