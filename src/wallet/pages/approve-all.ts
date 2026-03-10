import { IConfirmation } from '../../interface/wallet/confirmation';
import { DappDriver } from '../../session/dapp-driver';

/**
 *
 *
 * @export
 * @class ApproveAll
 * @implements {IConfirmation}
 */
export class ApproveAll implements IConfirmation {
  public url: string | RegExp;
  public title: string;
  private readonly approveAll: InstanceType<typeof DappDriver.Instance.Extension.pages.ApproveAll>;

  constructor() {
    this.approveAll = new DappDriver.Instance.Extension.pages.ApproveAll();
    this.url = this.approveAll.url;
    this.title = this.approveAll.title;
  }
  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    return await (this.approveAll[methodName] as Function)(...args);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof ApproveAll
   */
  async accept<TPage>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('accept', [page]);
  }
  /**
   *
   *
   * @return {*}  {Promise<any[]>}
   * @memberof ApproveAll
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
   * @memberof ApproveAll
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
   * @memberof ApproveAll
   */
  async switchToWindow<TPage>(nameOrHandle: any, page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('switchToWindow', [nameOrHandle, page]);
  }
}
