import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { EXPEDIENTES } from '../../../routes';
import List from './list';
import Details from './details';

const Expedientes = () => (
  <Switch>
    <Route exact path={EXPEDIENTES} component={List} />
    <Route exact path={`${EXPEDIENTES}/:nombre/:apellido`}>
      <Details />
    </Route>
  </Switch>
);

export default Expedientes;
