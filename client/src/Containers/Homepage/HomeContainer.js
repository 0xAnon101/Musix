import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import HomeArena from "components/Home/Home";

const Wrapper = styled.div`
  height: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
`;

class Login extends React.Component {
  render() {
    return (
      <Wrapper>
        <HomeArena {...this.props} />
      </Wrapper>
    );
  }
}

export default withRouter(Login);
