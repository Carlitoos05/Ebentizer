import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  SectionList,
} from "react-native";
import { StateContext } from "../context";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { onValue, ref } from "firebase/database";
import { database } from "../firebase";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Programari = () => {
  const navigation = useNavigation();
  const [users, setUsers, grupuri, setGrupuri, programe] =
    useContext(StateContext);
  const [modalVisible, setModalVisible] = useState(false);

  const [program, setProgram] = useState();
  const [voci, setVoci] = useState();
  const [pian, setPian] = useState();
  const [orga, setOrga] = useState();
  const [chitara, setChitara] = useState();
  const [bass, setBass] = useState();
  const [tobe, setTobe] = useState();
  const [projector, setProjector] = useState();
  const [audioMixer, setAudioMixer] = useState();

  const myItemSeparator = () => {
    return (
      <View
        style={{ height: 1, backgroundColor: "grey", marginHorizontal: 20 }}
      />
    );
  };

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  };

  const viewProgram = (id) => {
    const programRef = ref(database, `Programe/${id}`);
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
    setModalVisible(true);
  };
  // console.log("program", program.pian);
  const closeProgram = () => {
    setProgram(undefined);
    setModalVisible(!modalVisible);
  };
  //Buscamos y anadimos a "vociSet" los users.name que estan setados como "voci"para "SectionList"
  let vociSet = [];
  let pianSet = [];
  let orgaSet = [];
  let chitaraSet = [];
  let bassSet = [];
  let tobeSet = [];
  let proiectorSet = [];
  let audioMixerSet = [];
  const DATA = [
    {
      title: "Voci",
      data: vociSet,
    },
    {
      title: "Pian",
      data: pianSet,
    },
    {
      title: "Orga",
      data: orgaSet,
    },
    {
      title: "Chitara",
      data: chitaraSet,
    },
    {
      title: "Bass",
      data: bassSet,
    },
    {
      title: "Tobe",
      data: tobeSet,
    },
    {
      title: "Proiector",
      data: proiectorSet,
    },
    {
      title: "Mixer Audio",
      data: audioMixerSet,
    },
  ];
  console.log("pian", pian);
  //Buscamos el nombre de user por el ID de "voci' (desde "Programe")
  if (users && program) {
    for (let user of users) {
      for (let item of voci ? voci : []) {
        if (user.id === item) {
          vociSet.push(user.name);
        }
      }
      for (let item of pian ? pian : []) {
        if (user.id === item) {
          pianSet.push(user.name);
        }
      }
      for (let item of orga ? orga : []) {
        if (user.id === item) {
          orgaSet.push(user.name);
        }
      }
      for (let item of chitara ? chitara : []) {
        if (user.id === item) {
          chitaraSet.push(user.name);
        }
      }
      for (let item of bass ? bass : []) {
        if (user.id === item) {
          bassSet.push(user.name);
        }
      }
      for (let item of tobe ? tobe : []) {
        if (user.id === item) {
          tobeSet.push(user.name);
        }
      }
      for (let item of projector ? projector : []) {
        if (user.id === item) {
          proiectorSet.push(user.name);
        }
      }
      for (let item of audioMixer ? audioMixer : []) {
        if (user.id === item) {
          audioMixerSet.push(user.name);
        }
      }
    }
  }

  return (
    <View>
      <FlatList
        data={programe}
        renderItem={({ item }) => (
          <Pressable onPress={() => viewProgram(item.id)} style={styles.item}>
            <Text onPress={() => viewProgram(item.id)}>
              {JSON.stringify(item.data)}
            </Text>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
        ListHeaderComponent={() => (
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              marginTop: 20,
              fontWeight: "bold",
              // textDecorationLine: "underline",
            }}
          >
            Programe create
          </Text>
        )}
      />
      {program && (
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              // Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.container}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "900",
                      textAlign: "center",

                      textDecorationColor: "red",
                    }}
                  >
                    PROGRAMARI
                  </Text>
                  <SectionList
                    sections={DATA}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => (
                      <View style={styles.taskItemView}>
                        <Text style={styles.taskItem}>{item}</Text>
                        {item.confi}
                        <Feather name="check" size={24} color="black" />
                        <AntDesign
                          name="exclamationcircleo"
                          size={24}
                          color="black"
                        />
                      </View>
                    )}
                    renderSectionHeader={({ section: { title } }) => (
                      <Text style={styles.taskTitle}>{title}</Text>
                    )}
                  />
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={closeProgram}
                >
                  <Text style={styles.textStyle}> Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default Programari;

const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,

    width: "96%",
    backgroundColor: "#e6e6fa",
    padding: 20,
    marginTop: 5,
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    height: "90%",
    width: "90%",
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingTop: 22,
    width: "80%",
  },
  taskItemView: {
    display: "flex",
    flexDirection: "row",
  },
  taskItem: {
    padding: 5,
    marginVertical: 5,
    fontSize: 16,
  },
  taskTitle: {
    textAlign: "center",
    borderWidth: 3,
    borderColor: "#d3d3d3",
    backgroundColor: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
    elevation: 9,
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
  },
});
