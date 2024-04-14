import { useRoute } from "@react-navigation/native";
import { updateProfile } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Switch, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import SwitchSelector from "react-native-switch-selector";
import { auth, database } from "../firebase";
import { onValue, ref, set, update } from "firebase/database";
import { LinearGradient } from "expo-linear-gradient";
import { StateContext } from "../context";
import { useNavigation } from "@react-navigation/native";

const User = () => {
  const route = useRoute();
  const { user } = route.params;
  const navigation = useNavigation();

  const [users, setUsers, grupuri, setGrupuri] = useContext(StateContext);

  const [disponibil, setDisponibil] = useState(false);

  const [voce, setVoce] = useState(false);
  const [pian, setPian] = useState(false);
  const [orga, setOrga] = useState(false);
  const [chitara, setChitara] = useState(false);
  const [bass, setBass] = useState(false);
  const [tobe, setTobe] = useState(false);
  const [proiector, setProiector] = useState(false);
  const [mixer, setMixer] = useState(false);

  const userRef = ref(database, `Usuarios/${user.id}`);

  useEffect(() => {
    onValue(userRef, async (snapshot) => {
      const userSnapshot = await snapshot.val();
      setDisponibil(userSnapshot.disponibil);
      setVoce(userSnapshot.voce);
      setPian(userSnapshot.pian);
      setOrga(userSnapshot.orga);
      setChitara(userSnapshot.chitara);
      setBass(userSnapshot.bass);
      setTobe(userSnapshot.tobe);
      setProiector(userSnapshot.proiector);
      setMixer(userSnapshot.mixer);
    });
  }, []);

  const updateUser = () => {
    const newData = {
      disponibil: disponibil ? disponibil : false,
      voce: voce ? voce : false,
      pian: pian ? pian : false,
      orga: orga ? orga : false,
      chitara: chitara ? chitara : false,
      bass: bass ? bass : false,
      tobe: tobe ? tobe : false,
      proiector: proiector ? proiector : false,
      mixer: mixer ? mixer : false,
    };

    update(userRef, newData)
      .then(() => {
        console.log("Actualizare correcta");
      })
      .catch((err) => console.error(err));

    navigation.navigate("Administrar");
  };

  const toggleUAuthorize = (value) => {
    const userRef = ref(database, `Usuarios/${user.id}`);
    update(userRef, { role: value })
      .then((data) => console.log("user schimbat"))
      .catch((err) => console.error(err));
  };

  const toggleDisponibil = () =>
    setDisponibil((previousState) => !previousState);

  const [isChecked, setChecked] = useState(false);

  const options = [
    {
      label: "NEAUTORIZAT",
      value: 0,
      testID: "switch-one",
      accessibilityLabel: "switch-one",
    },
    {
      label: "AUTORIZAT",
      value: 1,
      testID: "switch-one-thirty",
      accessibilityLabel: "switch-one-thirty",
    },
  ];

  return (
    <View>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          marginTop: 20,
          fontWeight: "bold",
          // textDecorationLine: "underline",
        }}
      >
        {user.name}
      </Text>
      <View
        style={{
          height: 3,
          backgroundColor: "grey",
          marginHorizontal: 5,
          margin: 5,
        }}
      />

      <SwitchSelector
        options={options}
        initial={user.role}
        onPress={(value) => toggleUAuthorize(value)}
      />
      <View
        style={{
          height: 1,
          backgroundColor: "grey",
          marginHorizontal: 20,
          margin: 5,
        }}
      />
      <View style={styles.disponibil}>
        <Text>Disponibil: </Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={disponibil ? "#98fb98" : "#d3d3d3"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDisponibil}
          value={disponibil}
        />
      </View>
      <View
        style={{
          height: 1,
          backgroundColor: "grey",
          marginHorizontal: 20,
          margin: 5,
        }}
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={voce}
          onValueChange={setVoce}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Text style={styles.paragraph}> Voce</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={pian}
          onValueChange={setPian}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Text style={styles.paragraph}> Pian</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={orga}
          onValueChange={setOrga}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Text style={styles.paragraph}> Orga</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={chitara}
          onValueChange={setChitara}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Text style={styles.paragraph}> Chitara</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={bass}
          onValueChange={setBass}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Text style={styles.paragraph}> Chitara Bass</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={tobe}
          onValueChange={setTobe}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Text style={styles.paragraph}> Tobe</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={proiector}
          onValueChange={setProiector}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Text style={styles.paragraph}> Proiector</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox
          style={styles.checkbox}
          value={mixer}
          onValueChange={setMixer}
          color={isChecked ? "#4630EB" : undefined}
        />
        <Text style={styles.paragraph}> Mixer Audio</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={updateUser}>
          <LinearGradient
            colors={["#004d40", "#009688"]}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>save</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Administrar")}>
          <LinearGradient
            colors={["#b22222", "#fa8072"]}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>cancel</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  disponibil: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 40,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 15,
    marginHorizontal: 10,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  appButtonContainer: {
    margin: 5,
    elevation: 15,
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
  buttonContainer: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
