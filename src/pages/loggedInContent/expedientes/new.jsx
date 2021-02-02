import React from 'react';
import {
  Form, Input, DatePicker, InputNumber, Select, Button,
} from 'antd';
import { TAGS } from '../../../config';

export default () => {
  const { TextArea } = Input;
  const { Option } = Select;

  const onFinish = (formData) => {
    console.log(formData);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form layout="vertical" size="large" onFinish={onFinish} onFinishFailed={onFinishFailed}>
      <Form.Item label="Nombre" name="nombre" required>
        <Input placeholder="Ingresar nombre" />
      </Form.Item>
      <Form.Item label="Apellido" name="apellido" required>
        <Input placeholder="Ingresar apellido" />
      </Form.Item>
      <Form.Item label="Fecha de nacimiento" name="nacimiento" required>
        <DatePicker placeholder="Elegir fecha" />
      </Form.Item>
      <Form.Item label="Domicilio" name="domicilio" required>
        <Input placeholder="Ingresar la dirección" />
      </Form.Item>
      <Form.Item label="Costo consulta" name="costo" required>
        <InputNumber
          min={0}
          max={99999}
          step={50}
          defaultValue={1000}
        />
      </Form.Item>
      <Form.Item label="Tags" name="tags">
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
      <Form.Item label="Comentarios" name="comentarios">
        <TextArea rows={4} placeholder="Ingresar comentario" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
