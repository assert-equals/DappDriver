import { IPageObject } from '../../interface/page/page-object';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { DappDriver } from '../../session/dapp-driver';

/**
 *
 *
 * @export
 * @class SignMessage
 * @implements {IConfirmation}
 */
export class SignMessage implements IConfirmation {
  public url: string | RegExp;
  public title: string;
  private readonly signMessage: InstanceType<typeof DappDriver.Instance.Extension.pages.SignMessage>;

  constructor() {
    this.signMessage = new DappDriver.Instance.Extension.pages.SignMessage();
    this.url = this.signMessage.url;
    this.title = this.signMessage.title;
  }

  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    return await (this.signMessage[methodName] as Function)(...args);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignMessage
   */
  async accept<TPage>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('accept', [page]);
  }
  /**
   *
   *
   * @return {*}  {Promise<any[]>}
   * @memberof SignMessage
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
   * @memberof SignMessage
   */
  async reject<TPage>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('reject', [page]);
  }
  /**
   *
   *
   * @template TPage
   * @param {*} nameOrHandle
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignMessage
   */
  async switchToWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('switchToWindow', [page]);
  }
}
