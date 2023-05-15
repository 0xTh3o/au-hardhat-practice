import hre from "hardhat";
require("dotenv").config();

async function main() {
  const url = process.env.ALCHEMY_HTTPS_URL;

  let artifacts = await hre.artifacts.readArtifact("Faucet");

  const provider = new hre.ethers.providers.JsonRpcProvider(url);

  let privateKey = process.env.TEST_PRIVATE_KEY ?? "";

  let wallet = new hre.ethers.Wallet(privateKey, provider);

  // Create an instance of a Faucet Factory
  let factory = new hre.ethers.ContractFactory(
    artifacts.abi,
    artifacts.bytecode,
    wallet
  );

  let faucet = await factory.deploy();

  console.log("Faucet address:", faucet.address);

  await faucet.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
