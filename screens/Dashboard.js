import React, { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Image,
  ImageBackground,
  Switch,
  FlatList,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, signOut } from "firebase/auth";
import { database } from "../firebase";
import {
  onValue,
  update,
  set,
  child,
  ref,
  orderByChild,
  equalTo,
  query,
  startAt,
  endAt,
} from "firebase/database";
import { SimpleLineIcons } from "@expo/vector-icons";
import { StateContext } from "../context";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  const [users, setUsers, grupuri, setGrupuri, programe] =
    useContext(StateContext);
  const navigation = useNavigation();
  const auth = getAuth();
  const userId = auth.currentUser.uid;
  const userRef = ref(database, `Usuarios/${userId}`);

  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState("");
  const [programedInPrograms, setProgramedInPrograms] = useState();
  const [disponibil, setDisponibil] = useState(true);

  const image = require("../assets/background.jpg");

  const toggleDisponibil = () =>
    setDisponibil((previousState) => !previousState);
  const newData = { disponibil: disponibil };
  useEffect(() => {
    update(userRef, newData)
      .then(() => {})
      .catch((err) => console.error(err));
  }, [disponibil]);

  useEffect(() => {
    // Función para verificar si un ID está presente en un arreglo y retornar la propiedad
    const contieneIdYPropiedad = (propiedad, subarreglo) => {
      if (
        Array.isArray(subarreglo) &&
        subarreglo.some((objeto) => objeto.id === userId)
      ) {
        return propiedad;
      }
    };

    // Filtrar programe y guardar la información de la propiedad
    const resultadosFiltrados = programe?.reduce((resultados, objeto) => {
      for (const [propiedad, subarreglo] of Object.entries(objeto)) {
        const propiedadEncontrada = contieneIdYPropiedad(propiedad, subarreglo);
        if (propiedadEncontrada) {
          resultados.push({ ...objeto, propiedad: propiedadEncontrada });
        }
      }
      return resultados;
    }, []);
    setModalVisible(true);
    setProgramedInPrograms(resultadosFiltrados);
  }, []);

  //Obtener los datos del usuario Autentificado//

  useEffect(() => {
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setUser(data);
    });
  }, []);

  const onLogOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("LoginScreen");
        console.log("sign-out");
      })
      .catch((error) => {
        // An error happened.
      });
  };
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

  const confirm = (program, index) => {
    const referencia = ref(
      database,
      `Programe/${program.id}/${program.propiedad}`
    );
    const updatedList = programedInPrograms[index][program.propiedad].map(
      (item) => {
        return {
          ...item,
          particip: item.id === userId ? true : item.particip,
        };
      }
    );
    const newList = program[program.propiedad].filter((item) => {
      item.id === userId && item.particip === false;
    });
    console.log(newList);

    set(referencia, updatedList)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const closeProgram = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <LinearGradient
      style={styles.background}
      colors={["black", "#690000", "black"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text>Hello {user?.name}</Text>
        <SimpleLineIcons
          name="logout"
          size={24}
          color="white"
          onPress={onLogOut}
        />
        <View style={styles.disponibil}>
          <Text style={[styles.disponibil]}>Disponibil: </Text>
          <Switch
            trackColor={{ false: "#767577", true: "white" }}
            thumbColor={disponibil ? "#690000" : "#690000"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDisponibil}
            value={disponibil}
          />
        </View>
        <Text style={styles.title}>¡BINE AI VENIT!</Text>
        {programedInPrograms?.length > 0 && (
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
                    <FlatList
                      data={programedInPrograms}
                      renderItem={({ item, index }) => (
                        <View style={styles.item}>
                          <Text>{JSON.stringify(item.data)}</Text>
                          <Text>Slujba: {JSON.stringify(item.propiedad)}</Text>
                          {/* {item.particip} */}
                          <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                              style={[styles.button, styles.buttonClose]}
                              onPress={() => confirm(item, index)}
                            >
                              <Text style={styles.textStyle}> PARTICIP</Text>
                            </TouchableOpacity>
                            <Pressable
                              style={[styles.button, styles.buttonClose]}
                              onPress={closeProgram}
                            >
                              <Text style={styles.textStyle}> NU PARTICIP</Text>
                            </Pressable>
                          </View>
                        </View>
                      )}
                      keyExtractor={(item) => item.propiedad}
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
                          Esti programat in :
                        </Text>
                      )}
                    ></FlatList>
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
        <View style={styles.butonsContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Grupuri")}>
            <Image 
              source={require('../assets/grupuri.png')} 
              style={styles.imageButton} 
            />
            <LinearGradient
              colors={["transparent", "transparent"]}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Grupuri</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Programari")}>
          <Image 
              source={require('../assets/programari.png')} 
              style={styles.imageButton} 
            />
            <LinearGradient
              colors={["transparent", "transparent"]}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Programări</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Cantari")}>
          <Image 
              source={require('../assets/cantari.png')} 
              style={styles.imageButton} 
            />
            <LinearGradient
              colors={["transparent", "transparent"]}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Cântări</Text>
            </LinearGradient>
          </TouchableOpacity>
          {user?.role === 3 && (
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("Programe")}>
              <Image 
              source={require('../assets/programari.png')} 
              style={styles.imageButton} 
            />
                <LinearGradient
                  colors={["transparent", "transparent"]}
                  style={styles.appButtonContainer}
                >
                  <Text style={styles.appButtonText}>Programe</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Administrar")}
              >
               
                  <Text style={styles.buttonSlujitori}>Slujitori</Text>
                
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.rectangulo}></View>
      </ImageBackground>
    </LinearGradient>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
    top: 40,
  },
  image: {
    width: "100%",
    flex: 1,
    // width: 500,
    // height: 500,

  },
  disponibil: {
    color: 'black',
    fontWeight: "bold",
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
    alignSelf: "left",
  },

  butonsContainer: {
    top: 590,
    backgroundColor: "black",
    //height: "10%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  appButtonContainer: {
     paddingHorizontal: 26,     
     top: 30,
   },
  appButtonText: {
    fontSize: 12,
    color: "#fff",
    //fontWeight: "bold",
  },
  buttonSlujitori: {
    top: -100,
    fontSize: 12,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    left: 5,
    textTransform: "uppercase",
  },
  item: {
    backgroundColor: "#dcdcdc",
    padding: 20,
    marginTop: 5,
    fontSize: 20,
  },
  container: {
    flex: 1,
    paddingTop: 22,
    width: "80%",
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
    backgroundColor: "#c9b7a9",
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
    backgroundColor: "#c9b7a9",
    marginHorizontal: 5,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  imageButton: {
    width: 32,
    height: 32,
    top: 25,
    alignSelf: "center",
  },
});
