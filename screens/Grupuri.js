import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { onValue, ref, set } from "firebase/database";
import { database } from "../firebase";
import { useNavigation } from "@react-navigation/native";

const Grupuri = () => {
  const navigation = useNavigation();

  const [grupuri, setGrupuri] = useState();

  const getGrupuri = () => {
    const grupuriRef = ref(database, "Grupuri/");
    onValue(grupuriRef, (snapshot) => {
      const tmpArray = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        tmpArray.push({ id: childKey, ...childData });
      });
      const grupuri = tmpArray;

      setGrupuri(grupuri);
    });
  };

  useEffect(() => {
    getGrupuri();
  }, []);

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
      <FlatList
        data={grupuri}
        renderItem={({ item }) => (
          <Text
            onPress={() => navigation.navigate("Grup", { grupId: item.id })}
            style={styles.item}
          >
            {item.name}
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
              textDecorationLine: "underline",
            }}
          >
            Grupuri create
          </Text>
        )}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("AddGrup")}>
          <LinearGradient
            colors={["#004d40", "#009688"]}
            style={styles.appButtonContainer}
          >
            <Text style={styles.appButtonText}>Adauga un grup </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Grupuri;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    fontSize: 30,
  },
  item: {
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
