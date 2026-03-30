import { PageObject } from '@assert-equals/dappdriver';

/**
 *
 *
 * @export
 * @class SidePanel
 * @extends {PageObject}
 */
export class SidePanel extends PageObject {
  /**
   * Creates an instance of SidePanel.
   * @memberof SidePanel
   */
  constructor() {
    super('/sidepanel.html', 'MetaMask');
  }
}
