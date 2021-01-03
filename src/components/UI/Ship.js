//Package
import styled from "styled-components";

//Image
import ShipWhite from "../../assets/images/ship-white.svg";
import ShipRed from "../../assets/images/ship-red.svg";

const StyledShip = styled.img`
  position: absolute;
  transform: translate(-50%, -50%)
    ${({ direction }) => direction >= 180 && "scaleX(-1)"};
  transition: all 0.4s ease;

  width: 40px;
  opacity: ${({ isSelected }) => (isSelected ? "100%" : "70%")};
  cursor: pointer;
  z-index: 1;
`;

function Ship({ connections, ...rest }) {
  return (
    <StyledShip
      alt="Ship"
      src={
        connections.receiving.length + connections.providing.length
          ? ShipWhite
          : ShipRed
      }
      {...rest}
    />
  );
}

export default Ship;
