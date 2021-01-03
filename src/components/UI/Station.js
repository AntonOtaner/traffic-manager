//Package
import styled from "styled-components";

const size = 40;

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

function Station({ ...rest }) {
  return (
    <Container {...rest}>
      <Outer />
      <Inner />
    </Container>
  );
}

export default Station;
