import { useRoute } from "@react-navigation/native";
import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { database } from "../firebase";

const Grup = () => {
  const [grup, setGrup] = useState([]);

  const route = useRoute();
  const { grupId } = route.params;

  const getGrup = () => {
    const grupuriRef = ref(database, `Grupuri/${grupId}`);
    onValue(grupuriRef, (snapshot) => {
      const grup = snapshot.val();

      setGrup(grup);
    });
  };

  useEffect(() => {
    getGrup();
  }, []);
  return (
    <View>
      {grup && (
        <View>
          <Text>Grup {grup.name}</Text>
          <Text>Voci : {grup?.team?.join(",  ")}</Text>
        </View>
      )}
    </View>
  );
};

export default Grup;

const styles = StyleSheet.create({});
