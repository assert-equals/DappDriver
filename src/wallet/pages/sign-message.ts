import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { SignMessage as MetaMaskSignMessage } from '../../metamask';
import { SignMessage as RainbowSignMessage } from '../../rainbow';
import { DappDriver } from '../../session/dapp-driver';
import { SignMessage as ZerionSignMessage } from '../../zerion';

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
  private signMessage: MetaMaskSignMessage | RainbowSignMessage | ZerionSignMessage;

  constructor() {
    switch (DappDriver.Instance.Wallet) {
      case METAMASK:
      case METAMASK_FLASK:
        this.signMessage = new MetaMaskSignMessage();
        break;
      case RAINBOW:
        this.signMessage = new RainbowSignMessage();
        break;
      case ZERION:
        this.signMessage = new ZerionSignMessage();
        break;
    }
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
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof SignMessage
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
   * @memberof SignMessage
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
   * @memberof SignMessage
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
   * @memberof SignMessage
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
   * @memberof SignMessage
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
