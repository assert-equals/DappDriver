import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { DappDriver } from '../../session/dapp-driver';
import { ConfirmTransaction as MetaMaskConfirmTransaction } from '../../metamask';
import { ConfirmTransaction as RainbowConfirmTransaction } from '../../rainbow';
import { SendTransaction as ZerionConfirmTransaction } from '../../zerion';
import { IConfirmTransaction } from '../../interface/wallet/confirm-transaction';
import { PageObject } from '../../page';
/**
 *
 *
 * @export
 * @class ConfirmTransaction
 * @implements {IConfirmTransaction}
 */
export class ConfirmTransaction implements IConfirmTransaction {
  private async callIfMethodExists(methodName: keyof IConfirmTransaction, args: Array<any> = []): Promise<any> {
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

  accept<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('accept', [page]);
  }

  reject<TPage extends PageObject>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('reject', [page]);
  }
}
