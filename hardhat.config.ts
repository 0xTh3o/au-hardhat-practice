require("dotenv").config();

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY ?? "",
    },
  },
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_HTTPS_URL,
      accounts: [process.env.TEST_PRIVATE_KEY ?? ""],
      chainId: 11155111,
    },
  },
};

export default config;
