//Package
import styled from "styled-components";

const StyledCircle = styled.img`
  position: absolute;
  transform: translate(-50%, -50%);
  transition: all 0.4s ease;

  width: ${({ width }) => width && width};
  height: ${({ height }) => height && height};
  background-color: ${({ connections }) =>
    connections.receiving.length + connections.providing.length
      ? "var(--white)"
      : "var(--danger)"};
  opacity: ${({ isSelected }) => (isSelected ? "20%" : "7.5%")};
  border-radius: 50%;
`;

function Circle({ ...rest }) {
  return <StyledCircle {...rest} />;
}

export default Circle;
