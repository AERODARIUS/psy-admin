import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  Button, Card, Space, Input, Tag, Divider, Descriptions,
} from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { EXPEDIENTES } from '../../../routes';
import { usePacientes, usePacientesWithName } from '../../../server';
import PatientActions from '../../../components/patientActions';
import './list.scss';

export default () => {
  const { Search } = Input;
  const history = useHistory();
  const { nombre: queryName } = useParams();
  const pacientes = queryName ? usePacientesWithName(queryName) : usePacientes();
  const onSearch = (value) => console.log(value);

  return (
    <>
      <h2>EXPEDIENTES</h2>
      <Space direction="vertical" style={{ width: '100%'}}>
        <Space>
          <Search
            placeholder="Ingresa el nombre del paciente"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
          <Button
            type="primary"
            size="large"
            onClick={
              () => {
                history.push(`${EXPEDIENTES}/new`);
              }
            }
          >
            <UserAddOutlined />
          </Button>
        </Space>

        <div className="grid">
          {pacientes.map(({
            nombre, apellido, nacimiento, tags, costo, domicilio, fechaIngreso,
          }) => (
            <Card
              title={(
                <h1 style={{ textTransform: 'capitalize' }}>
                  {`${nombre} ${apellido}`}
                </h1>
              )}
              key={`${nombre} ${apellido}`}
              extra={<PatientActions nombre={nombre} apellido={apellido} />}
            >
              <Descriptions
                bordered
                size="small"
                column={1}
              >
                <Descriptions.Item label="Costo consulta">
                  {costo}
                </Descriptions.Item>
                <Descriptions.Item label="Nacimiento">
                  {Intl.DateTimeFormat('es-UY', { dateStyle: 'full' }).format(nacimiento?.toDate())}
                </Descriptions.Item>
                <Descriptions.Item label="Fecha de ingreso">
                  {Intl.DateTimeFormat('es-UY', { dateStyle: 'full' }).format(fechaIngreso?.toDate())}
                </Descriptions.Item>
                <Descriptions.Item label="Domicilio">
                  {domicilio}
                </Descriptions.Item>
              </Descriptions>
              <Divider />
              {tags.map((tag) => (
                <Tag color="blue" key={tag}>{tag}</Tag>
              ))}
            </Card>
          ))}
        </div>
      </Space>
    </>
  );
};
