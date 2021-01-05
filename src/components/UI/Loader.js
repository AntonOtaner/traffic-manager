//Packages
import styled from "styled-components";

//Options
const size = 30;
const time = 1.3;

//Styles
const StyledLoader = styled.div`
        display: inline-block;
        position: relative;
        width: ${size}px;
        height: ${size}px;

    div {
        position: absolute;
        border: 3px solid var(--border);
        opacity: 1;
        border-radius: 50%;
        animation: ripple ${time}s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }
    div:nth-child(2) {
        animation-delay: -${time / 2}s;
    }
    @keyframes ripple {
        0% {
            top: ${(0.95 * size) / 2}px;
            left: ${(0.95 * size) / 2}px;
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            top: 0px;
            left: 0px;
            width: ${0.95 * size}px;
            height: ${0.95 * size}px;
            opacity: 0;
        }
    
`;

//Loading component shown in Update component at top right of the screen
function Loader() {
  return (
    <StyledLoader>
      <div></div>
      <div></div>
    </StyledLoader>
  );
}

export default Loader;
