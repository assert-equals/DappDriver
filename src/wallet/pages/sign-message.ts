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
  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    let signMessage: MetaMaskSignMessage | RainbowSignMessage | ZerionSignMessage;
    switch (DappDriver.Instance.Wallet) {
      case METAMASK:
      case METAMASK_FLASK:
        signMessage = new MetaMaskSignMessage();
        break;
      case RAINBOW:
        signMessage = new RainbowSignMessage();
        break;
      case ZERION:
        signMessage = new ZerionSignMessage();
        break;
    }
    return await (signMessage[methodName] as Function)(...args);
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
  accept<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.callIfMethodExists('accept', [page]);
    } else {
      return this.callIfMethodExists('accept');
    }
  }
  /**
   *
   *
   * @return {*}  {Promise<any[]>}
   * @memberof SignMessage
   */
  getAllWindowHandles(): Promise<any[]> {
    return this.callIfMethodExists('getAllWindowHandles');
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
  reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.callIfMethodExists('reject', [page]);
    } else {
      return this.callIfMethodExists('reject');
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
  switchToMainWindow<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return this.callIfMethodExists('switchToMainWindow', [page]);
    } else {
      return this.callIfMethodExists('switchToMainWindow');
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
  switchToWindow<TPage>(nameOrHandle: any, page?: new () => TPage): Promise<any> {
    if (page) {
      return this.callIfMethodExists('switchToWindow', [nameOrHandle, page]);
    } else {
      return this.callIfMethodExists('switchToWindow', [nameOrHandle]);
    }
  }
}
