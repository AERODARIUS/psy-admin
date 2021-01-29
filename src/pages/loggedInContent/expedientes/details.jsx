import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { usePaciente } from '../../../server';

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

  return (<div ref={folderWrapper} style={{ height: '400px' }} />);
};

DropboxFolder.propTypes = {
  link: PropTypes.string,
};

DropboxFolder.defaultProps = {
  link: '',
};

export default () => {
  const { nombre, apellido } = useParams();
  const { archivos, comentarios } = usePaciente({ nombre, apellido });

  return (
    <>
      <h4>Notas</h4>
      <p>{comentarios}</p>
      {archivos && <DropboxFolder link={archivos} />}
    </>
  );
};
