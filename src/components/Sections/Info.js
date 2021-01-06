//Packages
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

//Components
import Text from "../UI/Text";
import Button from "../UI/Button";

//Styles
const Container = styled.div`
  position: absolute;
  left: ${({ isOpen }) =>
    isOpen ? "25px" : "-500px"}; //if isOpen, then show the info panel

  display: flex;
  flex-direction: column;
  align-self: center;

  background-color: var(--background);
  border-radius: 20px;
  border: 5px solid var(--border);
  width: 400px; //40px less to compensate for padding
  height: 70%; //can be played around with later
  transition: all 0.4s ease;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const Body = styled.div`
  overflow-y: scroll;
  padding: 0 20px;
`;

const Block = styled.div`
  padding: 10px 0;
`;

const StyledHr = styled.hr`
  border-color: var(--text);
`;

//Information panel on different ships and base station
function Info({ open, selectedData, close }) {
  //open: boolen that is true if panel is open
  //selectedData: object of data of selected data, empty object when nothing selected
  //close: function to run when panel is closed

  //capitalized type (ship or land-tms)
  const styledType =
    selectedData.type?.charAt(0).toUpperCase() + selectedData.type?.slice(1);

  return (
    <Container isOpen={open}>
      <Header>
        <Text type="title">{styledType} Information</Text>
        <Button empty onClick={close}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </Header>
      <Body>
        <Block>
          <Text type="subTitle" align="center" margin="0 0 10px 0">
            General
          </Text>
          <Text type="bold" margin="10px 0 5px">
            {styledType} ID
          </Text>
          <Text type="body" margin="5px 0">
            {selectedData.id}{" "}
            {selectedData.isCenter && `(Own ${styledType.toString()})`}
          </Text>
        </Block>
        <StyledHr />
        {selectedData.type === "ship" && (
          <>
            <Block>
              <Text type="subTitle" align="center" margin="0 0 10px 0">
                Movement
              </Text>
              <Text type="bold" margin="10px 0 5px">
                Speed
              </Text>
              <Text type="body" margin="5px 0">
                {selectedData.speed} knots
              </Text>
              <Text type="bold" margin="10px 0 5px">
                Direction
              </Text>
              <Text type="body" margin="5px 0">
                {selectedData.direction}°
              </Text>
            </Block>
            <StyledHr />
          </>
        )}
        <Block>
          <Text type="subTitle" align="center" margin="0 0 10px 0">
            Position
          </Text>
          <Text type="bold" margin="10px 0 5px">
            Latitude
          </Text>
          <Text type="body" margin="5px 0">
            {selectedData.position?.lat.toFixed(5)}
          </Text>
          <Text type="bold" margin="10px 0 5px">
            Longitude
          </Text>
          <Text type="body" margin="5px 0">
            {selectedData.position?.lng.toFixed(5)}
          </Text>
        </Block>
        <StyledHr />
        <Block>
          <Text type="subTitle" align="center" margin="0 0 10px 0">
            Connections
          </Text>
          <Text type="bold" margin="10px 0 5px">
            Is Connected
          </Text>
          <Text type="body" margin="5px 0">
            {selectedData.connections?.receiving.length +
            selectedData.connections?.providing.length
              ? "Yes"
              : "No"}
          </Text>
          <Text type="bold" margin="10px 0 5px">
            Receiving
          </Text>
          <Text type="body" margin="5px 0">
            {selectedData.connections?.receiving.length
              ? selectedData.connections?.receiving
                  .toString()
                  .replace(/,/g, ", ")
              : "None"}
          </Text>
          <Text type="bold" margin="10px 0 5px">
            Providing
          </Text>
          <Text type="body" margin="5px 0">
            {selectedData.connections?.providing.length
              ? selectedData.connections?.providing
                  .toString()
                  .replace(/,/g, ", ")
              : "None"}
          </Text>
          <Text type="bold" margin="10px 0 5px">
            Is Center
          </Text>
          <Text type="body" margin="5px 0">
            {selectedData.isCenter ? "Yes" : "No"}
          </Text>
        </Block>
      </Body>
    </Container>
  );
}

//React.memo to optimize rerenders since only updates when those 3 props update
export default React.memo(Info);
