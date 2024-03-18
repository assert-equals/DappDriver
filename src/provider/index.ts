import { PageObject } from '../page';
import { JsonRpcRequest } from '../types';

export class Provider {
  private page: PageObject = new PageObject();

  request(jsonRpcRequest: JsonRpcRequest): Promise<any> {
    const request: string = JSON.stringify(jsonRpcRequest);
    return this.page.executeScript(`window.ethereum.request(${request})`);
  }

  requestOpensInNewWindow<TPage extends PageObject>(
    jsonRpcRequest: JsonRpcRequest,
    page: new () => TPage,
  ): Promise<TPage> {
    const request = JSON.stringify(jsonRpcRequest);
    return this.page.executeScriptAndOpensInNewWindow<TPage>(`window.ethereum.request(${request})`, page);
  }
}
