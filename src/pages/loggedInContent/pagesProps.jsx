import React from 'react';
import {
  CalendarOutlined,
  GlobalOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import Expedientes from './expedientes';
import Consultas from './consultas';
import Mapa from './mapa';

const propsByPage = {
  '/expedientes': {
    title: 'Expedientes',
    description: 'En esta sección se listan los expedientes de los pacientes.',
    icon: <TeamOutlined />,
    component: Expedientes,
  },
  '/consultas': {
    title: 'Consultas',
    description: 'Calendario para visualizar la disponibilidad, las citas agendadadas, canceladas y realizadas.',
    icon: <CalendarOutlined />,
    component: Consultas,
  },
  '/mapa': {
    title: 'Mapa',
    description: 'Permite visualizar donde están los pacientes localizados geográficamente en relación a los centros de atención.',
    icon: <GlobalOutlined />,
    component: Mapa,
  },
};

export default {
  // key should match the path, e.g.: "/expedientes"
  pages: Object.keys(propsByPage),
  propsByPage,
};
