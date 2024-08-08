import {
  FailedRelayedFastMessage as FailedRelayedFastMessageEvent,
  FailedRelayedMessage as FailedRelayedMessageEvent,
  Initialized as InitializedEvent,
  MessageAllowed as MessageAllowedEvent,
  MessageBlocked as MessageBlockedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  RelayedFastMessage as RelayedFastMessageEvent,
  RelayedMessage as RelayedMessageEvent,
  SentMessage as SentMessageEvent,
  Unpaused as UnpausedEvent
} from "../../generated/L1CrossDomainMessenger/L1CrossDomainMessenger"
import {
  FailedRelayedFastMessage,
  FailedRelayedMessage,
  Initialized,
  MessageAllowed,
  MessageBlocked,
  OwnershipTransferred,
  Paused,
  RelayedFastMessage,
  RelayedMessage,
  SentMessage,
  Unpaused
} from "../../generated/schema"

export function handleFailedRelayedFastMessage(
  event: FailedRelayedFastMessageEvent
): void {
  let entity = new FailedRelayedFastMessage(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.target = event.params.target
  entity.sender = event.params.sender
  entity.message = event.params.message
  entity.messageNonce = event.params.messageNonce

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFailedRelayedMessage(
  event: FailedRelayedMessageEvent
): void {
  let entity = new FailedRelayedMessage(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.msgHash = event.params.msgHash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMessageAllowed(event: MessageAllowedEvent): void {
  let entity = new MessageAllowed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._xDomainCalldataHash = event.params._xDomainCalldataHash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMessageBlocked(event: MessageBlockedEvent): void {
  let entity = new MessageBlocked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._xDomainCalldataHash = event.params._xDomainCalldataHash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayedFastMessage(event: RelayedFastMessageEvent): void {
  let entity = new RelayedFastMessage(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.target = event.params.target
  entity.sender = event.params.sender
  entity.message = event.params.message
  entity.messageNonce = event.params.messageNonce

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRelayedMessage(event: RelayedMessageEvent): void {
  let entity = new RelayedMessage(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.msgHash = event.params.msgHash

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSentMessage(event: SentMessageEvent): void {
  let entity = new SentMessage(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.target = event.params.target
  entity.sender = event.params.sender
  entity.message = event.params.message
  entity.messageNonce = event.params.messageNonce
  entity.gasLimit = event.params.gasLimit

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}