import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, Button, Space } from 'antd';
import { usePaciente } from '../../../server';
import PatientActions from '../../../components/patientActions';

const DropboxFolder = ({ link }) => {
  const [embed, setEmbed] = useState(null);
  const folderWrapper = useRef(null);
  const options = {
    link,
    file: {
      zoom: 'best',
    },
    folder: {
      view: 'list',
      headerSize: 'small',
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
  const [expanded, setExpanded] = React.useState(false);
  const { Title, Paragraph } = Typography;
  const { nombre, apellido } = useParams();
  const { archivos, comentarios } = usePaciente({ nombre, apellido });

  return (
    <>
      <Typography>
        <Space>
          <Title>Notas</Title>
          <PatientActions
            nombre={nombre}
            apellido={apellido}
            moreInfo={false}
          />
        </Space>
        <div key={expanded ? 'expanded' : 'not-expanded'}>
          <Paragraph
            ellipsis={{
              rows: 3,
              expandable: true,
              symbol: 'ver más',
              onExpand: () => { setExpanded(true); },
            }}
          >
            {comentarios}
            {expanded && <Button type="link" onClick={() => { setExpanded(false); }}>ver menos</Button>}
          </Paragraph>
        </div>
      </Typography>
      {archivos && <DropboxFolder link={archivos} />}
    </>
  );
};
