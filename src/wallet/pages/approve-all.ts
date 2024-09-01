import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { ApproveAll as MetaMaskApproveAll } from '../../metamask';
import { ApproveAll as RainbowApproveAll } from '../../rainbow';
import { DappDriver } from '../../session/dapp-driver';
import { ApproveAll as ZerionApproveAll } from '../../zerion';

/**
 *
 *
 * @export
 * @class ApproveAll
 * @implements {IConfirmation}
 */
export class ApproveAll implements IConfirmation {
  public url: string | RegExp;
  public title: string;
  private approveAll: MetaMaskApproveAll | RainbowApproveAll | ZerionApproveAll;

  constructor() {
    switch (DappDriver.Instance.Wallet) {
      case METAMASK:
      case METAMASK_FLASK:
        this.approveAll = new MetaMaskApproveAll();
        break;
      case RAINBOW:
        this.approveAll = new RainbowApproveAll();
        break;
      case ZERION:
        this.approveAll = new ZerionApproveAll();
        break;
    }
    this.url = this.approveAll.url;
    this.title = this.approveAll.title;
  }
  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    return await (this.approveAll[methodName] as Function)(...args);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof ApproveAll
   */
  accept(): Promise<void>;
  accept<TPage>(page: new () => TPage): Promise<TPage>;
  async accept<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('accept', [page]);
    } else {
      return await this.callIfMethodExists('accept');
    }
  }
  /**
   *
   *
   * @return {*}  {Promise<any[]>}
   * @memberof ApproveAll
   */
  async getAllWindowHandles(): Promise<any[]> {
    return await this.callIfMethodExists('getAllWindowHandles');
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof ApproveAll
   */
  reject(): Promise<void>;
  reject<TPage>(page: new () => TPage): Promise<TPage>;
  async reject<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('reject', [page]);
    } else {
      return await this.callIfMethodExists('reject');
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof ApproveAll
   */
  switchToMainWindow(): Promise<void>;
  switchToMainWindow<TPage>(page: new () => TPage): Promise<TPage>;
  async switchToMainWindow<TPage>(page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('switchToMainWindow', [page]);
    } else {
      return await this.callIfMethodExists('switchToMainWindow');
    }
  }
  /**
   *
   *
   * @template TPage
   * @param {*} nameOrHandle
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof ApproveAll
   */
  switchToWindow(nameOrHandle: any): Promise<void>;
  switchToWindow<TPage>(nameOrHandle: any, page: new () => TPage): Promise<TPage>;
  async switchToWindow<TPage>(nameOrHandle: any, page?: new () => TPage): Promise<any> {
    if (page) {
      return await this.callIfMethodExists('switchToWindow', [nameOrHandle, page]);
    } else {
      return await this.callIfMethodExists('switchToWindow', [nameOrHandle]);
    }
  }
}
