const { utils } = require('ethers');
async function main() {
    // Get contract deployer's wallet address
    const [owner] = await hre.ethers.getSigners();
    // A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts.
    // MyNFT is a factory for instances of our NFT contract. When using the hardhat-ethers
    // plugin, ContractFactory and Contract instances are connected to the first signer by default.
    const contractFactory = await ethers.getContractFactory('DataConsumerV3');
    // Deploy contract with the constructor argument baseTokenURI
    // Calling deploy() on a ContractFactory will start the deployment, and return a Promise that resolves to a Contract.
    // This is the object that has a method for each of the smart contract functions.
    const contract = await contractFactory.deploy();
    await contract.deployed();
    console.log('Contract deployed to address:', contract.address);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });