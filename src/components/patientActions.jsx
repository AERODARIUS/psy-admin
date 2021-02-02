import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Dropdown } from 'antd';
import { EXPEDIENTES } from '../routes';

const PatientActions = ({
  nombre, apellido, moreInfo, edit, uploadFiles,
}) => {
  const history = useHistory();

  return (
    <Dropdown.Button
      overlay={(
        <Menu>
          {moreInfo && (
            <Menu.Item
              onClick={() => {
                history.push(`${EXPEDIENTES}/${nombre}/${apellido}`);
              }}
            >
              Ver más información
            </Menu.Item>
          )}
          {edit && <Menu.Item>Editar información</Menu.Item>}
          {uploadFiles && <Menu.Item>Subir archivos</Menu.Item>}
        </Menu>
      )}
    />
  );
};

PatientActions.propTypes = {
  nombre: PropTypes.string.isRequired,
  apellido: PropTypes.string.isRequired,
  moreInfo: PropTypes.bool,
  edit: PropTypes.bool,
  uploadFiles: PropTypes.bool,
};

PatientActions.defaultProps = {
  moreInfo: true,
  edit: true,
  uploadFiles: true,
};

export default PatientActions;
