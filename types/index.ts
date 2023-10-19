import {
  Restaked as RestakedEvent,
  Staked as StakedEvent,
  Unstaked as UnstakedEvent,
  Withdrawal as WithdrawalEvent,
} from "@/candidate";

export type Transactions =
  | StakedEvent
  | UnstakedEvent
  | RestakedEvent
  | WithdrawalEvent;
