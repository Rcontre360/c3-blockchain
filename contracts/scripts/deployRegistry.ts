import hre, {ethers} from 'hardhat'
import {writeJsonFile} from './utils'

async function main() {
    const RegistryFactory = await ethers.getContractFactory('C3RewardsRegistry')
    const registry = await RegistryFactory.deploy(ethers.constants.AddressZero, 'appid', 'actionid')

    await registry.deployed()

    console.log(`Registry: ${registry.address}`)
    writeJsonFile({
        path: `/addresses.${hre.network.name}.json`,
        data: {
            Registry: registry.address,
        },
    })
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
