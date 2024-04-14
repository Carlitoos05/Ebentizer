import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";

const DatePicker = ({ getDate }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };
  useEffect(() => {
    if (date) {
      getDate(date);
    }
  }, [date]);
  // console.log(date);

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 20,
          textAlign: "center",
          marginTop: 10,
          fontWeight: "bold",
          // textDecorationLine: "underline",
        }}
      >
        CONFIGURARE PROGRAM DIN : {date.toLocaleString()}
      </Text>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={showDatepicker}>
            <LinearGradient
              colors={["#004d40", "#009688"]}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Alege data</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={showTimepicker}>
            <LinearGradient
              colors={["#004d40", "#009688"]}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Alege ora</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
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
