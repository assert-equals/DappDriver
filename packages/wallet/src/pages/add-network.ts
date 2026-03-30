import { DappDriver, IConfirmation, IPageObject } from '@assert-equals/dappdriver';

/**
 *
 *
 * @export
 * @class AddNetwork
 * @implements {IConfirmation}
 */
export class AddNetwork implements IConfirmation {
  public url: string | RegExp;
  public title: string;
  private readonly addNetwork: IConfirmation;

  constructor() {
    this.addNetwork = new DappDriver.Instance.Extension.pages.AddNetwork();
    this.url = this.addNetwork.url;
    this.title = this.addNetwork.title;
  }

  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    return await (this.addNetwork[methodName] as Function)(...args);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof AddNetwork
   */
  async accept<TPage>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('accept', [page]);
  }
  /**
   *
   *
   * @return {*}  {Promise<any[]>}
   * @memberof AddNetwork
   */
  async getAllWindowHandles(): Promise<any[]> {
    return await this.callIfMethodExists('getAllWindowHandles');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof AddNetwork
   */
  async reject<TPage>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('reject', [page]);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof AddNetwork
   */
  async switchToWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('switchToWindow', [page]);
  }
}
