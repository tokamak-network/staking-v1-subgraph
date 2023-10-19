import { 
  Deposited as StakedEvent,
  WithdrawalProcessed as WithdrawalEvent,
  WithdrawalRequested as UnstakedEvent,
  Deposited as RestakedEvent,
 } from '../generated/DepositManager/DepositManager';


export type Transactions =
  | StakedEvent
  | UnstakedEvent
  | RestakedEvent
  | WithdrawalEvent;
