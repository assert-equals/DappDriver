import { PageObject } from '../../../page';
/**
 *
 *
 * @export
 * @class Success
 * @extends {PageObject}
 */
export class Success extends PageObject {
  /**
   * Creates an instance of Success.
   * @memberof Success
   */
  constructor() {
    super('html?templateType=tab&context=onboarding#/onboarding/success', 'Zerion');
  }
}
