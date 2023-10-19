import { Staked } from "../../../../generated/schema";
import { Process as StakedEvent } from "../../../../generated/DepositManger/DepositManger";
// import {
//   Staked as StakedEvent,
// } from "../../../../generated/candidate";
// import { Staked}
import { loadTransaction } from "../../../../utils";
import { getCandidate } from "./candidate";

//tx update
export function handleWithdraw(event: WithdrawalEvent) {
  const transaction = loadTransaction(event);
  const { txCount, id } = getCandidate(event);
  const stake = new Staked(transaction.id + "#" + txCount.toString());
  stake.transaction = transaction.id;
  stake.timestamp = transaction.timestamp;
  stake.candidate = id;
  stake.amount = event.params.amount;

  return stake.save();
}
