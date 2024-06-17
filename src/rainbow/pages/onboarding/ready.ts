import { PageObject } from '../../../page';

/**
 *
 *
 * @export
 * @class Ready
 * @extends {PageObject}
 */
export class Ready extends PageObject {
  /**
   * Creates an instance of Ready.
   * @memberof Ready
   */
  constructor() {
    super('/popup.html#/ready', 'Rainbow Wallet');
  }
}
