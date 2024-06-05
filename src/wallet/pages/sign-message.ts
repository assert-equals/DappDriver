import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { DappDriver } from '../../session/dapp-driver';
import { SignMessage as MetaMaskSignMessage } from '../../metamask';
import { SignMessage as RainbowSignMessage } from '../../rainbow';
import { SignMessage as ZerionSignMessage } from '../../zerion';
import { IConfirmation } from '../../interface/wallet/confirmation';
/**
 *
 *
 * @export
 * @class SignMessage
 * @implements {IConfirmation}
 */
export class SignMessage implements IConfirmation {
  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    let connect: MetaMaskSignMessage | RainbowSignMessage | ZerionSignMessage;
    switch (DappDriver.Instance.Wallet) {
      case METAMASK:
      case METAMASK_FLASK:
        connect = new MetaMaskSignMessage();
        break;
      case RAINBOW:
        connect = new RainbowSignMessage();
        break;
      case ZERION:
        connect = new ZerionSignMessage();
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
   * @memberof SignMessage
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
   * @memberof SignMessage
   */
  reject<TPage>(page?: new () => TPage): Promise<void | TPage> {
    if (page) {
      return this.callIfMethodExists('reject', [page]);
    } else {
      return this.callIfMethodExists('reject');
    }
  }
}
