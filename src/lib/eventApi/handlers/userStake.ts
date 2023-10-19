import { UserStaked } from "@/schema";
import { loadTransaction } from "@/utils";
import { getCandidate } from "./candidate";
import { ZERO_BI } from "@/constants";
import { Transactions } from "@/types";

export function handleUserStake(event: Transactions) {
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

export function test(event: Transactions) {
  switch (event) {
  }
}
