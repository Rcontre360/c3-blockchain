import { ethers } from 'hardhat'
import { expect } from 'chai'
import { C3RewardsRegistry } from '../typechain'

describe('C3 Registry', function () {
    let registry: C3RewardsRegistry

    it('Should add addresses properly', async () => {
        const RegistryFactory = await ethers.getContractFactory('C3RewardsRegistry')

        registry = await RegistryFactory.deploy(ethers.constants.AddressZero, 'appid', 'actionid')

        const addressesExpected = []
        addressesExpected.push(ethers.constants.AddressZero)

        await registry.mockRegister(ethers.constants.AddressZero, true)
        const allAddresses = await registry.getAllRegisters()

        console.log(allAddresses, ['0x0000000000000000000000000000000000000000'])

        for (let i = 0; i < allAddresses.length; i++) {
            expect(allAddresses[i], 'Address is not being added').to.equal(addressesExpected[i])
        }
    })

    it('Should remove addresses properly', async () => {
        const RegistryFactory = await ethers.getContractFactory('C3RewardsRegistry')

        registry = await RegistryFactory.deploy(ethers.constants.AddressZero, 'appid', 'actionid')

        const addressesExpected = []
        addressesExpected.push(ethers.constants.AddressZero)
        await registry.mockRegister(ethers.constants.AddressZero, true)

        const wallet1 = ethers.Wallet.createRandom()
        await registry.mockRegister(wallet1.address, true)

        const wallet2 = ethers.Wallet.createRandom()
        addressesExpected.push(wallet2.address)
        await registry.mockRegister(wallet2.address, true)

        await registry.mockRegister(wallet1.address, false)

        const allAddresses = await registry.getAllRegisters()

        console.log(allAddresses, ['0x0000000000000000000000000000000000000000'])

        expect(addressesExpected.length).to.equal(allAddresses.length)

        for (let i = 0; i < allAddresses.length; i++) {
            expect(addressesExpected, 'Address is not being added').to.includes(allAddresses[i])
        }
    })
})
