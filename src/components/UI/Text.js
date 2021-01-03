import styled from "styled-components";

//Title (mutlipe h2)
const StyledTitle = styled.h2`
  font-weight: 700;
  font-size: 1.4rem;
  color: var(--text);
  margin: ${({ margin }) => margin && margin};
  text-align: ${({ align }) => align && align};
`;

//Under titles
const StyledSubTitle = styled.h3`
  font-weight: 600;
  font-size: 1.1rem;
  color: var(--text);
  margin: ${({ margin }) => margin && margin};
  text-align: ${({ align }) => align && align};
`;

//Bold Text
const StyledBoldText = styled.h4`
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text);
  margin: ${({ margin }) => margin && margin};
  text-align: ${({ align }) => align && align};
`;

//General Text
const StyledBodyText = styled.p`
  font-weight: 400;
  font-size: 0.9rem;
  color: var(--text);
  margin: ${({ margin }) => margin && margin};
  text-align: ${({ align }) => align && align};
`;

const Text = (props) => {
  if (props.type === "title") {
    return <StyledTitle {...props}>{props.children}</StyledTitle>;
  } else if (props.type === "subTitle") {
    return <StyledSubTitle {...props}>{props.children}</StyledSubTitle>;
  } else if (props.type === "bold") {
    return <StyledBoldText {...props}>{props.children}</StyledBoldText>;
  } else if (props.type === "body") {
    return <StyledBodyText {...props}>{props.children}</StyledBodyText>;
  } else {
    return <StyledBodyText {...props}>{props.children}</StyledBodyText>;
  }
};

export default Text;
