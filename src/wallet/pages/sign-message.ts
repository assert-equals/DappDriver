import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { DappDriver } from '../../session/dapp-driver';
import { SignMessage as MetaMaskSignMessage } from '../../metamask';
import { SignMessage as RainbowSignMessage } from '../../rainbow';
import { SignMessage as ZerionSignMessage } from '../../zerion';
import { ISignMessage } from '../../interface/wallet/sign-message';
/**
 *
 *
 * @export
 * @class SignMessage
 * @implements {ISignMessage}
 */
export class SignMessage implements ISignMessage {
  private async callIfMethodExists(methodName: keyof ISignMessage, args: Array<any> = []): Promise<any> {
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
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignMessage
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
   * @memberof SignMessage
   */
  reject<TPage>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('reject', [page]);
  }
}
