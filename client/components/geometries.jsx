import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const FileVisual = styled(FileSelector)`
  padding: 0em;
`;


class Geometries extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>
        <TitleRow>
          <FontAwesomeIcon icon={faArrowAltCircleUp} />
          <Title>Uploader</Title>
          <FontAwesomeIcon icon={faArrowAltCircleUp} />
        </TitleRow>
        <Lede>
          Upload a file to see a Three.js rendered output based on file types within the MySQL database
        </Lede>
      </div>
    )
  }
}

export default Geometries;
