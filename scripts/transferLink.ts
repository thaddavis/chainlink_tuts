require("dotenv").config()

const ABI = require('../abis/LINK.json')

// const API_ABI = require('../artifacts/contracts/APIConsumer.sol/APIConsumer.json')

const hre = require('hardhat')

async function main() {
    const BigNumber = hre.ethers.BigNumber
    const pointOneLink = BigNumber.from("1000000000000000000") // 0.1

    console.log(process.env.GOERLI_RPC_URL)

    // await hre.run("compile")
    const [owner] = await hre.ethers.getSigners();

    const linkContract = await hre.ethers.getContractAt(ABI, "0x326C977E6efc84E512bB9C30f76E30c160eD06FB", owner)
    // console.log('linkContract', linkContract)

    let txnResp = await linkContract.transfer(
        '0x92D8e5708FE8C9975015047F15314dE61B2dDc2A',
        pointOneLink
    )
    console.log(txnResp)

    // const apiConsumerContract = await hre.ethers.getContractAt(API_ABI.abi, "0xF2e03403D8Ef643351826bFBaC6eD6ae493E738B", owner)  
    // // console.log('apiConsumerContract', apiConsumerContract)

    // let txnResp = await apiConsumerContract.requestVolumeData();
    // console.log('txnResp requestVolumeData', txnResp)

    // txnResp = await apiConsumerContract.volume();
    // console.log('txnResp volume', txnResp)
}

main().catch((e) => {
    console.error(e)
    process.exitCode = 1
})