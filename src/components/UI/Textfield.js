import styled from "styled-components";

const StyledTextField = styled.input`
  font-family: "Open Sans", sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  padding: 5px;
  border: 2px solid var(--border);
  border-radius: 10px;
  background-color: var(--background);
  margin-top: 5px;
  color: var(--text);
  transition: 0.1s all ease;

  ::placeholder {
    color: var(--border);
  }

  &:focus {
    outline: none;
    border: 2px solid var(--text-light);
    ::placeholder {
      color: var(--text-light);
    }
  }
`;

const Textfield = ({ children, ...rest }) => {
  return <StyledTextField {...rest}>{children}</StyledTextField>;
};

export default Textfield;
