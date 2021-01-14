import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Typography } from 'antd';
import pagesProps from './pagesProps';

const { Title } = Typography;
const { Panel } = Collapse;
const { propsByPage } = pagesProps;

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
          <p>{propsByPage[page].description}</p>
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
