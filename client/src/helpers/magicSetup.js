import { Magic, SDKError } from "magic-sdk";

export const magicKeySetUp = async () => {
  let magic = null;
  const customNodeOptions = {
    rpcUrl: process.env.REACT_APP_LOCAL_URL, // node running
    chainId: 1337, // chainId
  };

  try {
    magic = new Magic(process.env.REACT_APP_MAGIC_PB_KEY_TEST, {
      network: customNodeOptions,
    });
  } catch (err) {
    if (err instanceof SDKError) {
      console.log(err);
    }
  }

  return { magic, web3 };
};
