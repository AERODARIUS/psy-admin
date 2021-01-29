import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import 'firebase/firestore';
import {
  Button, Card, Space, Input,
} from 'antd';
import { SearchOutlined, UserAddOutlined } from '@ant-design/icons';
import { EXPEDIENTES } from '../../../routes';
import { usePacientes, usePacientesWithName } from '../../../server';

export default () => {
  const { Search } = Input;
  const history = useHistory();
  const { nombre: queryName } = useParams();
  const pacientes = queryName ? usePacientesWithName(queryName) : usePacientes();
  const onSearch = (value) => console.log(value);

  return (
    <>
      <h2>EXPEDIENTES</h2>
      <Space direction="vertical">
        <Space>
          <Search
            placeholder="Ingresa el nombre del paciente"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
          <Button type="primary" size="large">
            <UserAddOutlined />
          </Button>
        </Space>


        {pacientes.map(({
          nombre, apellido, nacimiento, tags,
        }) => (
          <Card
            title={`${nombre} ${apellido}`}
            key={`${nombre} ${apellido}`}
            extra={(
              <Button
                type="primary"
                shape="circle"
                icon={<SearchOutlined />}
                onClick={() => {
                  history.push(`${EXPEDIENTES}/${nombre}/${apellido}`);
                }}
              />
            )}
            style={{ width: 300 }}
          >
            <ul>
              <li>{`Nacimiento: ${nacimiento}`}</li>
              <li>{tags}</li>
            </ul>
          </Card>
        ))}
      </Space>
    </>
  );
};
