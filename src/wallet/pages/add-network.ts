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
    let connect: MetaMaskAddNetwork | RainbowAddNetwork | ZerionAddNetwork;
    switch (DappDriver.Instance.Wallet) {
      case METAMASK:
      case METAMASK_FLASK:
        connect = new MetaMaskAddNetwork();
        break;
      case RAINBOW:
        connect = new RainbowAddNetwork();
        break;
      case ZERION:
        connect = new ZerionAddNetwork();
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
   * @memberof AddNetwork
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
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {(Promise<void | TPage>)}
   * @memberof AddNetwork
   */
  reject<TPage>(page?: new () => TPage): Promise<void | TPage> {
    if (page) {
      return this.callIfMethodExists('reject', [page]);
    } else {
      return this.callIfMethodExists('reject');
    }
  }
}
