import { HTMLElement } from '../../../controls/html-element';
import { PageObject } from '../../../page';
import { BackUp } from './backup';

/**
 *
 *
 * @export
 * @class Create
 * @extends {PageObject}
 */
export class Create extends PageObject {
  private get createButton(): HTMLElement {
    return new HTMLElement('xpath=//button[contains(., "Create")]');
  }
  /**
   * Creates an instance of Create.
   * @memberof Create
   */
  constructor() {
    super('onboarding#/onboarding/create', 'Zerion');
  }
  /**
   *
   *
   * @return {*}  {Promise<BackUp>}
   * @memberof Create
   */
  async create(): Promise<BackUp> {
    return await this.createButton.click<BackUp>(BackUp);
  }
}
