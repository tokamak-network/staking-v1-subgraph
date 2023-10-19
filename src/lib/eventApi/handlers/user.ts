import { User } from "@/schema";
import { loadTransaction } from "@/utils";
import { getCandidate } from "./candidate";
import { ZERO_BI } from "@/constants";
import { Transactions } from "@/types";

//tx update
export function handleUser(event: Transactions) {
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
