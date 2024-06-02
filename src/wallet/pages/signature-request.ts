import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { DappDriver } from '../../session/dapp-driver';
import { SignatureRequest as MetaMaskSignatureRequest } from '../../metamask';
import { SignatureRequest as RainbowSignatureRequest } from '../../rainbow';
import { SignatureRequest as ZerionSignatureRequest } from '../../zerion';
import { ISignatureRequest } from '../../interface/wallet/signature-request';
/**
 *
 *
 * @export
 * @class SignatureRequest
 * @implements {ISignatureRequest}
 */
export class SignatureRequest implements ISignatureRequest {
  private async callIfMethodExists(methodName: keyof ISignatureRequest, args: Array<any> = []): Promise<any> {
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
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof SignatureRequest
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
   * @memberof SignatureRequest
   */
  reject<TPage>(page: new () => TPage): Promise<TPage> {
    return this.callIfMethodExists('reject', [page]);
  }
}
