import { Staked, Unstaked } from "@/schema";
import { loadTransaction } from "@/utils";
import { getCandidate } from "./candidate";
import { Transactions } from "@/types";
import { Unstaked as UnstakedEvent } from "@/candidate";

//tx update
export function handleUnstake(event: UnstakedEvent) {
  const candidate = getCandidate(event);
  const transaction = loadTransaction(event);
  const unstake = new Unstaked(
    transaction.id + "#" + candidate.txCount.toString()
  );
  unstake.transaction = transaction.id;
  unstake.timestamp = transaction.timestamp;
  unstake.candidate = candidate.id;
  unstake.amount = event.params.amount;

  return unstake.save();
}

// export function handleUnstaked(event: UnstakedEvent): void {
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
