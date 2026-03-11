import { IPageObject } from '../../interface/page/page-object';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { DappDriver } from '../../session/dapp-driver';

/**
 *
 *
 * @export
 * @class ConfirmTransaction
 * @implements {IConfirmation}
 */
export class ConfirmTransaction implements IConfirmation {
  public url: string | RegExp;
  public title: string;
  private readonly confirmTx: InstanceType<typeof DappDriver.Instance.Extension.pages.ConfirmTransaction>;

  constructor() {
    this.confirmTx = new DappDriver.Instance.Extension.pages.ConfirmTransaction();
    this.url = this.confirmTx.url;
    this.title = this.confirmTx.title;
  }

  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    return await (this.confirmTx[methodName] as Function)(...args);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof ConfirmTransaction
   */
  async accept<TPage>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('accept', [page]);
  }
  /**
   *
   *
   * @return {*}  {Promise<any[]>}
   * @memberof ConfirmTransaction
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
   * @memberof ConfirmTransaction
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
   * @memberof ConfirmTransaction
   */
  async switchToWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('switchToWindow', [page]);
  }
}
