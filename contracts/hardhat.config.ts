import * as dotenv from 'dotenv'

import { HardhatUserConfig, task } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import 'hardhat-dependency-compiler'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'solidity-coverage'

dotenv.config()

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})

// Ensure that we have all the environment variables we need.
const mnemonic: string | undefined = process.env.MNEMONIC
if (!mnemonic) {
    throw new Error('Please set your MNEMONIC in a .env file')
}

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
    solidity: '0.8.13',
    networks: {
        geth: {
            url: 'http://127.0.0.1:8545/',
            accounts: {
                mnemonic,
            },
        },
        goerli: {
            url: process.env.GOERLI_PROVIDER,
            accounts: {
                mnemonic,
            },
        },
    },
}

export default config
