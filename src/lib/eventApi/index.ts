import { getCandidate, handleCandidate } from "./handlers/candidate";
import { handleUser } from "./handlers/user";
import { handleUserStake } from "./handlers/userStake";
import { handleStake } from "./handlers/stake";
import { handleRestake } from "./handlers/restake";
import { handleUnstake } from "./handlers/unstake";
import { handleWithdraw } from "./handlers/withdraw";

export class stakingV1Event<T> {
  private _event: T;

  constructor(event: T) {
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
        return handleUnstake(this._event);
      },
      restake: () => {
        this._handleCommonEvents();
        return handleRestake(this._event);
      },
      withdraw: () => {
        this._handleCommonEvents();
        return handleWithdraw(this._event);
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
  _handleCommonEvents(): void {
    handleCandidate(getCandidate(this._event));
    handleUser(this._event);
    handleUserStake(this._event);
  }
}
