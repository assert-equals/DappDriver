import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { DappDriver } from '../../session/dapp-driver';
import { SignatureRequest as MetaMaskSignatureRequest } from '../../metamask';
import { SignatureRequest as RainbowSignatureRequest } from '../../rainbow';
import { SignatureRequest as ZerionSignatureRequest } from '../../zerion';
import { IConfirmation } from '../../interface/wallet/confirmation';
/**
 *
 *
 * @export
 * @class SignatureRequest
 * @implements {IConfirmation}
 */
export class SignatureRequest implements IConfirmation {
  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    let connect: MetaMaskSignatureRequest | RainbowSignatureRequest | ZerionSignatureRequest;
    switch (DappDriver.Instance.Wallet) {
      case METAMASK:
      case METAMASK_FLASK:
        connect = new MetaMaskSignatureRequest();
        break;
      case RAINBOW:
        connect = new RainbowSignatureRequest();
        break;
      case ZERION:
        connect = new ZerionSignatureRequest();
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
   * @memberof SignatureRequest
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
   * @memberof SignatureRequest
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
   * @memberof SignatureRequest
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
   * @memberof SignatureRequest
   */
  switchToMainWindow(): Promise<void> {
    return this.callIfMethodExists('switchToMainWindow');
  }
  /**
   *
   *
   * @param {*} nameOrHandle
   * @return {*}  {Promise<void>}
   * @memberof SignatureRequest
   */
  switchToWindow(nameOrHandle: any): Promise<void> {
    return this.callIfMethodExists('switchToWindow', [nameOrHandle]);
  }
}
