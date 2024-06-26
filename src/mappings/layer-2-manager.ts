import { ZERO_BI } from "../../constants";
import { SystemConfig } from '../../generated/Layer2Manager/SystemConfig';
import {
  RegisteredLayer2Candidate as RegisteredLayer2CandidateEvent,
  // RoleAdminChanged as RoleAdminChangedEvent,
  // RoleGranted as RoleGrantedEvent,
  // RoleRevoked as RoleRevokedEvent,
  // SetAddresses as SetAddressesEvent,
  // SetMinimumInitialDepositAmount as SetMinimumInitialDepositAmountEvent
} from "../../generated/Layer2Manager/Layer2Manager"
import {
  Layer2Candidate,
  Candidate,
  // RoleAdminChanged,
  // RoleGranted,
  // RoleRevoked,
  // SetAddresses,
  // SetMinimumInitialDepositAmount
} from "../../generated/schema"

export function handleRegisteredLayer2Candidate(
  event: RegisteredLayer2CandidateEvent
): void {
  let entity = new Layer2Candidate(event.params.layer2Candidate.toHexString()) as Layer2Candidate
  let candidate = Candidate.load(event.params.layer2Candidate.toHexString());
  if (candidate === null) {
    candidate = new Candidate(event.params.layer2Candidate.toHexString())
  } 
  let systemConfig = SystemConfig.bind(event.params.systemConfig)
  entity.candidate = candidate.id

  entity.systemConfig = event.params.systemConfig
  entity.wtonAmount = event.params.wtonAmount
  entity.memo = event.params.memo
  entity.operator = event.params.operator
  entity.layer2Candidate = event.params.layer2Candidate
  entity.registeredTime = event.block.timestamp
  entity.bridge = systemConfig.l1StandardBridge()
  entity.stateRoot = systemConfig.l2OutputOracle()
  entity.txData = systemConfig.l1CrossDomainMessenger()
  entity.portal = systemConfig.optimismPortal()
  
  candidate.layer2Candidate = event.params.layer2Candidate.toHexString();

  candidate.save()
  entity.save()
}

