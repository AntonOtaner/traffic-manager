//Packages
import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faTimes } from "@fortawesome/free-solid-svg-icons";

//Components
import Text from "../UI/Text";
import Button from "../UI/Button";
import TextField from "../UI/Textfield";

//Styles
const Container = styled.div``;

const ButtonContainer = styled.div`
  position: absolute;
  right: ${({ isOpen }) => (isOpen ? "-100px" : "0px")};
  top: calc(
    ((100vh - 70%) / 2) - 5px
  ); // to have same top position as info panel

  border-radius: 15px 0 0 15px;
  border-width: 5px 0 5px 5px;
  border-style: solid;
  border-color: var(--border);
  transition: all 0.4s ease;
`;

const ControlsContainer = styled.div`
  position: absolute;
  top: calc(
    ((100vh - 70%) / 2) - 5px
  ); // to have same top position as info panel
  right: ${({ isOpen }) =>
    isOpen ? "25px" : "-500px"}; //if isOpen, then show the info panel
  z-index: 1;

  display: flex;
  flex-direction: column;
  align-self: center;

  background-color: var(--background);
  border-radius: 20px;
  border: 5px solid var(--border);
  width: 360px; //40px less to compensate for padding
  height: auto; //can be played around with later
  transition: all 0.4s ease;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Body = styled.div`
  padding: 0 20px 20px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
`;

const ToggleButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const PlaybackContainer = styled.div`
  margin-top: 5px;
`;

//Whole Playback system

//Information with project name at the bottom right of the screen
function Controls() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <ButtonContainer isOpen={isOpen}>
        <Button square margin="0 0 0 2.5px" onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faCog} />
        </Button>
      </ButtonContainer>
      <ControlsContainer isOpen={isOpen}>
        <Header>
          <Text type="title">Controls</Text>
          <Button square onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Header>
        <Body>
          <Block>
            <Text type="label" htmlFor="endpointURL">
              API endpoint
            </Text>
            <TextField id="endpointURL" placeholder="127.0.0.1" />
          </Block>
          <Block>
            <Text type="label" htmlFor="mapDisplay">
              Map Display
            </Text>
            <ToggleButtonContainer id="mapDisplay">
              <Button padding="5px 18px">Grid</Button>
              <Button padding="5px 18px">Static Map</Button>
              <Button padding="5px 18px">Dynamic Map</Button>
            </ToggleButtonContainer>
          </Block>
          <Block>
            <Text type="label" htmlFor="playback">
              Playback
            </Text>
            <PlaybackContainer id="playback">
              {/* Bar */}
              {/* Extra label */}
              {/* Control buttons */}
            </PlaybackContainer>
          </Block>
        </Body>
      </ControlsContainer>
    </Container>
  );
}

//React.memo since does not need to update update (no props)
export default React.memo(Controls);

//weird scroll
//weird positioning
