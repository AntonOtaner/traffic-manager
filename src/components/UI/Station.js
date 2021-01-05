//Packages
import React from "react";
import styled from "styled-components";

//Options
const size = 40;

//Styles
const Container = styled.div`
  width: ${size}px;
  height: ${size}px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;

  position: absolute;
  transform: translate(-50%, -50%);
`;

const Outer = styled.div`
  position: absolute;
  width: ${size}px;
  height: ${size}px;
  border-radius: 50%;
  background-color: var(--white);
  opacity: 50%;
`;

const Inner = styled.div`
  position: absolute;
  width: ${size / 2}px;
  height: ${size / 2}px;
  border-radius: 50%;
  background-color: var(--white);
  opacity: 100%;
`;

//Base Station component on map
function Station({ ...rest }) {
  //{...rest} is everywhere because data from clicked item will be processed by openInfoContainer function
  return (
    <Container {...rest}>
      <Outer {...rest} />
      <Inner {...rest} />
    </Container>
  );
}

//Does not need to update everytime the map changes
export default React.memo(Station);
