import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

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
      <Button onPress={showDatepicker} title="Alege Ziua (Data)" />
      <Button onPress={showTimepicker} title="Alege ora inceperi " />
      <Text>Programul din : {date.toLocaleString()}</Text>
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

const styles = StyleSheet.create({});
