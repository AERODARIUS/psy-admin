import React from 'react';
import { useParams } from 'react-router-dom';
import { usePaciente } from '../../../server';

export default () => {
  const { nombre, apellido } = useParams();
  const paciente = usePaciente({ nombre, apellido });
  console.log(paciente);

  return (
    <>
      <h1>DETAILS</h1>
      {nombre}
      {apellido}
    </>
  );
};
