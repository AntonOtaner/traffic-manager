//Packages
import styled from "styled-components";

//Styles
const SquareButton = styled.button`
  font-size: 1.4rem;
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: ${({ margin }) => margin && margin};
  border-radius: 5px;
  border: none;
  background-color: ${({ empty }) => (empty ? "transparent" : "var(--border)")};
  color: var(--text);
  cursor: pointer;

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

//Button Component (currently for zoom and center buttons)
function Button({ children, ...rest }) {
  return <SquareButton {...rest}>{children}</SquareButton>;
}

export default Button;
