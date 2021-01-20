//Packages
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

//General Text
const StyledLabel = styled.label`
  font-weight: 400;
  font-size: 0.85rem;
  color: var(--text);
  margin: ${({ margin }) => margin && margin};
  text-align: ${({ align }) => align && align};
`;

//General Text
const StyledOtherText = styled.p`
  font-weight: 400;
  font-size: ${({ size }) => (size ? size : "0.8rem")};
  color: ${({ color }) => (color ? color : "var(--text)")};
  margin: ${({ margin }) => margin && margin};
  text-align: ${({ align }) => align && align};
`;

//Text Component
const Text = (props) => {
  if (props.type === "title") {
    return <StyledTitle {...props}>{props.children}</StyledTitle>;
  } else if (props.type === "subTitle") {
    return <StyledSubTitle {...props}>{props.children}</StyledSubTitle>;
  } else if (props.type === "bold") {
    return <StyledBoldText {...props}>{props.children}</StyledBoldText>;
  } else if (props.type === "body") {
    return <StyledBodyText {...props}>{props.children}</StyledBodyText>;
  } else if (props.type === "label") {
    return <StyledLabel {...props}>{props.children}</StyledLabel>;
  } else if (props.type === "other") {
    return <StyledOtherText {...props}>{props.children}</StyledOtherText>;
  } else {
    return <StyledBodyText {...props}>{props.children}</StyledBodyText>;
  }
};

export default Text;
