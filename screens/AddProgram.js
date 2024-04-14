import React, { useEffect, useState, useContext } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { onValue, push, ref, set } from "firebase/database";
import { database } from "../firebase";
import DatePicker from "../Components/DatePicker";
import { useNavigation } from "@react-navigation/native";
import { MultiSelect } from "react-native-element-dropdown";
import { StateContext } from "../context";
import AntDesign from "@expo/vector-icons/AntDesign";

const AddProgram = () => {
  const navigation = useNavigation();
  const [users, setUsers, grupuri, setGrupuri, programe] =
    useContext(StateContext);

  const [data, setData] = useState("");
  const [grup, setGrup] = useState("");

  const [voci, setVoci] = useState([]);
  const [pian, setPian] = useState([]);
  const [orga, setOrga] = useState([]);
  const [chitara, setChitara] = useState([]);
  const [bass, setBass] = useState([]);
  const [tobe, setTobe] = useState([]);
  const [projector, setProjector] = useState([]);
  const [audioMixer, setAudioMixer] = useState([]);
  const [vociModificate, setVociModificate] = useState([]);
  const [pianModificate, setPianModificate] = useState([]);
  const [orgaModificate, setOrgaModificate] = useState([]);
  const [chitaraModificate, setChitaraModificate] = useState([]);
  const [bassModificate, setBassModificate] = useState([]);
  const [tobeModificate, setTobeModificate] = useState([]);
  const [audioMixerModificate, setAudioMixerModificate] = useState([]);
  const [proiectorModificate, setProiectorModificate] = useState([]);

  const setNewProgram = () => {
    if (data) {
      const programsRef = ref(database, "Programe");
      push(programsRef, {
        data: data,
        voci: vociModificate ? vociModificate : [],
        pian: pianModificate ? pianModificate : [],
        orga: orgaModificate ? orgaModificate : [],
        chitara: chitaraModificate ? chitaraModificate : [],
        bass: bassModificate ? bassModificate : [],
        tobe: tobeModificate ? tobeModificate : [],
        projector: proiectorModificate ? proiectorModificate : [],
        audioMixer: audioMixerModificate ? audioMixerModificate : [],
      })
        .then((dt) => {
          "NewProgram";
        })
        .catch((error) => console.error(error));
    }
    navigation.navigate("Programe");
  };

  const getDate = (date) => {
    setData(date.toLocaleString());
  };

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

  //Anadimos "particip" a las personas que seteamos al "program"
  useEffect(() => {
    const newCustomValues = voci?.map((elemento) => ({
      id: elemento,
      particip: false,
    }));

    setVociModificate(newCustomValues);
  }, [voci]);

  useEffect(() => {
    const newCustomValues = pian?.map((elemento) => ({
      id: elemento,
      particip: false,
    }));
    setPianModificate(newCustomValues);
  }, [pian]);

  useEffect(() => {
    const newCustomValues = orga?.map((elemento) => ({
      id: elemento,
      particip: false,
    }));
    setOrgaModificate(newCustomValues);
  }, [orga]);

  useEffect(() => {
    const newCustomValues = chitara?.map((elemento) => ({
      id: elemento,
      particip: false,
    }));
    setChitaraModificate(newCustomValues);
  }, [chitara]);

  useEffect(() => {
    const newCustomValues = tobe?.map((elemento) => ({
      id: elemento,
      particip: false,
    }));
    setTobeModificate(newCustomValues);
  }, [tobe]);

  useEffect(() => {
    const newCustomValues = bass?.map((elemento) => ({
      id: elemento,
      particip: false,
    }));
    setBassModificate(newCustomValues);
  }, [bass]);

  useEffect(() => {
    const newCustomValues = projector?.map((elemento) => ({
      id: elemento,
      particip: false,
    }));
    setProiectorModificate(newCustomValues);
  }, [projector]);

  useEffect(() => {
    const newCustomValues = audioMixer?.map((elemento) => ({
      id: elemento,
      particip: false,
    }));
    setAudioMixerModificate(newCustomValues);
  }, [audioMixer]);

  return (
    <View>
      <DatePicker getDate={getDate} />

      <View>
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
          value={voci}
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={setNewProgram}>
          <LinearGradient
            colors={["#004d40", "#009688"]}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Save {data}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddProgram;

const styles = StyleSheet.create({
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
