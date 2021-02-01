import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { getIsFirebaseInit } from '../reducer/selectors';

export const usePacientes = () => {
  const isFirebaseInit = useSelector(getIsFirebaseInit);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    if (isFirebaseInit) {
      const db = firebase.firestore();

      db.collection('pacientes').get().then((querySnapshot) => {
        const pacientesList = [];

        querySnapshot.forEach((doc) => {
          pacientesList.push(doc.data());
        });

        setPacientes(pacientesList);
      });
    }
  });

  return pacientes;
};

export const usePacientesWithName = (nombre) => {
  const isFirebaseInit = useSelector(getIsFirebaseInit);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    if (isFirebaseInit) {
      const db = firebase.firestore();

      db.collection('pacientes')
        .where('nombre', '==', nombre)
        .get()
        .then((querySnapshot) => {
          const pacientesList = [];

          querySnapshot.forEach((doc) => {
            pacientesList.push(doc.data());
          });

          setPacientes(pacientesList);
        });
    }
  });

  return pacientes;
};

export const usePaciente = ({ nombre, apellido }) => {
  const isFirebaseInit = useSelector(getIsFirebaseInit);
  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    if (isFirebaseInit && !paciente) {
      const db = firebase.firestore();

      db.collection('pacientes')
        .where('apellido', '==', apellido)
        .where('nombre', '==', nombre)
        .get()
        .then((querySnapshot) => {
          let dbPatient = null;

          querySnapshot.forEach((doc) => {
            dbPatient = doc.data();
          });

          setPaciente(dbPatient);
        });
    }
  });

  return paciente || {};
};

const queryData = ({ database, path }, callback) => {
  database.ref(path).once('value').then((snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
};

export const usePermissions = (userId, callback) => {
  const database = firebase.database();
  const userPath = `/users/${userId}`;

  queryData({ database, path: userPath }, (profile) => {
    const profilePath = `/profiles/${profile}`;

    queryData({ database, path: profilePath }, callback);
  });
};
