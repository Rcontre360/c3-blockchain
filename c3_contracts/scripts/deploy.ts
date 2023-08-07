import {ethers} from 'hardhat'

async function main() {
    //const worldIDAddress = await fetch('https://developer.worldcoin.org/api/v1/contracts')
    //.then(res => res.json() as Promise<{key: string; value: string}[]>)
    //.then(res => res.find(({key}) => key === 'staging.semaphore.wld.eth').value)
    const [signer] = await ethers.getSigners()

    const ContractFactory = await ethers.getContractFactory('C3RewardsRegistry')
    const contract = await ContractFactory.deploy(ethers.constants.AddressZero, 'appid', 'actionid')

    await contract.deployed()
    await contract.mockRegister(signer.address, true)

    console.log('Contract deployed to:', contract.address)
    console.log('RESULT', await getMappingValue(contract.address, signer.address, ethers.provider))
}

main().catch(error => {
    console.error(error)
    process.exitCode = 1
})

async function getMappingValue(contractAddress: string, userAddress: string, provider: any) {
    const encoded = ethers.utils.defaultAbiCoder.encode(['address', 'uint256'], [userAddress, 0])
    const storageKey = ethers.utils.keccak256(encoded)
    console.log('user address', {userAddress, encoded})

    const rawValue = await provider.getStorageAt(contractAddress, storageKey)

    return Boolean(Number(rawValue)) // Convert the hex value to a boolean
}
