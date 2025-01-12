import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { onValue, push, ref } from "firebase/database";
import { database } from "../firebase";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const Administrar = () => {
  const navigation = useNavigation();

  const [pendings, setPendings] = useState([]);
  const [users, setUsers] = useState();
  const [autorizati, setAutorizati] = useState(false);
  const [noAutorizati, setNoAutorizati] = useState(false);

  const getPendings = () => {
    const pendingsRef = ref(database, "Usuarios/");
    onValue(pendingsRef, (snapshot) => {
      const tmpArray = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        tmpArray.push({ id: childKey, ...childData });
      });
      const listOfPendings = tmpArray.filter((user) => user.role === 0);
      const acceptedUsers = tmpArray.filter(
        (user) => user.role === 1 || user.role === 3
      );
      setUsers(acceptedUsers);
      setPendings(listOfPendings);
    });
  };

  useEffect(() => {
    getPendings();
  }, []);

  console.log(pendings);

  const myItemSeparator = () => {
    return (
      <View
        style={{ height: 1, backgroundColor: "grey", marginHorizontal: 10 }}
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

  return (
    <View>
      <Button onPress={() => setAutorizati(!autorizati)}>AUTORIZATI</Button>
      <Button onPress={() => setNoAutorizati(!noAutorizati)}>
        NEAUTORIZATI
      </Button>

      {autorizati && (
        <FlatList
          data={users}
          renderItem={({ item }) => (
            <Text
              onPress={() => navigation.navigate("User", { user: item })}
              style={styles.item}
            >
              {JSON.stringify(item.name)} Telefon:
              {JSON.stringify(item.phoneNumber)}
            </Text>
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
              }}
            >
              Autorizati
            </Text>
          )}
        />
      )}
      {noAutorizati && (
        <FlatList
          data={pendings}
          renderItem={({ item }) => (
            <Text
              onPress={() => navigation.navigate("User", { user: item })}
              style={styles.item}
            >
              {JSON.stringify(item.name)} Telefon:
              {JSON.stringify(item.phoneNumber)}
            </Text>
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
              }}
            >
              Neautorizati
            </Text>
          )}
        />
      )}

      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <LinearGradient
          colors={["#560CCE", "#dda0dd"]}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Adauga</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Administrar;

const styles = StyleSheet.create({
  appButtonContainer: {
    margin: 5,
    elevation: 8,
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
  item: {
    backgroundColor: "#dcdcdc",
    padding: 20,
    marginTop: 5,
    fontSize: 20,
  },
});
