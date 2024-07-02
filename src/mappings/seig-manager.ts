import { AddedSeigAtLayer, Candidate, Factory, User, UserStaked, Layer2Candidate, SeigGiven2 } from '../../generated/schema';
import {
  // UpdatedSeigniorage as UpdatedSeigniorageEvent,
  CoinageCreated as CandidateEvent,
  AddedSeigAtLayer as AddedSeigEvent,
  CommissionRateSet as CommissionRateEvent,
  SeigGiven2 as SeigGivenEvent
} from "../../generated/SeigManager/SeigManager"
import { ZERO_BI, BI_27, ONE_BD, ZERO_BD } from "../../constants";
import { loadTransaction } from '../../utils';
import { updateDailyStakingData } from '../../utils/intervalUpdates';
import { FIVE_BI, seigmanagerContract } from '../../utils/constants';
import { Address } from "@graphprotocol/graph-ts"

// import { loadTransaction } from '../../utils';

export function handlerCommissionRateSet (event: CommissionRateEvent): void {
  let candidate = Candidate.load(event.params.layer2.toHexString())
  if (candidate === null) candidate = new Candidate(event.params.layer2.toHexString())
  
  candidate.commissionRate = event.params.newRate
  candidate.save()
}

export function handleAddedSeigAtLayer (event: AddedSeigEvent): void {
  let factory = Factory.load('1');
  if (factory == null) {
    factory = new Factory('1')
  } 
  factory.totalStaked = factory.totalStaked.plus(event.params.seigs)

  // event.params.layer2
  let candidate = Candidate.load(event.params.layer2.toHexString())
  if (candidate === null) candidate = new Candidate(event.params.layer2.toHexString())
  const numOfStaker = candidate.stakedUserList.length
  const transaction = loadTransaction(event);

  for (let i = 0; i < numOfStaker; i++) {
    const stakedUserId = candidate.stakedUserList[i]
    let stakedUser = UserStaked.load(stakedUserId)
    if (stakedUser === null) stakedUser = new UserStaked(stakedUserId)
    const minimumAmount = FIVE_BI.times(BI_27)
    const stakedAmount = stakedUser.stakedAmount
    
    const stakeRate = stakedAmount.times(BI_27).div(candidate.stakedAmount)
    const seigPerUser = stakeRate.times(event.params.seigs).div(BI_27)
    stakedUser.stakedAmount = stakedUser.stakedAmount.plus(seigPerUser)
    const userId = stakedUser.user
    // if (stakedUser.stakeOf.gt(minimumAmount)) {
      stakedUser.stakeOf = seigmanagerContract.stakeOf(Address.fromString(stakedUser.candidate), Address.fromString(userId))
    // }
    let user = User.load(userId)
    if (user === null) user = new User(userId)
    user.totalStaked= user.totalStaked.plus(seigPerUser)
    user.totalEarnedSeig = user.totalEarnedSeig.plus(seigPerUser)

    stakedUser.save()
    user.save()
  }

  const addedSeig = new AddedSeigAtLayer(transaction.id + '#' + candidate.txCount.toString())
  addedSeig.candidate = event.params.layer2.toHexString()
  addedSeig.layer2 = event.params.layer2
  addedSeig.seigs = event.params.seigs
  addedSeig.operatorSeigs = event.params.operatorSeigs
  addedSeig.transaction = transaction.id
  addedSeig.timestamp = transaction.timestamp;
  addedSeig.prevTotalSupply = event.params.prevTotalSupply
  addedSeig.nextTotalSupply = event.params.nextTotalSupply

  candidate.stakedAmount = candidate.stakedAmount.plus(event.params.seigs)
  candidate.prevTotalSupply = event.params.prevTotalSupply
  candidate.nextTotalSupply = event.params.nextTotalSupply
  candidate.seigs = event.params.seigs
  
  factory.save()
  updateDailyStakingData(event)
  candidate.save()
  addedSeig.save()
  transaction.save()
}

export function handleSeigGiven (event: SeigGivenEvent): void {
  const l2Id = event.params.layer2.toHexString()
  let l2Candidate = Layer2Candidate.load(l2Id)
  if (l2Candidate === null) l2Candidate = new Layer2Candidate(l2Id)
  
  const transaction = loadTransaction(event);
  // const seigGivenId = l2Candidate.id + '#' + (l2Candidate.txCount.plus(ONE_BD)).toString()
  const seigGiven = new SeigGiven2(transaction.id)
  
  seigGiven.layer2 = event.params.layer2
  seigGiven.layer2Candidate = l2Candidate.id
  seigGiven.totalSeig = event.params.totalSeig
  seigGiven.stakedSeig = event.params.stakedSeig
  seigGiven.unstakedSeig = event.params.unstakedSeig
  seigGiven.powertonSeig = event.params.powertonSeig
  seigGiven.pseig = event.params.pseig
  seigGiven.l2TotalSeigs = event.params.l2TotalSeigs
  seigGiven.layer2Seigs = event.params.layer2Seigs
  seigGiven.blockTimestamp = transaction.timestamp
  seigGiven.transaction = transaction.id
  
  l2Candidate.save()
  seigGiven.save() 
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