//Packages
import styled from "styled-components";

//Components
import Text from "../UI/Text";

//Styles
const GridText = styled(Text)`
  position: absolute;
  margin: 0;
`;

const XGridText = styled(GridText)`
  top: 75px;
`;

const XLeft = styled(XGridText)`
  left: 85px;
`;

const XLeftCenter = styled(XGridText)`
  left: calc((85px + 50%) / 2);
  transform: translateX(-25%);
`;

const XCenter = styled(XGridText)`
  left: 50%;
  transform: translateX(-50%);
`;

const XRightCenter = styled(XGridText)`
  right: calc((85px + 50%) / 2);
  transform: translateX(25%);
`;

const XRight = styled(XGridText)`
  right: 85px;
`;

const YGridText = styled(GridText)`
  left: 30px;
  transform: rotate(-90deg);
`;

const YTop = styled(YGridText)`
  top: 130px;
`;

const YTopCenter = styled(YGridText)`
  top: calc((130px + 50%) / 2);
  transform: translateY(-25%) rotate(-90deg);
`;

const YCenter = styled(YGridText)`
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
`;

const YBottomCenter = styled(YGridText)`
  bottom: calc((130px + 50%) / 2);
  transform: translateY(25%) rotate(-90deg);
`;

const YBottom = styled(YGridText)`
  bottom: 130px;
`;

const GridMarks = ({ values }) => {
  return (
    <>
      {/* X-Axis */}
      <XLeft type="body">{values[0][4]}</XLeft>
      <XLeftCenter type="body">{values[0][3]}</XLeftCenter>
      <XCenter type="body">{values[0][2]}</XCenter>
      <XRightCenter type="body">{values[0][1]}</XRightCenter>
      <XRight type="body">{values[0][0]}</XRight>
      {/* Y-Axis */}
      <YTop type="body">{values[1][0]}</YTop>
      <YTopCenter type="body">{values[1][1]}</YTopCenter>
      <YCenter type="body">{values[1][2]}</YCenter>
      <YBottomCenter type="body">{values[1][3]}</YBottomCenter>
      <YBottom type="body">{values[1][4]}</YBottom>
    </>
  );
};

export default GridMarks;
