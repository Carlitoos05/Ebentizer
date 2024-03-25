import { useRoute } from "@react-navigation/native";
import { updateProfile } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import SwitchSelector from "react-native-switch-selector";
import { auth, database } from "../firebase";
import { ref, set, update } from "firebase/database";

const User = () => {
  const route = useRoute();
  const { user } = route.params;

  console.log(user);

  const usuario = {
    role: "user",
  };
  const toggleUser = (value) => {
    const userRef = ref(database, `Usuarios/${user.id}`);
    update(userRef, { role: value })
      .then((data) => console.log("user schimbat"))
      .catch((err) => console.error(err));
  };

  const options = [
    {
      label: "NEAUTORIZAT",
      value: `unauthorized`,
      testID: "switch-one",
      accessibilityLabel: "switch-one",
    },
    {
      label: "AUTORIZAT",
      value: "user",
      testID: "switch-one-thirty",
      accessibilityLabel: "switch-one-thirty",
    },
  ];

  // render
  return (
    <View>
      <Text>Utilizator: {user.name}</Text>
      <SwitchSelector
        options={options}
        initial={0}
        onPress={(value) => toggleUser(value)}
      />
    </View>
  );
};

export default User;

const styles = StyleSheet.create({});
