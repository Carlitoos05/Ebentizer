import { onValue, ref } from "firebase/database";
import React, { useState, createContext, useEffect } from "react";
import { database } from "./firebase";

export const StateContext = createContext();

export const StateProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [grupuri, setGrupuri] = useState();

  const getGrupuri = () => {
    const grupuriRef = ref(database, "Grupuri/");
    onValue(grupuriRef, (snapshot) => {
      const tmpArray = [];
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        tmpArray.push({ id: childKey, ...childData });
      });
      const grupuri = tmpArray;

      setGrupuri(grupuri);
    });
  };

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
    getGrupuri();
  }, []);

  return (
    <StateContext.Provider value={[users, setUsers, grupuri, setGrupuri]}>
      {props.children}
    </StateContext.Provider>
  );
};
