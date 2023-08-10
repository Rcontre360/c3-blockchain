import hre, {ethers} from 'hardhat'
import {writeJsonFile} from './utils'

async function main() {
    const MockEmitterFactory = await ethers.getContractFactory('MockEventEmitter')
    const emitter = await MockEmitterFactory.deploy()

    console.log(`MockEmitter: ${emitter.address}`)
    writeJsonFile({
        path: `/addresses.${hre.network.name}.json`,
        data: {
            Emitter: emitter.address,
        },
    })
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
