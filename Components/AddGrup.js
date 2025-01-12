import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { onValue, ref, set, push } from "firebase/database";
import { database } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { MultipleSelectList } from "react-native-dropdown-select-list";

export default function AddGrup() {
  const navigation = useNavigation();

  const [users, setUsers] = useState([]);
  const [voices, setVoices] = useState([]);
  const [selected, setSelected] = useState("");

  //anadir el nombre del grupo en OnSubmit//
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      name: "",
      team: voices,
    },
  });
  //anadir  los nombres de personas a "team" en OnSubmit//
  useEffect(() => {
    resetField("team", { defaultValue: voices });
  }, [voices]);

  const onSubmit = (data) => {
    if (data) {
      const groupsRef = ref(database, "Grupuri");
      push(groupsRef, { name: data.name, team: data.team })
        .then((dt) => {
          console.log("Group Added");
        })
        .catch((error) => console.error(error));
    }
    navigation.navigate("Grupuri");
  };
  //Obtener todos los usuarios//
  const getUsers = () => {
    const usersRef = ref(database, "Usuarios/");
    onValue(usersRef, (snapshot) => {
      const tmpArray = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        tmpArray.push({ id: childKey, ...childData });
      });
      const usuarios = tmpArray;
      setUsers(usuarios);
    });
  };
  useEffect(() => {
    getUsers();
  }, []);

  //cambiamos las clave:valor de "users" para poder sortar en SelectBox//
  const options = users?.map(({ id, name }) => ({
    key: id,
    value: name,
  }));

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Alege un Nume"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="name"
      />
      {errors.name && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <MultipleSelectList
            placeholder="Alege Vocalistii"
            setSelected={(val) => setSelected(val)}
            data={options}
            save="value"
            onSelect={() => setVoices(selected)}
            label="Vocalisti: "
          />
          // <SelectBox
          //   label="Alege vocalisti"
          //   options={options}
          //   selectedValues={selectedTeams}
          //   onMultiSelect={onMultiChange()}
          //   onTapClose={onMultiChange()}
          //   isMulti
          // />
        )}
        name="team"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    backgroundColor: "white",
    fontSize: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
