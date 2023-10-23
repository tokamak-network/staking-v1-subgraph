import { Candidate } from "../../../../generated/schema";
import { Transactions } from "../../../../types";

export function getCandidate(event: Transactions): Candidate {
  const candidate = Candidate.load(event.params.candidateIndex.toString());

  if (candidate !== null) return candidate;

  return new Candidate(event.params.candidateIndex.toString());
}

export function handleCandidate(candidate: Candidate) {
  return candidate.save();
}
