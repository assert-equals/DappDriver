import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { DappDriver } from '../../session/dapp-driver';
import { AddNetwork as MetaMaskAddNetwork } from '../../metamask';
import { AddNetwork as RainbowAddNetwork } from '../../rainbow';
import { AddNetwork as ZerionAddNetwork } from '../../zerion';
import { IConfirmation } from '../../interface/wallet/confirmation';
/**
 *
 *
 * @export
 * @class AddNetwork
 * @implements {IConfirmation}
 */
export class AddNetwork implements IConfirmation {
  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    let addNetwork: MetaMaskAddNetwork | RainbowAddNetwork | ZerionAddNetwork;
    switch (DappDriver.Instance.Wallet) {
      case METAMASK:
      case METAMASK_FLASK:
        addNetwork = new MetaMaskAddNetwork();
        break;
      case RAINBOW:
        addNetwork = new RainbowAddNetwork();
        break;
      case ZERION:
        addNetwork = new ZerionAddNetwork();
        break;
    }
    return await (addNetwork[methodName] as Function)(...args);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof AddNetwork
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
   * @memberof AddNetwork
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
   * @memberof AddNetwork
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
   * @memberof AddNetwork
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
   * @memberof AddNetwork
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
