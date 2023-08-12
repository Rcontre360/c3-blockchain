import hre, { ethers, network } from 'hardhat'
import { loadJsonFile, writeJsonFile } from './utils'

// const registryAddress = '0x59f7Dd1472c89cb721378073d3662919984D06b2'

async function main() {
    const [_signer] = await ethers.getSigners()
    const configFileName = `addresses.${network.name}.json`
    const data = loadJsonFile(configFileName)

    const ReceiverFactory = await ethers.getContractFactory('C3RewardReceiver')

    const registry = await ethers.getContractAt('C3RewardsRegistry', data.Registry)
    const receiver = await ReceiverFactory.deploy(_signer.address)

    await registry.mockRegister(receiver.address, true)
    console.log('PREV BALANCE', (await ethers.provider.getBalance(_signer.address)).toString())
    await receiver.normalCall()
    console.log('POST BALANCE', (await ethers.provider.getBalance(_signer.address)).toString())

    console.log(`Rewards receiver: ${receiver.address}`)
    console.log(
        'RESULT',
        await getMappingValue(registry.address, receiver.address, ethers.provider)
    )

    writeJsonFile({
        path: `/addresses.${hre.network.name}.json`,
        data: {
            Receiver: receiver.address,
        },
    })
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})

async function getMappingValue(contractAddress: string, userAddress: string, provider: any) {
    const encoded = ethers.utils.defaultAbiCoder.encode(['address', 'uint256'], [userAddress, 0])
    const storageKey = ethers.utils.keccak256(encoded)

    const rawValue = await provider.getStorageAt(contractAddress, storageKey)
    console.log({ storageKey, rawValue, encoded })

    return Boolean(Number(rawValue)) // Convert the hex value to a boolean
}
