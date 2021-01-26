//Packages
import styled from "styled-components";

//Styles
const NormalButton = styled.button`
  font-size: 0.9rem;
  padding: ${({ padding }) => padding && padding};
  margin: ${({ margin }) => margin && margin};
  border-radius: 5px;
  border: 2px solid var(--border);
  background-color: ${({ fill }) =>
    fill ? "var(--border)" : "var(--background)"};
  color: var(--text);
  cursor: pointer;

  &:disabled {
    cursor: default;
    filter: brightness(65%) !important;
  }

  &:focus:enabled {
    outline: none;
  }

  &:hover {
    filter: brightness(85%);
  }

  &:active {
    filter: brightness(65%);
  }
`;

const SquareButton = styled(NormalButton)`
  font-size: ${({ size }) => (size ? `${(size * 1.4) / 40}rem` : "1.4rem")};
  width: ${({ size }) => (size ? size : "40px")};
  height: ${({ size }) => (size ? size : "40px")};
  line-height: ${({ size }) => (size ? size : "40px")};
  border: none;
  background-color: ${({ fill }) => (fill ? "var(--border)" : "transparent")};
`;

//Button Component (currently for zoom and center buttons)
function Button({ square, children, ...rest }) {
  if (square) {
    return <SquareButton {...rest}>{children}</SquareButton>;
  } else {
    return <NormalButton {...rest}>{children}</NormalButton>;
  }
}

export default Button;
