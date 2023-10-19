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

export function getCandidate(event: StakedEvent): Candidate {
  const candidate = Candidate.load(event.params.candidateIndex.toString());

  if (candidate !== null) return candidate;

  return new Candidate(event.params.candidateIndex.toString());
}

export function handleCandidate(candidate: Candidate) {
  return candidate.save();
}
