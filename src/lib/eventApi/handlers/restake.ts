import { Staked } from "@/schema";
import { loadTransaction } from "@/utils";
import { getCandidate } from "./candidate";
import { Transactions } from "@/types";

//tx update
export function handleRestake(event: Transactions) {
  const transaction = loadTransaction(event);
  const { txCount, id } = getCandidate(event);
  const stake = new Staked(transaction.id + "#" + txCount.toString());
  stake.transaction = transaction.id;
  stake.timestamp = transaction.timestamp;
  stake.candidate = id;
  stake.amount = event.params.amount;

  return stake.save();
}
