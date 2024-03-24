import { ConfirmTransaction } from '.';
/**
 *
 *
 * @export
 * @class Approve
 * @extends {ConfirmTransaction}
 */
export class Approve extends ConfirmTransaction {
  /**
   * Creates an instance of Approve.
   * @memberof Approve
   */
  constructor() {
    super(new RegExp(/#confirm-transaction\/.*\/approve/), 'MetaMask');
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof Approve
   */
  next(): Promise<void> {
    return this.nextButton().clickAndWait();
  }
}
