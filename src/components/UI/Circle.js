//Packages
import React from "react";
import styled from "styled-components";

//Styles
const StyledCircle = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease;

  width: ${({ width }) => width && width};
  height: ${({ height }) => height && height};
  background-color: ${({ isConnected, isCenter }) =>
    isCenter
      ? "var(--success)"
      : isConnected
      ? "var(--white)"
      : "var(--danger)"};

  opacity: ${({ isSelected }) => (isSelected ? "20%" : "7.5%")};
  border-radius: 50%;
`;

//Circle component keeping accurate size
function Circle({ ...rest }) {
  return <StyledCircle {...rest} />;
}

//When map updates, do not need to necessarly update the component
export default React.memo(Circle);
