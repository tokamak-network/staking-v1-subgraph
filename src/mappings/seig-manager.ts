import { SeigManager } from './../../generated/SeigManager/SeigManager';
import { 

  Layer2, 
  UpdatedSeigniorage
} from '../../generated/schema'
import { LAYER2_ADDRESS, ONE_BI, ZERO_BI } from '../../utils/constants';
import {
  UpdatedSeigniorage as UpdatedSeigniorageEvent,
  CreatedCandidate as CandidateEvent,
} from "../../generated/SeigManager/SeigManager"
import { loadTransaction } from '../../utils';

export function handleCoinageCreated (event: CandidateEvent): void {
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

export function handleUpdatedSeigniorage (event: UpdatedSeigniorageEvent): void {
  let layer2 = Layer2.load(LAYER2_ADDRESS)
  if (layer2 === null) layer2 = new Layer2(LAYER2_ADDRESS)
  layer2.updateSeigTxCount = layer2.updateSeigTxCount.plus(ONE_BI)
  
  let transaction = loadTransaction(event)
  let updateSeig = new UpdatedSeigniorage(transaction.id + '#' + layer2.updateSeigTxCount.toString())
  updateSeig.transaction = transaction.id
  updateSeig.timestamp = transaction.timestamp
  updateSeig.lastSeigBlock = event.params.lastSeigBlock_
  updateSeig.increaseSeig = event.params.increaseSeig_
  
  updateSeig.amountOfStaker = event.params.amount_[0]
  updateSeig.amountOfSequencer = event.params.amount_[1]
  updateSeig.amountOfDAO = event.params.amount_[2]
  updateSeig.amountOfStosHolder = event.params.amount_[3]
  updateSeig.layer2 = layer2.id

  updateSeig.save()
  layer2.save()
}