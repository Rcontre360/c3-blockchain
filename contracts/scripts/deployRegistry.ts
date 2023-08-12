import hre, {ethers} from 'hardhat'
import {writeJsonFile} from './utils'

const parameters = {
    goerli: {
        worldid: '0x11cA3127182f7583EfC416a8771BD4d11Fae4334',
        appid: 'app_staging_24a51708d58ec102b8a8583588108d0f',
        actionid: 'register-fee-receiver',
    },
    geth: {
        worldid: '0x59f7Dd1472c89cb721378073d3662919984D06b2',
        appid: 'app_staging_24a51708d58ec102b8a8583588108d0f',
        actionid: 'register-fee-receiver',
    },
}

async function main() {
    const params = parameters[hre.network.name]
    const RegistryFactory = await ethers.getContractFactory('C3RewardsRegistry')
    const registry = await RegistryFactory.deploy(params.worldid, params.appid, params.actionid)

    //await registry.deployed()

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
