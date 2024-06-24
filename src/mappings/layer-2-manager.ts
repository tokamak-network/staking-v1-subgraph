import {
  RegisteredLayer2Candidate as RegisteredLayer2CandidateEvent,
  // RoleAdminChanged as RoleAdminChangedEvent,
  // RoleGranted as RoleGrantedEvent,
  // RoleRevoked as RoleRevokedEvent,
  // SetAddresses as SetAddressesEvent,
  // SetMinimumInitialDepositAmount as SetMinimumInitialDepositAmountEvent
} from "../../generated/Layer2Manager/Layer2Manager"
import {
  RegisteredLayer2Candidate,
  // RoleAdminChanged,
  // RoleGranted,
  // RoleRevoked,
  // SetAddresses,
  // SetMinimumInitialDepositAmount
} from "../../generated/schema"

export function handleRegisteredLayer2Candidate(
  event: RegisteredLayer2CandidateEvent
): void {
  let entity = new RegisteredLayer2Candidate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.systemConfig = event.params.systemConfig
  entity.wtonAmount = event.params.wtonAmount
  entity.memo = event.params.memo
  entity.operator = event.params.operator
  entity.layer2Candidate = event.params.layer2Candidate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

