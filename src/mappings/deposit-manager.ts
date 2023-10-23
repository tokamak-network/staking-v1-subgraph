import {
  Deposited as RestakedEvent,
  Deposited as StakedEvent,
  WithdrawalRequested as UnstakedEvent,
  WithdrawalProcessed as WithdrawalEvent,
} from "../../generated/DepositManager/DepositManager";
import { stakingV1Event } from "../lib/eventApi/index";

export function handleStaked(event: StakedEvent): void {
  const handler = new stakingV1Event(event);
  return handler.handleEvent.stake();
}

export function handleUnstaked(event: UnstakedEvent): void {
  const handler = new stakingV1Event(event);
  return handler.handleEvent.unstake();
}

export function handleRestaked(event: RestakedEvent): void {
  const handler = new stakingV1Event(event);
  return handler.handleEvent.restake();
}

export function handleWithdrawal(event: WithdrawalEvent): void {
  const handler = new stakingV1Event(event);
  return handler.handleEvent.withdraw();
}

// export function handleRestaked(event: RestakedEvent): void {
//   // load each entity
//   let candidate = Candidate.load(event.params.candidateIndex.toString());
//   // factory update
//   let layer2 = Layer2.load(LAYER2_ADDRESS);
//   if (layer2 === null) layer2 = new Layer2(LAYER2_ADDRESS);
//   layer2.stakingTxCount = layer2.stakingTxCount.plus(ONE_BI);
//   layer2.totalStakedTON = layer2.totalStakedTON.plus(event.params.amount);

//   if (candidate == null)
//     candidate = new Candidate(event.params.candidateIndex.toString());
//   let txCount = candidate.txCount;
//   let stakedAmount = candidate.stakedAmount;
//   let pendingWithdrawal = candidate.pendingWithdrawalAmount;
//   txCount = txCount.plus(ONE_BI);
//   stakedAmount = stakedAmount.plus(event.params.amount);
//   pendingWithdrawal = pendingWithdrawal.minus(event.params.amount);

//   // tx update
//   let transaction = loadTransaction(event);
//   let restake = new Restaked(
//     transaction.id + "#" + candidate.txCount.toString()
//   );
//   restake.transaction = transaction.id;
//   restake.timestamp = transaction.timestamp;
//   restake.candidate = candidate.id;
//   restake.amount = event.params.amount;
//   restake.lton = event.params.lton;
//   // restake.operatorIndex = _index

//   // user update: staked amount + , pending -
//   let user = User.load(event.params.sender.toString());
//   if (user === null) {
//     user = new User(event.params.sender.toString());
//     user.id = event.params.sender.toString();
//     user.totalStaked = ZERO_BI;
//     user.pendingWithdrawalAmount = ZERO_BI;
//   }
//   user.totalStaked = user.totalStaked.plus(event.params.amount);
//   user.pendingWithdrawalAmount = user.pendingWithdrawalAmount.minus(
//     event.params.amount
//   );

//   // staked data update
//   let restakeid = user.id
//     .toString()
//     .concat("-")
//     .concat(event.params.candidateIndex.toString());
//   let userStaked = UserStaked.load(restakeid);
//   if (userStaked === null) {
//     userStaked = new UserStaked(restakeid);
//     userStaked.id = restakeid;
//     userStaked.user = user.id;
//     userStaked.candidateIndex = candidate.id;
//     userStaked.stakedAmount = ZERO_BI;
//     userStaked.pendingWithdrawalAmount = ZERO_BI;
//   }
//   userStaked.stakedAmount = userStaked.stakedAmount.plus(event.params.amount);
//   userStaked.pendingWithdrawalAmount = userStaked.pendingWithdrawalAmount.minus(
//     event.params.amount
//   );

//   layer2.save();
//   candidate.save();

//   user.save();
//   userStaked.save();
//   restake.save();
// }

// export function handleUnstaked(event: UnstakedEvent): void {
//   // load each entity
//   let candidate = Candidate.load(event.params.candidateIndex.toString());
//   // factory update
//   let layer2 = Layer2.load(LAYER2_ADDRESS);
//   if (layer2 === null) layer2 = new Layer2(LAYER2_ADDRESS);
//   layer2.stakingTxCount = layer2.stakingTxCount.plus(ONE_BI);
//   layer2.totalStakedTON = layer2.totalStakedTON.minus(event.params.amount);

//   if (candidate == null)
//     candidate = new Candidate(event.params.candidateIndex.toString());
//   let txCount = candidate.txCount;
//   let stakedAmount = candidate.stakedAmount;
//   let pendingWithdrawal = candidate.pendingWithdrawalAmount;
//   txCount = txCount.plus(ONE_BI);
//   stakedAmount = stakedAmount.minus(event.params.amount);
//   pendingWithdrawal = pendingWithdrawal.plus(event.params.amount);

//   candidate.txCount = candidate.txCount.plus(ONE_BI);
//   candidate.stakedAmount = candidate.stakedAmount.minus(event.params.amount);

//   // tx update
//   let transaction = loadTransaction(event);
//   let unstake = new Unstaked(
//     transaction.id + "#" + candidate.txCount.toString()
//   );
//   unstake.transaction = transaction.id;
//   unstake.timestamp = transaction.timestamp;
//   unstake.candidate = candidate.id;
//   unstake.amount = event.params.amount;

//   // user update staked -, pending +
//   let user = User.load(event.params.sender.toString());
//   if (user === null) {
//     user = new User(event.params.sender.toString());
//     user.id = event.params.sender.toString();
//     user.totalStaked = ZERO_BI;
//     user.pendingWithdrawalAmount = ZERO_BI;
//   }
//   user.totalStaked = user.totalStaked.minus(event.params.amount);
//   user.pendingWithdrawalAmount = user.pendingWithdrawalAmount.plus(
//     event.params.amount
//   );

//   // staked data update
//   let unstakeid = user.id
//     .toString()
//     .concat("-")
//     .concat(event.params.candidateIndex.toString());
//   let userStaked = UserStaked.load(unstakeid);
//   if (userStaked === null) {
//     userStaked = new UserStaked(unstakeid);
//     userStaked.id = unstakeid;
//     userStaked.user = user.id;
//     userStaked.candidateIndex = candidate.id;
//     userStaked.stakedAmount = ZERO_BI;
//     userStaked.pendingWithdrawalAmount = ZERO_BI;
//   }
//   userStaked.stakedAmount = userStaked.stakedAmount.minus(event.params.amount);
//   userStaked.pendingWithdrawalAmount = userStaked.pendingWithdrawalAmount.plus(
//     event.params.amount
//   );

//   layer2.save();
//   candidate.save();

//   user.save();
//   userStaked.save();
//   unstake.save();
// }

// export function handleWithdrawal(event: WithdrawalEvent): void {
//   // load each entity
//   let candidate = Candidate.load(event.params.candidateIndex.toString());
//   // factory update
//   let layer2 = Layer2.load(LAYER2_ADDRESS);
//   if (layer2 === null) layer2 = new Layer2(LAYER2_ADDRESS);
//   layer2.stakingTxCount = layer2.stakingTxCount.plus(ONE_BI);
//   layer2.totalStakedTON = layer2.totalStakedTON.minus(event.params.amount);

//   if (candidate == null)
//     candidate = new Candidate(event.params.candidateIndex.toString());
//   let txCount = candidate.txCount;
//   let pendingWithdrawal = candidate.pendingWithdrawalAmount;
//   txCount = txCount.plus(ONE_BI);
//   pendingWithdrawal = pendingWithdrawal.minus(event.params.amount);
//   // sequencer or candidate update

//   // tx update
//   let transaction = loadTransaction(event);
//   let withdraw = new Withdrawal(
//     transaction.id + "#" + candidate.txCount.toString()
//   );
//   withdraw.transaction = transaction.id;
//   withdraw.timestamp = transaction.timestamp;
//   withdraw.candidate = candidate.id;
//   withdraw.amount = event.params.amount;

//   // user update staked -, pending +
//   let user = User.load(event.params.sender.toString());
//   if (user === null) {
//     user = new User(event.params.sender.toString());
//     user.id = event.params.sender.toString();
//     user.totalStaked = ZERO_BI;
//     user.userLton = ZERO_BI;
//     user.totalDeposited = ZERO_BI;
//     user.pendingWithdrawalAmount = ZERO_BI;
//   }
//   user.pendingWithdrawalAmount = user.pendingWithdrawalAmount.minus(
//     event.params.amount
//   );

//   // staked data update
//   let unstakeid = user.id
//     .toString()
//     .concat("-")
//     .concat(event.params.candidateIndex.toString());
//   let userStaked = UserStaked.load(unstakeid);
//   if (userStaked === null) {
//     userStaked = new UserStaked(unstakeid);
//     userStaked.id = unstakeid;
//     userStaked.user = user.id;
//     userStaked.candidateIndex = candidate.id;
//     userStaked.stakedAmount = ZERO_BI;
//     userStaked.pendingWithdrawalAmount = ZERO_BI;
//   }
//   userStaked.pendingWithdrawalAmount = userStaked.pendingWithdrawalAmount.minus(
//     event.params.amount
//   );

//   layer2.save();
//   candidate.save();

//   user.save();
//   userStaked.save();
//   withdraw.save();
// }
