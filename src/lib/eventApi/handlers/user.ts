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
import { ZERO_BI } from "@/constants";

//tx update
export function handleUser(event: StakedEvent) {
  let user = User.load(event.params.sender.toString());

  if (user === null) {
    user = new User(event.params.sender.toString());
    user.id = event.params.sender.toString();
    user.totalStaked = ZERO_BI;
    user.userLton = ZERO_BI;
    user.pendingWithdrawalAmount = ZERO_BI;
  }

  user.totalStaked = user.totalStaked.plus(event.params.amount);

  return user.save();
}
