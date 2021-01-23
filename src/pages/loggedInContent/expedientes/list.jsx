import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'firebase/firestore';
import { Button, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { EXPEDIENTES } from '../../../routes';
import { usePacientes, usePacientesWithName } from '../../../server';

const DropboxFolder = ({ link }) => {
  const [embed, setEmbed] = useState(null);
  const folderWrapper = useRef(null);
  const options = {
    link,
    file: {
      zoom: 'best',
    },
    folder: {
      view: 'grid',
      headerSize: 'normal',
    },
  };

  useEffect(() => {
    if (folderWrapper && global.Dropbox && !embed) {
      const dropboxEmbed = global.Dropbox.embed(options, folderWrapper.current);
      setEmbed(dropboxEmbed);
    }
  }, [embed, options]);

  return (<div ref={folderWrapper} />);
};

DropboxFolder.propTypes = {
  link: PropTypes.string,
};

DropboxFolder.defaultProps = {
  link: '',
};

export default () => {
  const history = useHistory();
  const { nombre: queryName } = useParams();
  const pacientes = queryName ? usePacientesWithName(queryName) : usePacientes();

  return (
    <>
      <h2>EXPEDIENTES</h2>
      {pacientes.map(({
        nombre, apellido, nacimiento, comentarios, archivos,
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
            <li>{`Comentarios: ${comentarios}`}</li>
          </ul>
          <h4>Archivos</h4>
          <DropboxFolder link={archivos} />
        </Card>
      ))}
    </>
  );
};
