import { IPageObject } from '../../interface/page/page-object';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { DappDriver } from '../../session/dapp-driver';

/**
 *
 *
 * @export
 * @class Connect
 * @implements {IConfirmation}
 */
export class Connect implements IConfirmation {
  public url: string | RegExp;
  public title: string;
  private readonly connect: InstanceType<typeof DappDriver.Instance.Extension.pages.Connect>;

  constructor() {
    this.connect = new DappDriver.Instance.Extension.pages.Connect();
    this.url = this.connect.url;
    this.title = this.connect.title;
  }

  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    return await (this.connect[methodName] as Function)(...args);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Connect
   */
  async accept<TPage>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('accept', [page]);
  }
  /**
   *
   *
   * @return {*}  {Promise<any[]>}
   * @memberof Connect
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
   * @memberof Connect
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
   * @memberof Connect
   */
  async switchToWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('switchToWindow', [page]);
  }
}
