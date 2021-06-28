import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeInterface from "containers/Homepage/HomeContainer";
import MusicArenaInterface from "containers/MusicArena/ArenaContainer";

import "./App.scss";

const AppInterface = styled.div`
  width: 100%;
  height: 100%;
`;

const App = () => {
  return (
    <AppInterface>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeInterface} />
          <Route exact path="/playlists" component={MusicArenaInterface} />
        </Switch>
      </Router>
    </AppInterface>
  );
};

export default App;
