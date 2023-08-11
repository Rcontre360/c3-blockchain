import hre, {ethers} from 'hardhat'
import {MockEventEmitter} from '../typechain'
import {loadJsonFile} from './utils'

async function main() {
    const {Emitter} = await loadJsonFile(`/addresses.${hre.network.name}.json`)
    const emitter = (await ethers.getContractAt('MockEventEmitter', Emitter)) as MockEventEmitter

    const tx = await emitter.emitEvent(1, 2)
    const receipt = await tx.wait()

    console.log('Called:', tx.hash, receipt.blockNumber, receipt.blockHash, receipt.logs)
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})
