// import {
//   CoinageCreated as CoinageCreatedEvent,
//   Comitted as ComittedEvent,
//   CommissionRateSet as CommissionRateSetEvent,
//   CommitLog1 as CommitLog1Event,
//   OnSnapshot as OnSnapshotEvent,
//   Paused as PausedEvent,
//   RoleAdminChanged as RoleAdminChangedEvent,
//   RoleGranted as RoleGrantedEvent,
//   RoleRevoked as RoleRevokedEvent,
//   SeigGiven as SeigGivenEvent,
//   Unpaused as UnpausedEvent,
//   UnstakeLog as UnstakeLogEvent,
//   UpdatedSeigniorage as UpdatedSeigniorageEvent
// } from "../generated/SeigManager/SeigManager"
// import {
//   Comitted,
//   CommissionRateSet,
  
//   OnSnapshot,
  
//   SeigGiven,
  
//   UpdatedSeigniorage
// } from "../generated/schema"

// export function handleCoinageCreated(event: CoinageCreatedEvent): void {
//   let entity = new CoinageCreated(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.layer2 = event.params.layer2
//   entity.coinage = event.params.coinage

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleComitted(event: ComittedEvent): void {
//   let entity = new Comitted(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.layer2 = event.params.layer2

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleCommissionRateSet(event: CommissionRateSetEvent): void {
//   let entity = new CommissionRateSet(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.layer2 = event.params.layer2
//   entity.previousRate = event.params.previousRate
//   entity.newRate = event.params.newRate

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleCommitLog1(event: CommitLog1Event): void {
//   let entity = new CommitLog1(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.totalStakedAmount = event.params.totalStakedAmount
//   entity.totalSupplyOfWTON = event.params.totalSupplyOfWTON
//   entity.prevTotalSupply = event.params.prevTotalSupply
//   entity.nextTotalSupply = event.params.nextTotalSupply

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleOnSnapshot(event: OnSnapshotEvent): void {
//   let entity = new OnSnapshot(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.snapshotId = event.params.snapshotId

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handlePaused(event: PausedEvent): void {
//   let entity = new Paused(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.account = event.params.account

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
//   let entity = new RoleAdminChanged(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.role = event.params.role
//   entity.previousAdminRole = event.params.previousAdminRole
//   entity.newAdminRole = event.params.newAdminRole

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleRoleGranted(event: RoleGrantedEvent): void {
//   let entity = new RoleGranted(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.role = event.params.role
//   entity.account = event.params.account
//   entity.sender = event.params.sender

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleRoleRevoked(event: RoleRevokedEvent): void {
//   let entity = new RoleRevoked(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.role = event.params.role
//   entity.account = event.params.account
//   entity.sender = event.params.sender

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleSeigGiven(event: SeigGivenEvent): void {
//   let entity = new SeigGiven(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.layer2 = event.params.layer2
//   entity.totalSeig = event.params.totalSeig
//   entity.stakedSeig = event.params.stakedSeig
//   entity.unstakedSeig = event.params.unstakedSeig
//   entity.powertonSeig = event.params.powertonSeig
//   entity.pseig = event.params.pseig

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleUnpaused(event: UnpausedEvent): void {
//   let entity = new Unpaused(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.account = event.params.account

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleUnstakeLog(event: UnstakeLogEvent): void {
//   let entity = new UnstakeLog(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.coinageBurnAmount = event.params.coinageBurnAmount
//   entity.totBurnAmount = event.params.totBurnAmount

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleUpdatedSeigniorage(event: UpdatedSeigniorageEvent): void {
//   let entity = new UpdatedSeigniorage(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.layer2 = event.params.layer2
//   entity.blockNumber = event.params.blockNumber
//   entity.prevTotal = event.params.prevTotal
//   entity.nextTotal = event.params.nextTotal
//   entity.oldTotFactor = event.params.oldTotFactor
//   entity.oldCoinageFactor = event.params.oldCoinageFactor
//   entity.nextTotFactor = event.params.nextTotFactor
//   entity.nextCoinageFactor = event.params.nextCoinageFactor

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }
