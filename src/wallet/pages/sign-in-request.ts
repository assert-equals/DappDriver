import { IPageObject } from '../../interface/page/page-object';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { DappDriver } from '../../session/dapp-driver';

/**
 *
 *
 * @export
 * @class SignInRequest
 * @implements {IConfirmation}
 */
export class SignInRequest implements IConfirmation {
  public url: string | RegExp;
  public title: string;
  private readonly signInRequest: InstanceType<typeof DappDriver.Instance.Extension.pages.SignInRequest>;

  constructor() {
    this.signInRequest = new DappDriver.Instance.Extension.pages.SignInRequest();
    this.url = this.signInRequest.url;
    this.title = this.signInRequest.title;
  }

  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    return await (this.signInRequest[methodName] as Function)(...args);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignInRequest
   */
  async accept<TPage>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('accept', [page]);
  }
  /**
   *
   *
   * @return {*}  {Promise<any[]>}
   * @memberof SignInRequest
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
   * @memberof SignInRequest
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
   * @memberof SignInRequest
   */
  async switchToWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('switchToWindow', [page]);
  }
}
