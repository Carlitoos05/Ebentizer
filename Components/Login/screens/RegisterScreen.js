import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
// import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import { phoneValidator } from "../helpers/phoneValidator";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { auth, database, db } from "../../../firebase";
import { ref, onValue, set } from "firebase/database";
import * as Crypto from "expo-crypto";
import BackButton from "../components/BackButton";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [error, setError] = useState(null);

  const image = require("../../Logotipos Finales/Logotipos/Color/Color.png");

  const onSignUpPressed = () => {
    setError(null);
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const phoneError = phoneValidator(phoneNumber.value);
    if (emailError || passwordError || nameError || phoneError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPhoneNumber({ ...phoneNumber, error: phoneError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        const user = userCredential.user;

        const usuario = {
          name: name.value,
          email: email.value,
          phoneNumber: phoneNumber.value,
          role: "unauthorized",
        };
        const usersRef = ref(database, `Usuarios/${user.uid}`);
        set(usersRef, usuario)
          .then((data) => {
            // console.log("user uid", user.uid);

            updateProfile(auth.currentUser, {
              displayName: name.value,
              phoneNumber: phoneNumber.value,
              photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
              .then(() => {
                // Profile updated!
                // ...
                navigation.navigate("LoginDashboard");
              })
              .catch((error) => {
                // An error occurred
                // ...
              });
          })
          .catch((err) => console.error(err));
      })

      .catch((error) => {
        console.log("register error", error);
        setError(error.message);
      });
  };

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Image source={image} style={styles.image} />

      {/* <Header>Create Account</Header> */}
      <TextInput
        label="Numele complet"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Telefon"
        returnKeyType="next"
        value={phoneNumber.value}
        onChangeText={(text) => setPhoneNumber({ value: text, error: "" })}
        error={!!phoneNumber.error}
        errorText={phoneNumber.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Parola"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
      {error && (
        <View>
          <Text>{error}</Text>
        </View>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  image: {
    height: 100,
    width: 100,
  },
});
