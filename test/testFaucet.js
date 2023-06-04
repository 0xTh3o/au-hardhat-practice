const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

// the `describe` scope encapsulates an entire test called `TestModifyVariable`
// the `it` says the behavior that should be expected from the test
describe("Faucet", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContractAndSetVariables() {
    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();
    const withdrawAmount = ethers.utils.parseEther("1.0");

    const [owner] = await ethers.getSigners();

    console.log("Signer 1 address: ", owner.address);
    return { faucet, owner, withdrawAmount };
  }

  it("should deploy and set the right owner", async function () {
    const { faucet, owner } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.owner()).to.equal(owner.address);
  });

  it("should not allow withdrawal more than 0.1 eth", async function () {
    const { faucet, withdrawAmount } = await loadFixture(
      deployContractAndSetVariables
    );

    await expect(faucet.withdraw(withdrawAmount)).to.be.reverted;
  });

  it("should not withdraw all ether if not owner", async function () {
    const { faucet } = await loadFixture(deployContractAndSetVariables);

    expect(await faucet.withdrawAll()).to.be.reverted;
  });
});
