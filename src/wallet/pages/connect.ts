import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { DappDriver } from '../../session/dapp-driver';
import { Connect as MetaMaskConnect } from '../../metamask';
import { Connect as RainbowConnect } from '../../rainbow';
import { Connect as ZerionConnect } from '../../zerion';
import { IConnect } from '../../interface/wallet/connect';
/**
 *
 *
 * @export
 * @class Connect
 * @implements {IConnect}
 */
export class Connect implements IConnect {
  private async callIfMethodExists(methodName: keyof IConnect, args: Array<any> = []): Promise<any> {
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
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Connect
   */
  accept<TPage>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('accept', [page]);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Connect
   */
  reject<TPage>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('reject', [page]);
  }
}
