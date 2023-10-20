import { 
  Deposited ,
  WithdrawalProcessed,
  WithdrawalRequested,
 } from '../generated/DepositManager/DepositManager';

export type Transactions =
  Deposited |
  WithdrawalProcessed |
  WithdrawalRequested 
