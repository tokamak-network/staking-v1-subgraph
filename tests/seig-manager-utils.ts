import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  CoinageCreated,
  Comitted,
  CommissionRateSet,
  CommitLog1,
  OnSnapshot,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SeigGiven,
  Unpaused,
  UnstakeLog,
  UpdatedSeigniorage
} from "../generated/SeigManager/SeigManager"

export function createCoinageCreatedEvent(
  layer2: Address,
  coinage: Address
): CoinageCreated {
  let coinageCreatedEvent = changetype<CoinageCreated>(newMockEvent())

  coinageCreatedEvent.parameters = new Array()

  coinageCreatedEvent.parameters.push(
    new ethereum.EventParam("layer2", ethereum.Value.fromAddress(layer2))
  )
  coinageCreatedEvent.parameters.push(
    new ethereum.EventParam("coinage", ethereum.Value.fromAddress(coinage))
  )

  return coinageCreatedEvent
}

export function createComittedEvent(layer2: Address): Comitted {
  let comittedEvent = changetype<Comitted>(newMockEvent())

  comittedEvent.parameters = new Array()

  comittedEvent.parameters.push(
    new ethereum.EventParam("layer2", ethereum.Value.fromAddress(layer2))
  )

  return comittedEvent
}

export function createCommissionRateSetEvent(
  layer2: Address,
  previousRate: BigInt,
  newRate: BigInt
): CommissionRateSet {
  let commissionRateSetEvent = changetype<CommissionRateSet>(newMockEvent())

  commissionRateSetEvent.parameters = new Array()

  commissionRateSetEvent.parameters.push(
    new ethereum.EventParam("layer2", ethereum.Value.fromAddress(layer2))
  )
  commissionRateSetEvent.parameters.push(
    new ethereum.EventParam(
      "previousRate",
      ethereum.Value.fromUnsignedBigInt(previousRate)
    )
  )
  commissionRateSetEvent.parameters.push(
    new ethereum.EventParam(
      "newRate",
      ethereum.Value.fromUnsignedBigInt(newRate)
    )
  )

  return commissionRateSetEvent
}

export function createCommitLog1Event(
  totalStakedAmount: BigInt,
  totalSupplyOfWTON: BigInt,
  prevTotalSupply: BigInt,
  nextTotalSupply: BigInt
): CommitLog1 {
  let commitLog1Event = changetype<CommitLog1>(newMockEvent())

  commitLog1Event.parameters = new Array()

  commitLog1Event.parameters.push(
    new ethereum.EventParam(
      "totalStakedAmount",
      ethereum.Value.fromUnsignedBigInt(totalStakedAmount)
    )
  )
  commitLog1Event.parameters.push(
    new ethereum.EventParam(
      "totalSupplyOfWTON",
      ethereum.Value.fromUnsignedBigInt(totalSupplyOfWTON)
    )
  )
  commitLog1Event.parameters.push(
    new ethereum.EventParam(
      "prevTotalSupply",
      ethereum.Value.fromUnsignedBigInt(prevTotalSupply)
    )
  )
  commitLog1Event.parameters.push(
    new ethereum.EventParam(
      "nextTotalSupply",
      ethereum.Value.fromUnsignedBigInt(nextTotalSupply)
    )
  )

  return commitLog1Event
}

export function createOnSnapshotEvent(snapshotId: BigInt): OnSnapshot {
  let onSnapshotEvent = changetype<OnSnapshot>(newMockEvent())

  onSnapshotEvent.parameters = new Array()

  onSnapshotEvent.parameters.push(
    new ethereum.EventParam(
      "snapshotId",
      ethereum.Value.fromUnsignedBigInt(snapshotId)
    )
  )

  return onSnapshotEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}

export function createSeigGivenEvent(
  layer2: Address,
  totalSeig: BigInt,
  stakedSeig: BigInt,
  unstakedSeig: BigInt,
  powertonSeig: BigInt,
  pseig: BigInt
): SeigGiven {
  let seigGivenEvent = changetype<SeigGiven>(newMockEvent())

  seigGivenEvent.parameters = new Array()

  seigGivenEvent.parameters.push(
    new ethereum.EventParam("layer2", ethereum.Value.fromAddress(layer2))
  )
  seigGivenEvent.parameters.push(
    new ethereum.EventParam(
      "totalSeig",
      ethereum.Value.fromUnsignedBigInt(totalSeig)
    )
  )
  seigGivenEvent.parameters.push(
    new ethereum.EventParam(
      "stakedSeig",
      ethereum.Value.fromUnsignedBigInt(stakedSeig)
    )
  )
  seigGivenEvent.parameters.push(
    new ethereum.EventParam(
      "unstakedSeig",
      ethereum.Value.fromUnsignedBigInt(unstakedSeig)
    )
  )
  seigGivenEvent.parameters.push(
    new ethereum.EventParam(
      "powertonSeig",
      ethereum.Value.fromUnsignedBigInt(powertonSeig)
    )
  )
  seigGivenEvent.parameters.push(
    new ethereum.EventParam("pseig", ethereum.Value.fromUnsignedBigInt(pseig))
  )

  return seigGivenEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createUnstakeLogEvent(
  coinageBurnAmount: BigInt,
  totBurnAmount: BigInt
): UnstakeLog {
  let unstakeLogEvent = changetype<UnstakeLog>(newMockEvent())

  unstakeLogEvent.parameters = new Array()

  unstakeLogEvent.parameters.push(
    new ethereum.EventParam(
      "coinageBurnAmount",
      ethereum.Value.fromUnsignedBigInt(coinageBurnAmount)
    )
  )
  unstakeLogEvent.parameters.push(
    new ethereum.EventParam(
      "totBurnAmount",
      ethereum.Value.fromUnsignedBigInt(totBurnAmount)
    )
  )

  return unstakeLogEvent
}

export function createUpdatedSeigniorageEvent(
  layer2: Address,
  blockNumber: BigInt,
  prevTotal: BigInt,
  nextTotal: BigInt,
  oldTotFactor: BigInt,
  oldCoinageFactor: BigInt,
  nextTotFactor: BigInt,
  nextCoinageFactor: BigInt
): UpdatedSeigniorage {
  let updatedSeigniorageEvent = changetype<UpdatedSeigniorage>(newMockEvent())

  updatedSeigniorageEvent.parameters = new Array()

  updatedSeigniorageEvent.parameters.push(
    new ethereum.EventParam("layer2", ethereum.Value.fromAddress(layer2))
  )
  updatedSeigniorageEvent.parameters.push(
    new ethereum.EventParam(
      "blockNumber",
      ethereum.Value.fromUnsignedBigInt(blockNumber)
    )
  )
  updatedSeigniorageEvent.parameters.push(
    new ethereum.EventParam(
      "prevTotal",
      ethereum.Value.fromUnsignedBigInt(prevTotal)
    )
  )
  updatedSeigniorageEvent.parameters.push(
    new ethereum.EventParam(
      "nextTotal",
      ethereum.Value.fromUnsignedBigInt(nextTotal)
    )
  )
  updatedSeigniorageEvent.parameters.push(
    new ethereum.EventParam(
      "oldTotFactor",
      ethereum.Value.fromUnsignedBigInt(oldTotFactor)
    )
  )
  updatedSeigniorageEvent.parameters.push(
    new ethereum.EventParam(
      "oldCoinageFactor",
      ethereum.Value.fromUnsignedBigInt(oldCoinageFactor)
    )
  )
  updatedSeigniorageEvent.parameters.push(
    new ethereum.EventParam(
      "nextTotFactor",
      ethereum.Value.fromUnsignedBigInt(nextTotFactor)
    )
  )
  updatedSeigniorageEvent.parameters.push(
    new ethereum.EventParam(
      "nextCoinageFactor",
      ethereum.Value.fromUnsignedBigInt(nextCoinageFactor)
    )
  )

  return updatedSeigniorageEvent
}
