import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Form, Input, DatePicker, InputNumber, Select, Button, notification,
} from 'antd';
import moment from 'moment';
import { TAGS } from '../../../config';
import { getIsFirebaseInit } from '../../../reducer/selectors';
import { savePatient } from '../../../server/database';
import { EXPEDIENTES } from '../../../routes';

export default () => {
  const { TextArea } = Input;
  const { Option } = Select;
  const history = useHistory();
  const isFirebaseInit = useSelector(getIsFirebaseInit);

  const onFinish = (formData) => {
    const {
      nombre, apellido, nacimiento, fechaIngreso,
    } = formData;

    if (isFirebaseInit) {
      savePatient({
        ...formData,
        nombre: nombre?.toLowerCase(),
        apellido: apellido?.toLowerCase(),
        nacimiento: nacimiento?.toDate(),
        fechaIngreso: fechaIngreso?.toDate(),
      },
      () => {
        notification.success({
          message: 'Datos guardados exitosamente',
        });
        history.push(EXPEDIENTES);
      },
      (error) => {
        notification.error({
          message: 'Ocurrió un error desconocido, por favor contacte al administrador',
        });
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    notification.error({
      message: 'Hay algunos errores en el formulario.',
    });
  };

  return (
    <Form
      layout="vertical"
      size="large"
      initialValues={{
        nombre: '',
        apellido: '',
        nacimiento: moment(),
        domicilio: '',
        costo: 1000,
        tags: [],
        fechaIngreso: moment(),
        comentarios: '',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Nombre"
        name="nombre"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <Input placeholder="Ingresar nombre" />
      </Form.Item>
      <Form.Item
        label="Apellido"
        name="apellido"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <Input placeholder="Ingresar apellido" />
      </Form.Item>
      <Form.Item
        label="Fecha de nacimiento"
        name="nacimiento"
      >
        <DatePicker placeholder="Elegir fecha" />
      </Form.Item>
      <Form.Item
        label="Domicilio"
        name="domicilio"
      >
        <Input placeholder="Ingresar la dirección" />
      </Form.Item>
      <Form.Item
        label="Costo consulta"
        name="costo"
        rules={[{ required: true, message: 'Campo requerido' }]}
      >
        <InputNumber
          min={0}
          max={99999}
          step={50}
        />
      </Form.Item>
      <Form.Item
        label="Fecha de ingreso"
        name="fechaIngreso"
      >
        <DatePicker placeholder="Elegir fecha" />
      </Form.Item>
      <Form.Item
        label="Tags"
        name="tags"
      >
        <Select
          mode="multiple"
          allowClear
          placeholder="Elegit tags"
        >
          {TAGS.map((tag) => (
            <Option key={tag}>{tag}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Comentarios"
        name="comentarios"
      >
        <TextArea rows={4} placeholder="Ingresar comentario" />
      </Form.Item>
      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};
