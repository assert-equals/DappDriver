import { PageObject } from '../../../page';
import { DappDriver } from '../../../session/dapp-driver';
/**
 *
 *
 * @export
 * @class Home
 * @extends {PageObject}
 */
export class Home extends PageObject {
  public static expandViewUrl: () => string = () => DappDriver.Instance.Extension + '/home.html';
  /**
   * Creates an instance of Home.
   * @memberof Home
   */
  constructor() {
    super('/home.html', 'MetaMask');
  }
}
