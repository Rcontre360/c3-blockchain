import {ethers} from 'ethers'
import fs from 'fs'

export const toBN = ethers.BigNumber.from

export const loadJsonFile = (file: string) => {
    const appRoot = require('app-root-path')
    try {
        const data = fs.readFileSync(appRoot + file)
        return JSON.parse(data as any)
    } catch (err) {
        return {}
    }
}

export const cleanJsonData = (args: {path: string}) => {
    const appRoot = require('app-root-path')

    console.log('Cleaning', appRoot + args.path)
    fs.writeFileSync(appRoot + args.path, '{}')
}

export const writeJsonFile = (args: {path: string; data: Object}) => {
    const appRoot = require('app-root-path')
    const prevData = loadJsonFile(args.path)
    const parsedData = JSON.stringify(
        {
            ...prevData,
            ...args.data,
        },
        null,
        2
    )
    console.log('Writting', appRoot + args.path)
    fs.writeFileSync(appRoot + args.path, parsedData, {flat: 'wx'} as any)
}

export const wait = (time: number) => new Promise((resolve, reject) => setTimeout(resolve, time))

export const hash = (label: string) => ethers.utils.keccak256(ethers.utils.toUtf8Bytes(label))
