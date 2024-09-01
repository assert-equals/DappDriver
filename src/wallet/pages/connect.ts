import { METAMASK, METAMASK_FLASK, RAINBOW, ZERION } from '../../constants';
import { IConfirmation } from '../../interface/wallet/confirmation';
import { Connect as MetaMaskConnect } from '../../metamask';
import { Connect as RainbowConnect } from '../../rainbow';
import { DappDriver } from '../../session/dapp-driver';
import { Connect as ZerionConnect } from '../../zerion';

/**
 *
 *
 * @export
 * @class Connect
 * @implements {IConfirmation}
 */
export class Connect implements IConfirmation {
  public url: string | RegExp;
  public title: string;
  private connect: MetaMaskConnect | RainbowConnect | ZerionConnect;

  constructor() {
    switch (DappDriver.Instance.Wallet) {
      case METAMASK:
      case METAMASK_FLASK:
        this.connect = new MetaMaskConnect();
        break;
      case RAINBOW:
        this.connect = new RainbowConnect();
        break;
      case ZERION:
        this.connect = new ZerionConnect();
        break;
    }
    this.url = this.connect.url;
    this.title = this.connect.title;
  }

  private async callIfMethodExists(methodName: keyof IConfirmation, args: Array<any> = []): Promise<any> {
    return await (this.connect[methodName] as Function)(...args);
  }
  /**
   *
   *
   * @template TPage
   * @param {new () => TPage} [page]
   * @return {*}  {Promise<any>}
   * @memberof Connect
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
   * @memberof Connect
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
   * @memberof Connect
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
   * @memberof Connect
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
   * @memberof Connect
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
