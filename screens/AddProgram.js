import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { onValue, push, ref, set } from "firebase/database";
import { database } from "../firebase";
import DatePicker from "../Components/DatePicker";
import Calendario from "../Components/Calendar";

const AddProgram = () => {
  const [data, setData] = useState();
  const [ampm, setAmpm] = useState();
  const [day, setDay] = useState();

  const newProgram = () => {
    if (data) {
      const dataRef = ref(database, "Programe");
      const newProgram = push(dataRef, data);
      // console.log("to database", newProgram.key);
    }
  };

  // const getPrograme = () => {
  //   const programeRef = ref(database, "programe");
  //   onValue(programeRef, (snapshot) => {
  //     const data = snapshot.val();
  //     console.log("data", data);
  //   });
  // };

  useEffect(() => {
    // getPrograme();
  }, []);

  const getDate = (date) => {
    setData(date.toLocaleString());
  };

  // console.log("data: ", data);
  return (
    <View>
      <Text>Adauga un PROGRAM</Text>
      <DatePicker getDate={getDate} />
      <TouchableOpacity onPress={newProgram}>
        <LinearGradient
          colors={["#004d40", "#009688"]}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Save</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default AddProgram;

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
});
