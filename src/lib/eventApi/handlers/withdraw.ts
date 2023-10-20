import { Withdrawal } from "../../../../generated/schema";
import { WithdrawalProcessed as WithdrawalEvent } from "../../../../generated/DepositManger/DepositManger";
// import {
//   Staked as StakedEvent,
// } from "../../../../generated/candidate";
// import { Staked}
import { loadTransaction } from "../../../../utils";
// import { getCandidate } from "./candidate";

//tx update
export function handleWithdraw(event: WithdrawalEvent): void {
  // const transaction = loadTransaction(event);
  // const candidate = getCandidate(event);
  // const withdrawal = new Withdrawal(transaction.id + "#" + candidate.txCount.toString());
  // withdrawal.transaction = transaction.id;
  // withdrawal.timestamp = transaction.timestamp;
  // withdrawal.candidate = candidate.id;
  // withdrawal.amount = event.params.amount;
  
  // return withdrawal.save();
}
