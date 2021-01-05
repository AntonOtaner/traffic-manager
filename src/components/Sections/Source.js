//Packages
import React from "react";
import styled from "styled-components";

//Components
import Text from "../UI/Text";

//Styles
const Container = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 50px;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 10px;

  border-radius: 15px 0 0 0;
  border-width: 5px 0 0 5px;
  border-style: solid;
  border-color: var(--border);
`;

//Information with project name at the bottom right of the screen
function Source() {
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
export default React.memo(Source);
