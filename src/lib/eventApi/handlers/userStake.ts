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

export function handleUserStake(event: StakedEvent) {
  const userId = event.params.sender.toString();
  const stakeId = userId
    .concat("-")
    .concat(event.params.candidateIndex.toString());
  let userStaked = UserStaked.load(stakeId);
  const { id: candidateId } = getCandidate(event);
  if (userStaked === null) {
    userStaked = new UserStaked(stakeId);
    userStaked.id = stakeId;
    userStaked.user = userId;
    userStaked.candidateIndex = candidateId;
    userStaked.stakedAmount = ZERO_BI;
    userStaked.pendingWithdrawalAmount = ZERO_BI;
  }
  userStaked.stakedAmount = userStaked.stakedAmount.plus(event.params.amount);

  return userStaked.save();
}
