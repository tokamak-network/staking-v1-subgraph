// import { SeigManager } from './../../generated/SeigManager/SeigManager';
// import { 
//   Candidate,
//   Factory,
//   UpdatedSeigniorage
// } from '../../generated/schema'
// import {  ONE_BI, ZERO_BD, ZERO_BI } from '../../utils/constants';
import {
  // UpdatedSeigniorage as UpdatedSeigniorageEvent,
  CoinageCreated as CandidateEvent,
} from "../../generated/SeigManager/SeigManager"
// import { loadTransaction } from '../../utils';

export function handleCoinageCreated (event: CandidateEvent): void {
  // let factory = Factory.load('1')
  // if (factory == null) {
  //   factory = new Factory('1')

  //   factory.totalStaked = ZERO_BI
  //   factory.totalPendingWithdrawal = ZERO_BI

  // }

  // factory.numOfCandidate = factory.numOfCandidate.plus(ONE_BI)
  // factory.save()
}

// export function handleUpdatedSeigniorage (event: UpdatedSeigniorageEvent): void {
//   let factory = Factory.load('1')
  // if (factory === null) factory = new Factory(factory_ADDRESS)
  
  // let transaction = loadTransaction(event)
  // let updateSeig = new UpdatedSeigniorage(transaction.id + '#' + factory.updateSeigTxCount.toString())
  // updateSeig.transaction = transaction.id
  // updateSeig.timestamp = transaction.timestamp
  // updateSeig.lastSeigBlock = event.params.lastSeigBlock_
  // updateSeig.increaseSeig = event.params.increaseSeig_
  
  // updateSeig.amountOfStaker = event.params.amount_[0]
  // updateSeig.amountOfSequencer = event.params.amount_[1]
  // updateSeig.amountOfDAO = event.params.amount_[2]
  // updateSeig.amountOfStosHolder = event.params.amount_[3]
  // updateSeig.factory = factory.id

  // updateSeig.save()
  // factory.save()
// }