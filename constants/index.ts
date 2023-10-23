/* eslint-disable prefer-const */
import { BigInt, BigDecimal, Address } from "@graphprotocol/graph-ts";
// import { Layer2Manager as Layer2Contract } from '../../generated/Layer2Manager/Layer2Manager'

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";
export const LAYER2_ADDRESS = "0x7759d8b6d356c5Bd09Aa9211316Ae69b8002d211";

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ZERO_BD = BigDecimal.fromString("0");
export let ONE_BD = BigDecimal.fromString("1");
export let BI_18 = BigInt.fromI32(18);
export let BI_27 = BigInt.fromI32(27)

// export let layer2Contract = Layer2Contract.bind(Address.fromString(LAYER2_ADDRESS))
