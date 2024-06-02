import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { DappDriver } from '../../session/dapp-driver';
import { AddNetwork as MetaMaskAddNetwork } from '../../metamask';
import { AddNetwork as RainbowAddNetwork } from '../../rainbow';
import { AddNetwork as ZerionAddNetwork } from '../../zerion';
import { IAddNetwork } from '../../interface/wallet/add-network';
/**
 *
 *
 * @export
 * @class AddNetwork
 * @implements {IAddNetwork}
 */
export class AddNetwork implements IAddNetwork {
  private async callIfMethodExists(methodName: keyof IAddNetwork, args: Array<any> = []): Promise<any> {
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
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof AddNetwork
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
   * @memberof AddNetwork
   */
  reject<TPage>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('reject', [page]);
  }
}
