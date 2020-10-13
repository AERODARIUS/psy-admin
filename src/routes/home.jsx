import React from 'react';
import { Collapse, Typography } from 'antd';

const { Title } = Typography;
const { Panel } = Collapse;

const Home = () => (
  <div>
    <Title level={3}>Guía rápida</Title>
    <Collapse accordion>
      <Panel header="Expedientes" key="1">
        <p>
          En esta sección se listan los expedientes de los pacientes.
        </p>
      </Panel>
      <Panel header="Consultas" key="2">
        <p>
          Calendario para visualizar la disponibilidad,
          las citas agendadadas, canceladas y realizadas.
        </p>
      </Panel>
      <Panel header="Mapa" key="3">
        <p>
          Permite visualizar donde están los pacientes localizados
          geográficamente en relación a los centros de atención.
        </p>
      </Panel>
    </Collapse>
  </div>
);

export default Home;
