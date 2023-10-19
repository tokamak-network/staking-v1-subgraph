import {
  Candidate,
  User,
  Layer2,
  UserStaked,
  Staked,
  Restaked,
  Withdrawal,
  Unstaked,
} from "@/schema";
import {
  Restaked as RestakedEvent,
  Staked as StakedEvent,
  Unstaked as UnstakedEvent,
  Withdrawal as WithdrawalEvent,
} from "@/candidate";
import { loadTransaction } from "@/utils";
import { getCandidate } from "./candidate";

//tx update
export function handleUnstake(event: StakedEvent) {
  const transaction = loadTransaction(event);
  const { txCount, id } = getCandidate(event);
  const stake = new Staked(transaction.id + "#" + txCount.toString());
  stake.transaction = transaction.id;
  stake.timestamp = transaction.timestamp;
  stake.candidate = id;
  stake.amount = event.params.amount;

  return stake.save();
}
