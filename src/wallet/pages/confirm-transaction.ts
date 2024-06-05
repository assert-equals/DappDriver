import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { DappDriver } from '../../session/dapp-driver';
import { ConfirmTransaction as MetaMaskConfirmTransaction } from '../../metamask';
import { ConfirmTransaction as RainbowConfirmTransaction } from '../../rainbow';
import { SendTransaction as ZerionConfirmTransaction } from '../../zerion';
import { IConfirmation } from '../../interface/wallet/confirmation';
/**
 *
 *
 * @export
 * @class ConfirmTransaction
 * @implements {IConfirmation}
 */
export class ConfirmTransaction implements IConfirmation {
  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    let connect: MetaMaskConfirmTransaction | RainbowConfirmTransaction | ZerionConfirmTransaction;
    switch (DappDriver.Instance.Wallet) {
      case METAMASK:
      case METAMASK_FLASK:
        connect = new MetaMaskConfirmTransaction();
        break;
      case RAINBOW:
        connect = new RainbowConfirmTransaction();
        break;
      case ZERION:
        connect = new ZerionConfirmTransaction();
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
   * @memberof ConfirmTransaction
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
   * @memberof ConfirmTransaction
   */
  reject<TPage>(page?: new () => TPage): Promise<void | TPage> {
    if (page) {
      return this.callIfMethodExists('reject', [page]);
    } else {
      return this.callIfMethodExists('reject');
    }
  }
}
