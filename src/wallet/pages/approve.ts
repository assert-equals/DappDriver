import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { Approve as MetaMaskApprove } from '../../metamask';
import { Approve as RainbowApprove } from '../../rainbow';
import { DappDriver } from '../../session/dapp-driver';
import { Approve as ZerionApprove } from '../../zerion';

export class Approve implements IConfirmation {
  public url: string | RegExp;
  public title: string;
  private approve: MetaMaskApprove | RainbowApprove | ZerionApprove;

  constructor() {
    switch (DappDriver.Instance.Wallet) {
      case METAMASK:
      case METAMASK_FLASK:
        this.approve = new MetaMaskApprove();
        break;
      case RAINBOW:
        this.approve = new RainbowApprove();
        break;
      case ZERION:
        this.approve = new ZerionApprove();
        break;
    }
    this.url = this.approve.url;
    this.title = this.approve.title;
  }

  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    return await (this.approve[methodName] as Function)(...args);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof Approve
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
   * @memberof Approve
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
   * @memberof Approve
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
   * @memberof Approve
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
   * @memberof Approve
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
