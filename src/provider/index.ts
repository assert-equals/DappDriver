import { IPageObject } from '../interface/page/page-object';
import { IConfirmation } from '../interface/wallet/confirmation';
import { PageObject } from '../page';
import { JsonRpcRequest } from '../types';

/**
 *
 *
 * @export
 * @class Provider
 */
export class Provider {
  private page: PageObject = new PageObject();
  /**
   *
   * Schedules a command to execute a JSON-RPC request in the context of the currently selected frame or window
   * @param {JsonRpcRequest} jsonRpcRequest
   * @return {*}  {Promise<any>}
   * @memberof Provider
   */
  request(jsonRpcRequest: JsonRpcRequest): Promise<any> {
    const request: string = JSON.stringify(jsonRpcRequest);
    return this.page.executeScript(`window.ethereum.request(${request})`);
  }
  /**
   *
   * Schedules a command to execute a JSON-RPC request in the context of the currently selected frame or window and switch the focus of all future commands to the window
   * @template TPage
   * @param {JsonRpcRequest} jsonRpcRequest
   * @param {new () => TPage} page
   * @return {*}  {Promise<TPage>}
   * @memberof Provider
   */
  requestOpensInWindow<TPage extends IConfirmation | IPageObject>(
    jsonRpcRequest: JsonRpcRequest,
    page: new () => TPage
  ): Promise<TPage> {
    const request = JSON.stringify(jsonRpcRequest);
    return this.page.executeScriptAndOpensInWindow<TPage>(`window.ethereum.request(${request})`, page);
  }
}
