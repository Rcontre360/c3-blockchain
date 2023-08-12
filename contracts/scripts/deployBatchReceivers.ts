import hre, {ethers} from 'hardhat'
import {writeJsonFile} from './utils'

async function main() {
    const BatchFactory = await ethers.getContractFactory('DeployReceiversBatch')
    const deployer = await BatchFactory.deploy()

    console.log(`deployer: ${deployer.address}`)
    const contracts = await deployer.callStatic.deploy()
    await deployer.deploy()

    writeJsonFile({
        path: `/addresses.${hre.network.name}.json`,
        data: {
            Deployer: deployer.address,
            contracts,
        },
    })
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
