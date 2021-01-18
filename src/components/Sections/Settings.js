//Packages
import React from "react";
import styled from "styled-components";

//Components
import Text from "../UI/Text";

//Styles
const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 50px;

  display: flex;
  flex-direction: column;
  padding: 0 10px;

  border-radius: 0 0 15px 0;
  border-width: 0 5px 5px 0;
  border-style: solid;
  border-color: var(--border);
`;

//Information with project name at the bottom right of the screen
function Settings() {
  return (
    <Container>
      <Text type="body" margin="4px 0">
        TMS
      </Text>
      <Text type="body" margin="0">
        Maritime Mesh
      </Text>
    </Container>
  );
}

//React.memo since does not need to update update (no props)
export default React.memo(Settings);
