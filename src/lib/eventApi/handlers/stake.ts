import {
  Candidate,
  User,
  UserStaked,
  Staked,
  Restaked,
  Withdrawal,
  Unstaked,
} from "../../../../generated/schema";
import { Deposited as StakedEvent } from "../../../../generated/DepositManger/DepositManger";
import { loadTransaction } from "../../../../utils";
import { getCandidate } from "./candidate";
import { handleUser } from './user';
import { handleUserStake } from './userStake';

//tx update
export function handleStake(event: StakedEvent): void {
  const transaction = loadTransaction(event);
  const candidate = getCandidate(event);
  const stake = new Staked(transaction.id + "#" + candidate.txCount.toString());
  stake.transaction = transaction.id;
  stake.timestamp = transaction.timestamp;
  stake.candidate = candidate.id;
  stake.amount = event.params.amount;

  handleUser(event)
  handleUserStake(event)

  return stake.save();
}
