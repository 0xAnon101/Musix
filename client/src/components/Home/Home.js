import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Web3 from "web3";
import { motion } from "framer-motion";
import { magicKeySetUp } from "helpers/magicSetup";
import { actions as authActions } from "ducks/auth";
import MusixSVG from "assets/1.svg";
import BandPNG from "assets/band.png";

const LeftWrapper = styled.div`
  align-self: center;
  img {
    height: 300px;
  }
`;
const RightWrapper = styled.div`
  font-family: "Montserrat", sans-serif;

  .musix-logo {
    height: 270px;
    margin: 0px auto;
  }

  .intro-wrapper {
    position relative;
    margin: 70px auto;
    text-align: left;
    .intro-text {
      color: #35b070;
      text-align: left;
      position: absolute;
      top: 47px;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: 0.08333em;
    }
    .intro-desc {
      color: #fff;
      width: 450px;
      text-align: left;
    }
  }
`;

const FormWrapper = styled.div`
  display: flex;
  align-content: center;
  flex-direction: column;
  width: 100%;

  input {
    padding: 20px 20px 20px 20px;
    width: calc(100% - 40px);
    border: none;
    outline: none;
    border-radius: 5px;
    font-family: "Montserrat", sans-serif;
  }

  button {
    margin-top: 20px;
    padding: 10px;
    background-color: #35b070;
    border: 2px solid #1f8a52;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    font-family: "Montserrat", sans-serif;
    width: 100%;
  }
`;

const Home = (props) => {
  const [email, setEmail] = useState("");

  const boxVariants = {
    hover: { scale: 1.05 },
  };

  useEffect(() => {
    if (!props.user) props.autoLogin();
    else {
      props.history.push("/playLists");
    }
  }, [props.user]);

  const setInputs = ({ target }) => {
    setEmail(target.value);
  };

  const sendMagicLink = (e) => {
    e.preventDefault();
    const emailInput = email;
    props.login(emailInput);
  };

  return (
    <React.Fragment>
      <LeftWrapper>
        <img src={BandPNG} alt={"band"} />
      </LeftWrapper>
      <RightWrapper>
        <div className="intro-wrapper">
          <div className="intro-text">INTRODUCING</div>
          <motion.img
            variants={boxVariants}
            whileHover="hover"
            src={MusixSVG}
            className="musix-logo"
            alt="musix"
          />
          <p className="intro-desc">
            Musix is an evolution in Web 3.0 combining smart contract based NFTs
            with state of the art music. We are committed to transitioning the
            blockchain music industry as a gateway into NFTs world.
          </p>
        </div>

        <FormWrapper>
          <form>
            <input
              name="email"
              type="text"
              placeholder="Enter your email ... "
              value={email}
              onChange={setInputs}
            />
            <motion.button
              onClick={sendMagicLink}
              variants={boxVariants}
              whileHover="hover"
            >
              Login to Musix
            </motion.button>
          </form>
        </FormWrapper>
      </RightWrapper>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (email) => dispatch(authActions.login(email)),
    autoLogin: () => dispatch(authActions.autoLogin()),
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
