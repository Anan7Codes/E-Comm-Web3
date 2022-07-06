//0xae35E51F26E404eCE85F026F98671E2bE4A7e07e
const hre = require("hardhat");

async function main() {
  const Store = await hre.ethers.getContractFactory("Store");
  const store = await Store.deploy();

  await store.deployed();

  console.log("Store deployed to:", store.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
