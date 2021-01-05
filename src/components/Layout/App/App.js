//Packages
import styled, { ThemeProvider } from "styled-components";

//Styles
import GlobalStyles from "../../../utils/styles/global";
import { theme } from "../../../utils/styles/theme";

//Components
import Main from "../../../routes/Main";

//General wrapper around application
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: var(--background);
  color: var(--text);
  overflow-x: hidden;
  transition: color 0.2s ease-out, background 0.2s ease-out;
`;

//App is the main container for the whole web application
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Main />
        <GlobalStyles />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
