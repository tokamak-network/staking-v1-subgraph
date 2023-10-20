// import { Staked } from "@/generated/schema";
// import { loadTransaction } from "@/utils";
// import { getCandidate } from "./candidate";
// import { Transactions } from "@/types";

// //tx update
// export function handleRestake(event: Transactions): void {
//   const transaction = loadTransaction(event);
//   const candidate = getCandidate(event);
//   const stake = new Staked(transaction.id + "#" + candidate.txCount.toString());
//   stake.transaction = transaction.id;
//   stake.timestamp = transaction.timestamp;
//   stake.candidate = candidate.id;
//   stake.amount = event.params.amount;

//   return stake.save();
// }
