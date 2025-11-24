/* eslint-disable prefer-const */
import { BigInt, BigDecimal, Address } from '@graphprotocol/graph-ts'
import { SeigManager as SeigManagerContract } from '../generated/SeigManager/SeigManager'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'
export const SEIGMANAGER_ADDRESS = '0x0b55a0f463b6defb81c6063973763951712d0e5f'

export let ZERO_BI = BigInt.fromI32(0)
export let ONE_BI = BigInt.fromI32(1)
export let ZERO_BD = BigDecimal.fromString('0')
export let ONE_BD = BigDecimal.fromString('1')
export let BI_18 = BigInt.fromI32(18)
export let BI_27 = BigInt.fromI32(27)
export let FIVE_BI = BigInt.fromI32(5)

export let seigmanagerContract = SeigManagerContract.bind(Address.fromString(SEIGMANAGER_ADDRESS))
