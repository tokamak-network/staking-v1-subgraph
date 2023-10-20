import { User } from "@/schema";
import { getCandidate } from "./candidate";
import { ZERO_BI } from "@/constants";
import { Transactions } from "@/types";

//tx update
export function handleUser(event: Transactions): void {
  let user = User.load(event.params.depositor.toString());

  if (user === null) {
    user = new User(event.params.depositor.toString());
    user.id = event.params.depositor.toString();
    user.totalStaked = ZERO_BI;
    user.pendingWithdrawalAmount = ZERO_BI;
  }

  user.totalStaked = user.totalStaked.plus(event.params.amount);

  return user.save();
}
