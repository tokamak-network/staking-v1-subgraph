// import { SeigManager } from './../../generated/SeigManager/SeigManager';
// import { 
//   Candidate,
//   Factory,
//   UpdatedSeigniorage
// } from '../../generated/schema'
// import {  ONE_BI, ZERO_BD, ZERO_BI } from '../../utils/constants';
import { AddedSeigAtLayer, Candidate, Factory, User, UserStaked } from '../../generated/schema';
import {
  // UpdatedSeigniorage as UpdatedSeigniorageEvent,
  CoinageCreated as CandidateEvent,
  AddedSeigAtLayer as AddedSeigEvent
} from "../../generated/SeigManager/SeigManager"
import { ZERO_BI, BI_27 } from "../../constants";
import { loadTransaction } from '../../utils';

// import { loadTransaction } from '../../utils';

export function handleAddedSeigAtLayer (event: AddedSeigEvent): void {
  let factory = Factory.load('1');
  if (factory == null) {
    factory = new Factory('1')
    factory.totalStaked = ZERO_BI
    factory.totalPendingWithdrawal = ZERO_BI
    factory.numOfCandidate = ZERO_BI
  } 
  // factory.totalStaked = factory.totalStaked.plus(event.params.amount)

  // event.params.layer2
  let candidate = Candidate.load(event.params.layer2)
  if (candidate === null) candidate = new Candidate(event.params.layer2)
  const numOfStaker = candidate.stakedUserList.length
  const transaction = loadTransaction(event);

  for (let i = 0; i < numOfStaker; i++) {
    const stakedUserId = candidate.stakedUserList[i]
    let stakedUser = UserStaked.load(stakedUserId)
    if (stakedUser === null) stakedUser = new UserStaked(stakedUserId)
    
    const stakedAmount = stakedUser.stakedAmount
    const stakeRate = stakedAmount.times(BI_27).div(candidate.stakedAmount)
    const seigPerUser = stakeRate.times(event.params.seigs).div(BI_27)
    stakedUser.stakedAmount = stakedUser.stakedAmount.plus(seigPerUser)
    const userId = stakedUser.user

    let user = User.load(userId)
    if (user === null) user = new User(userId)
    user.totalStaked= user.totalStaked.plus(seigPerUser)
    user.totalEarnedSeig = user.totalEarnedSeig.plus(seigPerUser)

    stakedUser.save()
    user.save()
  }

  const addedSeig = new AddedSeigAtLayer(transaction.id + '#' + candidate.txCount.toString())
  addedSeig.candidate = event.params.layer2
  addedSeig.layer2 = event.params.layer2
  addedSeig.seigs = event.params.seigs
  addedSeig.operatorSeigs = event.params.operatorSeigs
  addedSeig.transaction = transaction.id
  addedSeig.timestamp = transaction.timestamp;

  candidate.stakedAmount = candidate.stakedAmount.plus(event.params.seigs)

  candidate.save()
  addedSeig.save()
  transaction.save()
}

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