import { Candidate } from "@/schema";
import { Transactions } from "@/types";

export function getCandidate(event: Transactions): Candidate {
  const candidate = Candidate.load(event.params.layer2);

  if (candidate !== null) return candidate;

  return new Candidate(event.params.layer2);
}

export function handleCandidate(candidate: Candidate): void {
  return candidate.save();
}
