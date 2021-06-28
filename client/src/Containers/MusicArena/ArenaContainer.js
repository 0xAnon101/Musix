import React from "react";
import styled from "styled-components";
import MusicArena from "components/MusicArena";

const Wrapper = styled.div`
  height: 100%;
  margin: 0 auto;
`;

class MusicArenaContainer extends React.Component {
  render() {
    return (
      <Wrapper>
        <MusicArena />
      </Wrapper>
    );
  }
}

export default MusicArenaContainer;
