//Packages
import React from "react";
import styled, { keyframes } from "styled-components";

//Styles
const StyledSVG = styled.svg`
  overflow: visible;

  position: absolute;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease;
`;

const StyledPath = styled.path`
  fill: transparent;
  stroke-dasharray: 10;
  stroke: ${({ isCenter, isConnected }) =>
    !isConnected
      ? "var(--danger)"
      : isCenter
      ? "var(--success)"
      : "var(--white)"};
  stroke-width: 2;
  transition: all 0.4s ease;

  //no animation as direction is uncertain
  //animation: ${({ diagonal, direction }) =>
    dash(diagonal, direction)} 5s linear
    infinite;
`;

//Seperate keyframes so it is independant for each component
function dash(diagonal, direction) {
  return keyframes`
    100% {
      stroke-dashoffset: ${getStrokeOffset(diagonal, direction)};
    }
  `;
}

//Depending on diagonal and direction, get offset
function getStrokeOffset(diagonal, direction) {
  //RULES:
  //If diagonal is type 1 and direction is type 1, then +
  //If diagonal is type 1 and direction is type 2, then -
  //If diagonal is type 2 and direction is type 1, then +
  //If diagonal is type 2 and direction is type 2, then -

  if (diagonal === 1 && direction === 1) {
    return "-100";
  } else if (diagonal === 1 && direction === 2) {
    return "100";
  } else if (diagonal === 2 && direction === 1) {
    return "100";
  } else if (diagonal === 2 && direction === 2) {
    return "-100";
  }
}

//Connection component between to objects on a map
function Connection({
  width,
  height,
  diagonal,
  direction,
  isCenter,
  isConnected,
  ...rest
}) {
  return (
    <StyledSVG
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      {...rest}
    >
      {diagonal === 1 ? (
        <StyledPath
          d={`M 0 0 Q ${width / 2 + 0.2 * height} ${
            height / 2 - 0.2 * width
          },${width} ${height}`}
          diagonal={diagonal}
          direction={direction}
          isCenter={isCenter}
          isConnected={isConnected}
        />
      ) : (
        <StyledPath
          d={`M 0 ${height} Q ${width / 2 - 0.2 * height} ${
            height / 2 - 0.2 * width
          }, ${width} 0`}
          diagonal={diagonal}
          direction={direction}
          isCenter={isCenter}
          isConnected={isConnected}
        />
      )}
    </StyledSVG>
  );
}

//Does not need to update everytime the map changes
export default React.memo(Connection);
