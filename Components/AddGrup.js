import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import { onValue, ref, set, push } from "firebase/database";
import { database } from "../firebase";
import { useNavigation } from "@react-navigation/native";

export default function AddGrup() {
  const navigation = useNavigation();

  const [users, setUsers] = useState([]);
  const [voices, setVoices] = useState([]);

  // Utilizar la función map() para extraer los valores de la clave 'nombre'
  const valoresNombres = voices.map((objeto) => objeto.item);

  // Convertir los valores de 'nombre' en texto
  const textoNombres = valoresNombres.join(", ");

  //anadir el nombre del grupo en OnSubmit//
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: {
      name: "",
      team: textoNombres,
    },
  });
  //anadir  los nombres de personas a "team" en OnSubmit//
  useEffect(() => {
    resetField("team", { defaultValue: textoNombres });
  }, [voices]);

  const onSubmit = (data) => {
    if (data) {
      const groupsRef = ref(database, "Grupuri");
      push(groupsRef, { name: data.name, team: data.team })
        .then((dt) => {
          console.log(dt.name, dt.team);
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

  // seleccionar los equipos //
  const [selectedTeams, setSelectedTeams] = useState([]);

  // console.log(selectedTeams.length);

  function onMultiChange() {
    return (item) => setSelectedTeams(xorBy(selectedTeams, [item], "id"));
  }

  useEffect(() => {
    setVoices(selectedTeams);
  }, [selectedTeams]);

  //cambiamos las clave:valor de "users" para poder sortar en SelectBox//
  const options = users?.map(({ id, name }) => ({ id: id, item: name }));
  console.log(options);

  // EJEMPLO DE LISTA DE OPCIONES PARA SELECTBOX//
  // const K_OPTIONS = [
  //   {
  //     item: "Juventus",
  //     id: "JUVE",
  //   },
  //   {
  //     item: "Real Madrid",
  //     id: "RM",
  //   },
  //   {
  //     item: "Barcelona",
  //     id: "BR",
  //   },
  //   {
  //     item: "PSG",
  //     id: "PSG",
  //   },
  //   {
  //     item: "FC Bayern Munich",
  //     id: "FBM",
  //   },
  //   {
  //     item: "Manchester United FC",
  //     id: "MUN",
  //   },
  //   {
  //     item: "Manchester City FC",
  //     id: "MCI",
  //   },
  //   {
  //     item: "Everton FC",
  //     id: "EVE",
  //   },
  //   {
  //     item: "Tottenham Hotspur FC",
  //     id: "TOT",
  //   },
  //   {
  //     item: "Chelsea FC",
  //     id: "CHE",
  //   },
  //   {
  //     item: "Liverpool FC",
  //     id: "LIV",
  //   },
  //   {
  //     item: "Arsenal FC",
  //     id: "ARS",
  //   },

  //   {
  //     item: "Leicester City FC",
  //     id: "LEI",
  //   },
  // ];

  return (
    <View style={styles.container}>
      <Text>Numele grupului</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Numele Grupului"
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
          <SelectBox
            label="Alege vocalisti"
            options={options}
            selectedValues={selectedTeams}
            onMultiSelect={onMultiChange()}
            onTapClose={onMultiChange()}
            isMulti
          />
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
