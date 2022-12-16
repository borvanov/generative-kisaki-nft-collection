const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Kisaki", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployKisakiFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Kisaki = await ethers.getContractFactory("Kisaki");
    const kisaki = await Kisaki.deploy();

    return { owner, otherAccount, kisaki };
  }

  describe("Deployment", function () {});

  describe("Minting", function () {
    describe("Token creation", function () {
      // it("Should revert with the right error if called too soon", async function () {
      //   const { kisaki } = await loadFixture(deployKisakiFixture);

      //   await expect(lock.withdraw()).to.be.revertedWith(
      //     "You can't withdraw yet"
      //   );
      // });
    });

    describe("Events", function () {
      // it("Should emit an event on new token minted", async function () {
      //   const { lock, unlockTime, lockedAmount } = await loadFixture(
      //     deployOneYearLockFixture
      //   );

      //   await time.increaseTo(unlockTime);

      //   await expect(lock.withdraw())
      //     .to.emit(lock, "Withdrawal")
      //     .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      // });
    });

    describe("Transfers", function () {
      // it("Should transfer the funds to the owner", async function () {
      //   const { lock, unlockTime, lockedAmount, owner } = await loadFixture(
      //     deployOneYearLockFixture
      //   );

      //   await time.increaseTo(unlockTime);

      //   await expect(lock.withdraw()).to.changeEtherBalances(
      //     [owner, lock],
      //     [lockedAmount, -lockedAmount]
      //   );
      // });
    });
  });
});
