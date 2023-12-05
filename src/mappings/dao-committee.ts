import { Factory, Candidate } from '../../generated/schema'
import { ZERO_BI, ONE_BI, ZERO_BD, ADDRESS_ZERO } from '../../utils/constants'
import { CandidateContractCreated } from '../../generated/DAOCommittee/DAOCommittee';

export function handleCandidateContractCreated (event: CandidateContractCreated): void {
  let factory = Factory.load('1')
  if (factory == null) {
    factory = new Factory('1')

    factory.totalStaked = ZERO_BI
    factory.totalPendingWithdrawal = ZERO_BI
    factory.numOfCandidate = ZERO_BI
  }
  factory.numOfCandidate = factory.numOfCandidate.plus(ONE_BI)
  // factory.factoryCandidateCount = factory.factoryCandidateCount.plus(ONE_BI)

  let candidate = new Candidate(event.params.candidateContract.toHexString()) as Candidate
  
  candidate.id = event.params.candidateContract.toHexString()
  candidate.candidate = event.params.candidate
  candidate.candidateContract = event.params.candidateContract
  candidate.txCount = ZERO_BI
  candidate.name = event.params.memo.toString()
  candidate.commissionRate = ZERO_BI
  candidate.stakedUserList = []
  candidate.prevTotalSupply = ZERO_BI
  candidate.nextTotalSupply = ZERO_BI
  candidate.seigs = ZERO_BI
  
  // candidate.txCount = ZERO_BIts
  candidate.stakedAmount = ZERO_BI
  candidate.pendingWithdrawalAmount = ZERO_BI

  candidate.save()
  factory.save()
}
