import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from 'antd';
import { CaretLeftOutlined } from '@ant-design/icons';
import { usePaciente } from '../../../server';

export default () => {
  const { nombre, apellido } = useParams();
  const history = useHistory();
  const paciente = usePaciente({ nombre, apellido });
  console.log(paciente);

  return (
    <>
      <Button
        type="primary"
        icon={<CaretLeftOutlined />}
        onClick={() => { history.goBack(); }}
      >
        Go Back
      </Button>
      <h1>DETAILS</h1>
      {nombre}
      {apellido}
    </>
  );
};
