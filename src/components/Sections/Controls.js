//Packages
import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faTimes,
  faStepForward,
  faStepBackward,
  faFastForward,
  faFastBackward,
} from "@fortawesome/free-solid-svg-icons";

//Components
import Text from "../UI/Text";
import Button from "../UI/Button";
import TextField from "../UI/Textfield";

//Styles
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

const TextFieldContainer = styled.div`
  display: flex;
  margin-top: 5px;
`;

const ToggleButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;

const PlaybackContainer = styled.div`
  margin-top: 5px;
`;

const Slider = styled.input`
  appearance: none;
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background: var(--border);
  outline: none;

  &::-webkit-slider-thumb {
    appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: var(--text);
    cursor: pointer;
  }
`;

const PlaybackButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

//Controls for the map
const Controls = ({
  endpointURL,
  setEndpointURL,
  mapType,
  setMapType,
  frameAmount,
  frameTimestamp,
  currentFrame,
  setCurrentFrame,
}) => {
  const [isOpen, setIsOpen] = useState(false); //true when panel is opened
  const [tempEndpointURL, setTempEndpointURL] = useState(endpointURL); //temporary endpointURL so that main endpointURL does not change before ready

  return (
    <>
      {/* Button to open the control panel */}
      <ButtonContainer isOpen={isOpen}>
        <Button square margin="0 0 0 2.5px" onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon icon={faCog} />
        </Button>
      </ButtonContainer>
      {/* Control Panel */}
      <ControlsContainer isOpen={isOpen}>
        <Header>
          <Text type="title">Controls</Text>
          <Button square onClick={() => setIsOpen(false)}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Header>
        <Body>
          {/* EndpoinURL control */}
          <Block>
            <Text type="label" htmlFor="endpointURL">
              API endpoint
            </Text>
            <TextFieldContainer>
              <TextField
                id="endpointURL"
                placeholder="127.0.0.1"
                value={tempEndpointURL}
                style={{ flex: 1 }}
                onChange={(e) => setTempEndpointURL(e.target.value)}
              />
              <Button
                fill
                margin="0 0 0 8px"
                onClick={() => {
                  setEndpointURL(tempEndpointURL);
                  window.location.reload();
                }}
              >
                Change URL
              </Button>
            </TextFieldContainer>
          </Block>
          {/* Map display type control */}
          <Block>
            <Text type="label" htmlFor="mapDisplay">
              Map Display
            </Text>
            <ToggleButtonContainer id="mapDisplay">
              <Button
                fill={parseInt(mapType) === 1}
                padding="5px 18px"
                onClick={() => setMapType(1)}
              >
                Grid
              </Button>
              <Button
                fill={parseInt(mapType) === 2}
                padding="5px 18px"
                disabled
              >
                Static Map
              </Button>
              <Button
                fill={parseInt(mapType) === 3}
                padding="5px 18px"
                onClick={() => setMapType(3)}
              >
                Dynamic Map
              </Button>
            </ToggleButtonContainer>
          </Block>
          {/* Playback control */}
          <Block>
            <Text type="label" htmlFor="playback">
              Playback
            </Text>
            <PlaybackContainer id="playback">
              <Slider
                type="range"
                min={frameAmount === 1 ? 0 : 1}
                max={frameAmount}
                value={frameAmount - currentFrame}
                onChange={(e) => {
                  if (frameAmount !== 1) {
                    setCurrentFrame(frameAmount - e.target.value);
                  }
                }}
              />
              <Text type="other" margin="5px 0 10px">
                Current time: {new Date(frameTimestamp).toLocaleString()}
              </Text>
              <PlaybackButtonContainer>
                <Button
                  size="33px"
                  margin="0 5px"
                  square
                  fill
                  onClick={() => setCurrentFrame(frameAmount - 1)}
                >
                  <FontAwesomeIcon icon={faFastBackward} />
                </Button>
                <Button
                  size="33px"
                  margin="0 5px"
                  square
                  fill
                  onClick={() => {
                    if (currentFrame + 1 <= frameAmount - 1) {
                      setCurrentFrame(currentFrame + 1);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faStepBackward} />
                </Button>
                <Button
                  size="33px"
                  margin="0 5px"
                  square
                  fill
                  onClick={() => {
                    if (currentFrame - 1 >= 0) {
                      setCurrentFrame(currentFrame - 1);
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faStepForward} />
                </Button>
                <Button
                  size="33px"
                  margin="0 5px"
                  square
                  fill
                  onClick={() => setCurrentFrame(0)}
                >
                  <FontAwesomeIcon icon={faFastForward} />
                </Button>
              </PlaybackButtonContainer>
            </PlaybackContainer>
          </Block>
        </Body>
      </ControlsContainer>
    </>
  );
};

//React.memo since does not need to update whenever Main.js changes
export default React.memo(Controls);
