import React, { useContext, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";

import {
  Button,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StateContext } from "../context";
import ModalSelect, { Item } from "react-native-expo-modal-select";
import { MultiSelect } from "react-native-element-dropdown";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Flex } from "@react-native-material/core";
import { onValue, ref, update } from "firebase/database";
import { database } from "../firebase";
import AntDesign from "@expo/vector-icons/AntDesign";

const Program = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { programId } = route.params;

  // Traemos los datos de Context
  const [users, setUsers, grupuri, setGrupuri, programe] =
    useContext(StateContext);

  const [grup, setGrup] = useState("");

  const [program, setProgram] = useState();
  const [voci, setVoci] = useState();
  const [pian, setPian] = useState();
  const [orga, setOrga] = useState();
  const [chitara, setChitara] = useState();
  const [bass, setBass] = useState();
  const [tobe, setTobe] = useState();
  const [projector, setProjector] = useState();
  const [audioMixer, setAudioMixer] = useState();
  const [vociModificate, setVociModificate] = useState();
  const [pianModificate, setPianModificate] = useState();
  const [orgaModificate, setOrgaModificate] = useState();
  const [chitaraModificate, setChitaraModificate] = useState();
  const [bassModificate, setBassModificate] = useState();
  const [tobeModificate, setTobeModificate] = useState();
  const [projectorModificate, setProjectorModificate] = useState();
  const [audioMixerModificate, setAudioMixerModificate] = useState();

  const programRef = ref(database, `Programe/${programId}`);
  useEffect(() => {
    onValue(programRef, async (snapshot) => {
      const programSnapshot = await snapshot.val();
      setProgram(programSnapshot);
      setVoci(programSnapshot.voci?.map((voce) => voce.id));
      setPian(programSnapshot.pian?.map((pian) => pian.id));
      setOrga(programSnapshot.orga?.map((orga) => orga.id));
      setChitara(programSnapshot.chitara?.map((chitara) => chitara.id));
      setBass(programSnapshot.bass?.map((bass) => bass.id));
      setTobe(programSnapshot.tobe?.map((tobe) => tobe.id));
      setProjector(programSnapshot.projector?.map((projector) => projector.id));
      setAudioMixer(programSnapshot?.audioMixer?.map((mixer) => mixer.id));
    });
  }, []);

  const updateProgram = () => {
    const newData = {
      voci: vociModificate ? vociModificate : [],
      pian: pianModificate ? pianModificate : [],
      orga: orgaModificate ? orgaModificate : [],
      chitara: chitaraModificate ? chitaraModificate : [],
      bass: bassModificate ? bassModificate : [],
      tobe: tobeModificate ? tobeModificate : [],
      projector: projectorModificate ? projectorModificate : [],
      audioMixer: audioMixerModificate ? audioMixerModificate : [],
    };
    update(programRef, newData)
      .then(() => {})
      .catch((err) => console.error(err));

    navigation.navigate("Programe");
  };
  useEffect(() => {
    //Anadimos "particip:false" a las personas que seteamos al "program"
    const transformarDatos = (datos) => {
      return datos?.map((elemento) => ({
        id: elemento,
        particip: false,
      }));
    };
    setVociModificate(transformarDatos(voci));
    setPianModificate(transformarDatos(pian));
    setOrgaModificate(transformarDatos(orga));
    setChitaraModificate(transformarDatos(chitara));
    setBassModificate(transformarDatos(bass));
    setTobeModificate(transformarDatos(tobe));
    setAudioMixerModificate(transformarDatos(audioMixer));
    setProjectorModificate(transformarDatos(projector));
  }, [voci, pian, orga, chitara, bass, tobe, audioMixer, projector]);

  //generamos 'value y 'label' para la lista de datos en "options" para "Multiselect"
  const generateOptions = (users, filterProperty) => {
    return users
      ?.filter(
        (user) => user[filterProperty] === true && user.disponibil === true
      )
      .map(({ id, name }) => ({ value: id, label: name }));
  };
  const optionsVoci = generateOptions(users, "voce");
  const optionsPian = generateOptions(users, "pian");
  const optionsOrga = generateOptions(users, "orga");
  const optionsChitara = generateOptions(users, "chitara");
  const optionsTobe = generateOptions(users, "tobe");
  const optionsBass = generateOptions(users, "bass");
  const optionsProjector = generateOptions(users, "proiector");
  const optionsAudioMixer = generateOptions(users, "mixer");

  return (
    <SafeAreaView>
      {program && (
        <ScrollView>
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={optionsVoci}
            labelField="label"
            valueField="value"
            placeholder="Voci : "
            searchPlaceholder="Search..."
            value={voci ? voci : []}
            onChange={(item) => {
              setVoci(item);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={optionsPian}
            labelField="label"
            valueField="value"
            placeholder="Pian : "
            searchPlaceholder="Search..."
            value={pian ? pian : []}
            onChange={(item) => {
              setPian(item);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={optionsOrga}
            labelField="label"
            valueField="value"
            placeholder="Orga : "
            searchPlaceholder="Search..."
            value={orga ? orga : []}
            onChange={(item) => {
              setOrga(item);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={optionsChitara}
            labelField="label"
            valueField="value"
            placeholder="Chitara : "
            searchPlaceholder="Search..."
            value={chitara ? chitara : []}
            onChange={(item) => {
              setChitara(item);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={optionsProjector}
            labelField="label"
            valueField="value"
            placeholder="Proiector : "
            searchPlaceholder="Search..."
            value={projector ? projector : []}
            onChange={(item) => {
              setProjector(item);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={optionsAudioMixer}
            labelField="label"
            valueField="value"
            placeholder="Mixer Audio : "
            searchPlaceholder="Search..."
            value={audioMixer ? audioMixer : []}
            onChange={(item) => {
              setAudioMixer(item);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={optionsBass}
            labelField="label"
            valueField="value"
            placeholder="Chitara Bass : "
            searchPlaceholder="Search..."
            value={bass ? bass : []}
            onChange={(item) => {
              setBass(item);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={optionsTobe}
            labelField="label"
            valueField="value"
            placeholder="Tobe : "
            searchPlaceholder="Search..."
            value={tobe ? tobe : []}
            onChange={(item) => {
              setTobe(item);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />
        </ScrollView>
      )}
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
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
