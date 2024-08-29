import { SystemConfig } from '../../generated/Layer2Manager/SystemConfig';
import {
  RegisteredCandidateAddOn as RegisteredCandidateAddOnEvent,
  // SetAddresses as SetAddressesEvent,
  // SetMinimumInitialDepositAmount as SetMinimumInitialDepositAmountEvent
} from "../../generated/Layer2Manager/Layer2Manager"
import {
  CandidateAddOn,
  Candidate,
  // SetMinimumInitialDepositAmount
} from "../../generated/schema"
import { ZERO_BD } from '../../utils/constants';

export function handleRegisteredCandidateAddOn(
  event: RegisteredCandidateAddOnEvent
): void {
  let entity = new CandidateAddOn(event.params.candidateAddOn.toHexString()) as CandidateAddOn
  let candidate = Candidate.load(event.params.candidateAddOn.toHexString());
  if (candidate === null) {
    candidate = new Candidate(event.params.candidateAddOn.toHexString())
  } 
  let rollupConfig = SystemConfig.bind(event.params.rollupConfig)
  entity.candidate = candidate.id

  entity.rollupConfig = event.params.rollupConfig
  entity.wtonAmount = event.params.wtonAmount
  entity.memo = event.params.memo
  entity.operator = event.params.operator
  entity.candidateAddOn = event.params.candidateAddOn
  entity.registeredTime = event.block.timestamp
  entity.bridge = rollupConfig.l1StandardBridge()
  entity.stateRoot = rollupConfig.l2OutputOracle()
  entity.txData = rollupConfig.l1CrossDomainMessenger()
  entity.portal = rollupConfig.optimismPortal()
  
  entity.txCount = ZERO_BD
  
  candidate.candidateAddOn = event.params.candidateAddOn.toHexString();

  candidate.save()
  entity.save()
}

