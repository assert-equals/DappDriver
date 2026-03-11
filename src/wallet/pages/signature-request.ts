import { IPageObject } from '../../interface/page/page-object';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { DappDriver } from '../../session/dapp-driver';

/**
 *
 *
 * @export
 * @class SignatureRequest
 * @implements {IConfirmation}
 */
export class SignatureRequest implements IConfirmation {
  public url: string | RegExp;
  public title: string;
  private readonly signatureRequest: InstanceType<typeof DappDriver.Instance.Extension.pages.SignatureRequest>;

  constructor() {
    this.signatureRequest = new DappDriver.Instance.Extension.pages.SignatureRequest();
    this.url = this.signatureRequest.url;
    this.title = this.signatureRequest.title;
  }
  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    return await (this.signatureRequest[methodName] as Function)(...args);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignatureRequest
   */
  async accept<TPage>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('accept', [page]);
  }
  /**
   *
   *
   * @return {*}  {Promise<any[]>}
   * @memberof SignatureRequest
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
   * @memberof SignatureRequest
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
   * @memberof SignatureRequest
   */
  async switchToWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage> {
    return await this.callIfMethodExists('switchToWindow', [page]);
  }
}
