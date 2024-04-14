import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { onValue, ref, remove, set } from "firebase/database";
import { database } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";
import Dialog from "react-native-dialog";

const Programe = () => {
  const navigation = useNavigation();

  const [programs, setPrograms] = useState();
  const [idToDelete, setIdToDelete] = useState();
  const [visible, setVisible] = useState(false);

  const programeRef = ref(database, "Programe/");

  const getPrograme = () => {
    onValue(programeRef, (snapshot) => {
      const tmpArray = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        tmpArray.push({ id: childKey, ...childData });
      });
      const programs = tmpArray;

      setPrograms(programs);
    });
  };

  useEffect(() => {
    getPrograme();
  }, []);

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
  const onDeleteProgram = (programId) => {
    setVisible(false);
    const programRefToDelete = ref(database, `Programe/${idToDelete}`);
    remove(programRefToDelete)
      .then((data) => console.log("program deleted", data))
      .catch((err) => console.error(err));
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const showDialog = (programId) => {
    setIdToDelete(programId);
    setVisible(true);
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={programs}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text
              onPress={() =>
                navigation.navigate("Program", { programId: item.id })
              }
            >
              {JSON.stringify(item.data)}
            </Text>
            <TouchableOpacity onPress={() => showDialog(item.id)}>
              <SimpleLineIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("AddProgram")}>
          <LinearGradient
            colors={["#004d40", "#009688"]}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Adauga un program</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.container}>
          <Dialog.Container visible={visible}>
            <Dialog.Title>Atentie !</Dialog.Title>
            <Dialog.Description>
              Esti sigur ca vrei sa stergi DEFINITIV programul ?
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="Delete" onPress={onDeleteProgram} />
          </Dialog.Container>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Programe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    fontSize: 30,
  },
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
});
