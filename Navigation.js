import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cantari from "./screens/Cantari";
import Administrar from "./screens/Administrar";
import Dashboard from "./screens/Dashboard";
import User from "./screens/User";

import Programe from "./screens/Programe";
import AddProgram from "./screens/AddProgram";
import Program from "./screens/Program";
import MyForm from "./Components/MyForm";
import RegisterScreen from "./Components/Login/screens/RegisterScreen";
import Grupuri from "./screens/Grupuri";
import AddGrup from "./Components/AddGrup";
import Grup from "./Components/Grup";
import LoginDashboard from "./Components/Login/screens/LoginDashboard";

import StartScreen from "./Components/Login/screens/StartScreen";
import LoginScreen from "./Components/Login/screens/LoginScreen";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="LoginDashboard" component={LoginDashboard} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Programe" component={Programe} />
      <Stack.Screen name="AddProgram" component={AddProgram} />
      <Stack.Screen name="Program" component={Program} />
      <Stack.Screen name="Cantari" component={Cantari} />
      <Stack.Screen name="Grupuri" component={Grupuri} />
      <Stack.Screen name="Grup" component={Grup} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="AddGrup" component={AddGrup} />
      <Stack.Screen name="Administrar" component={Administrar} />
    </Stack.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
