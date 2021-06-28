import Web3 from "web3";
import { magicKeySetUp } from "helpers/magicSetup";

let magicLink = null;

export const userService = {
  login: (email) =>
    new Promise(async (resolve, reject) => {
      try {
        await magicLink.auth.loginWithMagicLink({ email });
        const web3 = new Web3(magicLink.rpcProvider);
        const publicAddress = await web3.eth.getAccounts();
        resolve({ email, publicAddress: publicAddress[0] });
      } catch (error) {
        reject(error);
      }
    }),

  autoLogin: () =>
    new Promise(async (resolve, reject) => {
      const { magic } = await magicKeySetUp();
      magicLink = magic;
      const isUserLoggedIn = await magicLink.user.isLoggedIn();
      if (isUserLoggedIn) {
        const userMetaData = await magicLink.user.getMetadata();
        resolve(userMetaData);
      } else {
        reject({ user: "not logged in" });
      }
    }),
};
