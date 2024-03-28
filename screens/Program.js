import React, { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StateContext } from "../context";
import ModalSelect, { Item } from "react-native-expo-modal-select";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Flex } from "@react-native-material/core";
import { onValue, ref, update } from "firebase/database";
import { database } from "../firebase";

const Program = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { programId } = route.params;

  // Traemos los datos de Context
  const [users, setUsers, grupuri, setGrupuri] = useContext(StateContext);

  const [grup, setGrup] = useState("");
  const [instruments, setInruments] = useState("");
  const [projector, setProjector] = useState("");
  const [audioMixer, setAudioMixer] = useState("");
  const [program, setProgram] = useState("");
  const [existGrup, setExistGrup] = useState("");

  const [existInstruments, setExistInstruments] = useState("");
  const [existProjector, setExistProjector] = useState("");
  const [existAudioMixer, setExistAudioMixer] = useState("");

  const programRef = ref(database, `Programe/${programId}`);
  useEffect(() => {
    onValue(programRef, (snapshot) => {
      const program = snapshot.val();
      setProgram(program);
      setExistGrup(program.grup);
      setExistInstruments(program.instruments);
      setExistProjector(program.projector);
      setExistAudioMixer(program.audioMixer);
    });
  }, []);
  console.log(program);
  console.log(existInstruments);

  const updateProgram = () => {
    const newData = {
      grup: grup || existGrup,
      instruments: instruments || existInstruments || "",
      projector: projector || existProjector || "",
      audioMixer: audioMixer || existAudioMixer || "",
    };
    update(programRef, newData)
      .then(() => {
        console.log("Actualizare correcta");
      })
      .catch((err) => console.error(err));

    navigation.navigate("Programe");
  };

  const [selectedGrup, setSelectedGrup] = React.useState("");
  //cambiamos las clave:valor de "users" para poder sortar en SelectBox
  // !!! Es obligatorio que tenga clave "key:" y  "value:"
  const optionsGrups = grupuri?.map(({ id, name }) => ({
    key: id,
    value: name,
  }));

  const [selectedInstruments, setSelectedInstruments] = React.useState("");
  const optionsInstruments = users?.map(({ id, name }) => ({
    key: id,
    value: name,
  }));
  const [selectedProjector, setSelectedProjector] = React.useState("");
  const optionsProjector = users?.map(({ id, name }) => ({
    key: id,
    value: name,
  }));
  const [selectedAudioMixer, setSelectedAudioMixer] = React.useState("");
  const optionsAudioMixer = users?.map(({ id, name }) => ({
    key: id,
    value: name,
  }));

  return (
    <SafeAreaView>
      {program && (
        <View>
          <View style={styles.modalSelector}>
            <MultipleSelectList
              defaultOption={{ key: "-Ntw83a4EKVrojqP4vnd", value: "Grupul" }}
              placeholder="Secteaza  un grup"
              setSelected={(val) => setSelectedGrup(val)}
              data={optionsGrups}
              save="value"
              onSelect={() => setGrup(selectedGrup)}
              label="Grup Cantari:"
            />
          </View>
          <Text>{existGrup}</Text>

          <View style={styles.modalSelector}>
            <MultipleSelectList
              placeholder="Instrumentisti"
              setSelected={(val) => setSelectedInstruments(val)}
              data={optionsInstruments}
              save="value"
              onSelect={() => setInruments(selectedInstruments)}
              label="Instrumentisti:"
            />
          </View>
          {existInstruments.map((index, item) => {
            <Text key={index}>{JSON.stringify(item)}</Text>;
          })}
          {/* <Text>{existInstruments}</Text> */}
          <View style={styles.modalSelector}>
            <MultipleSelectList
              placeholder="Proyector"
              setSelected={(val) => setSelectedProjector(val)}
              data={optionsProjector}
              save="value"
              onSelect={() => setProjector(selectedProjector)}
              label="Proyector:"
            />
          </View>
          <Text>{existProjector}</Text>
          <View style={styles.modalSelector}>
            <MultipleSelectList
              placeholder="Mixer Audio"
              setSelected={(val) => setSelectedAudioMixer(val)}
              data={optionsAudioMixer}
              save="value"
              onSelect={() => setAudioMixer(selectedAudioMixer)}
              label="Mixer Audio:"
            />
          </View>
          <Text>{program?.audioMixer}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={updateProgram}>
              <LinearGradient
                colors={["#004d40", "#009688"]}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}>save</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Programe")}>
              <LinearGradient
                colors={["#b22222", "#fa8072"]}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}>cancel</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Program;

const styles = StyleSheet.create({
  modalSelector: {
    // flex: 1,
    // justifyContent: "center",
    // padding: 26,
    // backgroundColor: "#ddd",
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
