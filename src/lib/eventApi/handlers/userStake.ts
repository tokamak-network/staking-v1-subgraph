// import { UserStaked, Candidate } from '../../../../generated/schema';
// import { getCandidate } from "./candidate";
// import { ZERO_BI } from "../../../../constants";
// import { Transactions } from "../../../../types";

// export function handleUserStake(event: Transactions): void {
//   const userId = event.params.depositor.toString();
//   const stakeId = userId
//     .concat("-")
//     .concat(event.params.layer2.toString());
//   let userStaked = UserStaked.load(stakeId);
//   const candidate = getCandidate(event);
//   if (userStaked === null) {
//     userStaked = new UserStaked(stakeId);
//     userStaked.id = stakeId;
//     userStaked.user = userId;
//     userStaked.candidateContract = candidate.id;
//     userStaked.stakedAmount = ZERO_BI;
//     userStaked.pendingWithdrawalAmount = ZERO_BI;
//   }
//   userStaked.stakedAmount = userStaked.stakedAmount.plus(event.params.amount);

//   return userStaked.save();
// }

// // export function test(event: Transactions) {
// //   switch (event) {
// //   }
// // }
