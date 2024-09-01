import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { SignatureRequest as MetaMaskSignatureRequest } from '../../metamask';
import { SignatureRequest as RainbowSignatureRequest } from '../../rainbow';
import { DappDriver } from '../../session/dapp-driver';
import { SignatureRequest as ZerionSignatureRequest } from '../../zerion';

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
  private signatureRequest: MetaMaskSignatureRequest | RainbowSignatureRequest | ZerionSignatureRequest;

  constructor() {
    switch (DappDriver.Instance.Wallet) {
      case METAMASK:
      case METAMASK_FLASK:
        this.signatureRequest = new MetaMaskSignatureRequest();
        break;
      case RAINBOW:
        this.signatureRequest = new RainbowSignatureRequest();
        break;
      case ZERION:
        this.signatureRequest = new ZerionSignatureRequest();
        break;
    }
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
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SignatureRequest
   */
  accept(): Promise<void>;
  accept<TPage>(page: new () => TPage): Promise<TPage>;
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('accept', [page]);
    } else {
      return await this.callIfMethodExists('accept');
    }
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
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SignatureRequest
   */
  reject(): Promise<void>;
  reject<TPage>(page: new () => TPage): Promise<TPage>;
  async reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('reject', [page]);
    } else {
      return await this.callIfMethodExists('reject');
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SignatureRequest
   */
  switchToMainWindow(): Promise<void>;
  switchToMainWindow<TPage>(page: new () => TPage): Promise<TPage>;
  async switchToMainWindow<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('switchToMainWindow', [page]);
    } else {
      return await this.callIfMethodExists('switchToMainWindow');
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {*} nameOrHandle
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SignatureRequest
   */
  switchToWindow(nameOrHandle: any): Promise<void>;
  switchToWindow<TPage>(nameOrHandle: any, page: new () => TPage): Promise<TPage>;
  async switchToWindow<TPage>(nameOrHandle: any, page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('switchToWindow', [nameOrHandle, page]);
    } else {
      return await this.callIfMethodExists('switchToWindow', [nameOrHandle]);
    }
  }
}
