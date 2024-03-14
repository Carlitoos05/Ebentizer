import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { onValue, ref, set } from "firebase/database";
import { database } from "../firebase";

const Programe = () => {
  const [programs, setPrograms] = useState([]);
  const [data, setData] = useState(new Date());
  const [ampm, setAmpm] = useState();
  const [day, setDay] = useState();

  const getPrograme = () => {
    const programeRef = ref(database, "Programe/");
    onValue(programeRef, (snapshot) => {
      const data = snapshot.val();
      setPrograms(data);
    });
  };

  useEffect(() => {
    getPrograme();
  }, []);

  // const programsList = programs.map((program) => {
  //   program;
  // });
  console.log(programs);

  return (
    <View>
      <Text>Programe</Text>

      {/* <FlatList>{programsList}</FlatList> */}
    </View>
  );
};

export default Programe;

const styles = StyleSheet.create({});
