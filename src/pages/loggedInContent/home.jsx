import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Typography } from 'antd';
import { EXPEDIENTES, CONSULTAS, MAPA } from '../../routes';

const { Title } = Typography;
const { Panel } = Collapse;
const contentMap = {
  [EXPEDIENTES]: 'En esta sección se listan los expedientes de los pacientes.',
  [CONSULTAS]: 'Calendario para visualizar la disponibilidad, las citas agendadadas, canceladas y realizadas.',
  [MAPA]: 'Permite visualizar donde están los pacientes localizados geográficamente en relación a los centros de atención.',
};

const Home = ({ availablePages }) => (
  <div>
    <Title level={3}>Guía rápida</Title>
    <Collapse accordion>
      {availablePages.map((page) => (
        <Panel
          header={(
            <span style={{ textTransform: 'capitalize' }}>
              {page.substring(1)}
            </span>
          )}
          key={page}
        >
          <p>{contentMap[page]}</p>
        </Panel>
      ))}
    </Collapse>
  </div>
);
Home.propTypes = {
  availablePages: PropTypes.arrayOf(PropTypes.string),
};

Home.defaultProps = {
  availablePages: [],
};

export default Home;
