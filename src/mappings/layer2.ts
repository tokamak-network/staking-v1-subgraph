import { Layer2, Candidate } from '../../generated/schema'
import { LAYER2_ADDRESS, ZERO_BI, ONE_BI, ZERO_BD, ADDRESS_ZERO } from '../../utils/constants'
import {
  CreatedCandidate as CandidateEvent
} from '../../generated/Layer2Manager/Layer2Manager'

export function handleCandidateCreated (event: CandidateEvent): void {
  let layer2 = Layer2.load(LAYER2_ADDRESS)
  if (layer2 == null) {
    layer2 = new Layer2(LAYER2_ADDRESS)

    layer2.layer2CandidateCount = ZERO_BI
    layer2.stakingTxCount = ZERO_BI
    layer2.updateSeigTxCount = ZERO_BI

    layer2.totalStakedTON = ZERO_BI
    layer2.totalPendingWithdrawal = ZERO_BI

  }

  layer2.layer2CandidateCount = layer2.layer2CandidateCount.plus(ONE_BI)

  let candidate = new Candidate(event.params._index.toHexString()) as Candidate
  
  candidate.id = event.params._index.toString()
  candidate.name = event.params._name.toHexString()
  candidate.commissionRate = ZERO_BD
  
  candidate.txCount = ZERO_BI
  candidate.stakedAmount = ZERO_BI
  candidate.pendingWithdrawalAmount = ZERO_BI

  candidate.save()
  layer2.save()
}
