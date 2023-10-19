import {
  Restaked as RestakedEvent,
  Staked as StakedEvent,
  Unstaked as UnstakedEvent,
  Withdrawal as WithdrawalEvent,
} from "@/generated/Candidate/Candidate";
import { handleCandidate } from "./handlers/candidate";
import { handleLayer2 } from "./handlers/layer2";
import { handleUser } from "./handlers/user";
import { handleUserStake } from "./handlers/userStake";
import { handleStake } from "./handlers/stake";

export class stakingV1Event {
  private _event: StakedEvent;

  constructor(event: StakedEvent) {
    this._event = event;
  }

  get handleEvent() {
    return {
      /**
       * @description save each event when it's happened
       * @function handleEvent.stake()
       * @function handleEvent.unstake()
       * @function handleEvent.restake()
       * @function handleEvent.withdraw()
       *
       */
      stake: () => {
        this._handleCommonEvents();
        return handleStake(this._event);
      },
      unstake: () => {
        this._handleCommonEvents();
        return handleStake(this._event);
      },
      restake: () => {
        this._handleCommonEvents();
        return handleStake(this._event);
      },
      withdraw: () => {
        this._handleCommonEvents();
        return handleStake(this._event);
      },
    };
  }

  /**
   * @description save those common fields in every case
   * @function handleLayer2()
   * @function handleCandidate()
   * @function handleUser()
   * @function handleUserStake()
   */
  _handleCommonEvents() {
    handleLayer2(this._event);
    handleCandidate(this._event);
    handleUser(this._event);
    handleUserStake(this._event);
  }
}
