import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ArenaWrapper = styled.div`
  height: 100%;
  margin: 0 auto;
  display: flex;
`;

const Sidebar = styled.div`
  height: 100%;
  max-width: 200px;
  width: 100%;
`;

const MainWrapper = styled.div`
  width: calc(100% - 200px);
  height: 100%;
`;

const musicArena = () => {
  return (
    <ArenaWrapper>
      <Sidebar>
        <span>Sidebar content</span>
      </Sidebar>
      <MainWrapper>
        <span>MainWrapper content</span>
      </MainWrapper>
    </ArenaWrapper>
  );
};

export default musicArena;
