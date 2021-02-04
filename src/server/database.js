import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { getFirestoreDB } from '../reducer/selectors';

export const usePacientes = () => {
  const db = useSelector(getFirestoreDB);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    if (db) {
      db.collection('pacientes').get().then((querySnapshot) => {
        const pacientesList = [];

        querySnapshot.forEach((doc) => {
          pacientesList.push(doc.data());
        });

        setPacientes(pacientesList);
      });
    }
  }, [db]);

  return pacientes;
};

export const usePacientesWithName = (nombre) => {
  const db = useSelector(getFirestoreDB);
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    if (db) {
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
  const db = useSelector(getFirestoreDB);
  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    if (db && !paciente) {
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

export const savePatient = (db, data, successCallback, errorCallback) => {
  const { nombre, apellido } = data;

  db.collection('pacientes').doc(`${nombre}-${apellido}`).set(data)
    .then(successCallback)
    .catch(errorCallback);
};
