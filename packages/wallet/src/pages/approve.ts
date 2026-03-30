import { DappDriver, IConfirmation, IPageObject } from '@assert-equals/dappdriver';

export class Approve implements IConfirmation {
  public url: string | RegExp;
  public title: string;
  private readonly approve: IConfirmation;

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
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Approve
   */
  async switchToWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('switchToWindow', [page]);
  }
}
