import { IConfirmation } from '../../interface/wallet/confirmation';
import { DappDriver } from '../../session/dapp-driver';

export class Approve implements IConfirmation {
  public url: string | RegExp;
  public title: string;
  private readonly approve: InstanceType<typeof DappDriver.Instance.Extension.pages.Approve>;

  constructor() {
    this.approve = new DappDriver.Instance.Extension.pages.Approve();
    this.url = this.approve.url;
    this.title = this.approve.title;
  }

  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    return await (this.approve[methodName] as Function)(...args);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Approve
   */
  async accept<TPage>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('accept', [page]);
  }
  /**
   *
   *
   * @return {*}  {Promise<any[]>}
   * @memberof Approve
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
   * @memberof Approve
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
   * @memberof Approve
   */
  async switchToWindow<TPage>(nameOrHandle: any, page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('switchToWindow', [nameOrHandle, page]);
  }
}
