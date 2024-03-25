import React, { useContext, useState } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StateContext } from "../context";
import ModalSelect, { Item } from "react-native-expo-modal-select";
import { MultipleSelectList } from "react-native-dropdown-select-list";

const Program = () => {
  const [users, setUsers, grupuri, setGrupuri] = useContext(StateContext);

  const [grup, setGrup] = useState();

  console.log("grupuri", grupuri);

  const addGroup = () => {};
  const addInstruments = () => {};

  const [selected, setSelected] = React.useState("");
  //cambiamos las clave:valor de "users" para poder sortar en SelectBox//
  const optionsGrups = grupuri?.map(({ id, name }) => ({
    key: id,
    value: name,
  }));
  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];
  return (
    <SafeAreaView>
      <View style={styles.modalSelector}>
        <MultipleSelectList
          placeholder="Secteaza  un grup"
          setSelected={(val) => setSelected(val)}
          data={optionsGrups}
          save="value"
          onSelect={() => addGroup(selected)}
          label="Grup Cantari:"
        />
      </View>

      <View>
        <Text>Instrumentisti :</Text>
        <Button onPress={addInstruments} title="Alege" />
      </View>
      <View>
        <Text>Proyector: </Text>
        <Button onPress={addGroup} title="Alege " />
      </View>
      <View>
        <Text>Mixer Audio: </Text>
        <Button onPress={addGroup} title="Alege " />
      </View>
      <FlatList
        data={grupuri}
        renderItem={({ item }) => (
          <Text
            onPress={() =>
              navigation.navigate("Program", { programId: item.id })
            }
            style={styles.item}
          >
            {JSON.stringify(item.name)}
          </Text>
        )}
        keyExtractor={(item) => item.id}
        // ItemSeparatorComponent={myItemSeparator}
        // ListEmptyComponent={myListEmpty}
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
            grupuri
          </Text>
        )}
      />
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
});
