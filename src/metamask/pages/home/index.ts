import { PageObject } from '../../../page';

/**
 *
 *
 * @export
 * @class Home
 * @extends {PageObject}
 */
export class Home extends PageObject {
  /**
   * Creates an instance of Home.
   * @memberof Home
   */
  constructor() {
    super('/home.html', 'MetaMask');
  }
}
