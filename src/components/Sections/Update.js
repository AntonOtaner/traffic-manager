//Packages
import React from "react";
import styled from "styled-components";

//Components
import Text from "../UI/Text";
import Loader from "../UI/Loader";

//Styles
const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  display: flex;
  align-items: center;
  padding-right: 10px;
`;

//Status shown at top right of the screen
function Update({ isLoading, statusText }) {
  //isLoading: boolean that is true when updating or searching for wifi
  //statusText: string with text to be displayed
  return (
    <Container>
      {isLoading ? (
        <>
          <Text type="body" margin="10px 5px">
            {statusText}
          </Text>
          <Loader />
        </>
      ) : (
        <Text type="body" margin="10px 0">
          {statusText}
        </Text>
      )}
    </Container>
  );
}

//React.memo since only needs to update when props update
export default React.memo(Update);
