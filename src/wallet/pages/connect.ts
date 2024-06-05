import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { DappDriver } from '../../session/dapp-driver';
import { Connect as MetaMaskConnect } from '../../metamask';
import { Connect as RainbowConnect } from '../../rainbow';
import { Connect as ZerionConnect } from '../../zerion';
import { IConfirmation } from '../../interface/wallet/confirmation';
/**
 *
 *
 * @export
 * @class Connect
 * @implements {IConfirmation}
 */
export class Connect implements IConfirmation {
  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    let connect: MetaMaskConnect | RainbowConnect | ZerionConnect;
    switch (DappDriver.Instance.Wallet) {
      case METAMASK:
      case METAMASK_FLASK:
        connect = new MetaMaskConnect();
        break;
      case RAINBOW:
        connect = new RainbowConnect();
        break;
      case ZERION:
        connect = new ZerionConnect();
        break;
    }
    return await (connect[methodName] as Function)(...args);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {(Promise<void | TPage>)}
   * @memberof Connect
   */
  accept<TPage>(page?: new () => TPage): Promise<void | TPage> {
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
   * @memberof Connect
   */
  getAllWindowHandles(): Promise<any[]> {
    return this.callIfMethodExists('getAllWindowHandles');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {(Promise<void | TPage>)}
   * @memberof Connect
   */
  reject<TPage>(page?: new () => TPage): Promise<void | TPage> {
    if (page) {
      return this.callIfMethodExists('reject', [page]);
    } else {
      return this.callIfMethodExists('reject');
    }
  }
  /**
   *
   *
   * @return {*}  {Promise<void>}
   * @memberof Connect
   */
  switchToMainWindow(): Promise<void> {
    return this.callIfMethodExists('switchToMainWindow');
  }
  /**
   *
   *
   * @param {*} nameOrHandle
   * @return {*}  {Promise<void>}
   * @memberof Connect
   */
  switchToWindow(nameOrHandle: any): Promise<void> {
    return this.callIfMethodExists('switchToWindow', [nameOrHandle]);
  }
}
