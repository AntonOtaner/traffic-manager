//Packages
import React from "react";
import styled from "styled-components";

//Images
import ShipWhite from "../../assets/images/ship-white.svg";
import ShipRed from "../../assets/images/ship-red.svg";

//Styles
const StyledShip = styled.img`
  position: absolute;
  transform: translate(-50%, -50%)
    ${({ direction }) => direction >= 180 && "scaleX(-1)"}; //Point left or right depending on direction
  transition: all 0.4s ease;

  width: 40px;
  opacity: ${({ isSelected }) => (isSelected ? "100%" : "70%")};
  cursor: pointer;
  z-index: 1;
`;

//Ship component on map
function Ship({ isConnected, ...rest }) {
  return (
    <StyledShip alt="Ship" src={isConnected ? ShipWhite : ShipRed} {...rest} />
  );
}

//Does not need tp update every time the map changes
export default React.memo(Ship);
