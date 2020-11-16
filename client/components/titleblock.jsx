import React from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

const TitleRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  text-align: center;
  font-size: 34px;
  font-weight: 600;
  padding: 1em;
`;
const Lede = styled.div`
  text-align: center;
  font-size: 20px;
  font-style: italic;
  padding: 1em;
`;


class TitleBlock extends React.Component {
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

export default TitleBlock;
