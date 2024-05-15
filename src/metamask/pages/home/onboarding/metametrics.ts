import { HTMLElement } from '../../../../controls/html-element';
import { PageObject } from '../../../../page';
/**
 *
 *
 * @export
 * @class Metametrics
 * @extends {PageObject}
 */
export class Metametrics extends PageObject {
  private iAgreeButton: () => HTMLElement = () => new HTMLElement('[data-testid="metametrics-i-agree"]');
  private noThanksButton: () => HTMLElement = () => new HTMLElement('[data-testid="metametrics-no-thanks"]');
  /**
   * Creates an instance of Metametrics.
   * @memberof Metametrics
   */
  constructor() {
    super('/home.html#onboarding/metametrics', 'MetaMask');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Metametrics
   */
  iAgree<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.iAgreeButton().clickAndRedirectsTo<TPage>(page);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Metametrics
   */
  noThanks<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.noThanksButton().clickAndRedirectsTo<TPage>(page);
  }
}
