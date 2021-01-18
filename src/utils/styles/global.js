import { createGlobalStyle } from "styled-components";

//styles to be applied through the whole app
export default createGlobalStyle`
    body {
      font-family: 'Open Sans', 'sans-serif', "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !important;
      margin: 0;
      // Important colors
      --border: ${(props) => props.theme.colors.blue};
      --danger: ${(props) => props.theme.colors.red};
      --success: ${(props) => props.theme.colors.green};
      //Text
      --text: ${(props) => props.theme.colors.navyGreen};
      //Shades
      --white: ${(props) => props.theme.colors.white};
      //Background
      --background: ${(props) => props.theme.colors.darkBlue};
    }

    img{
      user-drag: none; 
      user-select: none;
    }

    html{
      @media (max-width: 768px) {
        font-size: 85%;
      }
    }

    // Scrollbar (mainly for the info panel)
    /* width */
    ::-webkit-scrollbar {
      width: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: var(--text);
      border-radius: 5px;
    }

`;
