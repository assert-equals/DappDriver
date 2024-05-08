import { PageObject } from '../../page';

export interface IPageObject {
  back(): Promise<void>;
  backToPage<TPage extends PageObject>(page: new () => TPage): Promise<TPage>;
  close(): Promise<void>;
  closeAndSwitchToMainWindow<TPage extends PageObject>(page: new () => TPage): Promise<TPage>;
  createNewWindow(): Promise<void>;
  executeScript(script: string): Promise<any>;
  executeScriptAndOpensInNewWindow<TPage extends PageObject>(script: string, page: new () => TPage): Promise<TPage>;
  getAllWindowHandles(): Promise<Array<any>>;
  getCurrentUrl(): Promise<string>;
  getTitle(): Promise<string>;
  getWindowHandle(): Promise<any>;
  maximize(): Promise<void>;
  navigateTo(url: string): Promise<void>;
  navigateToPage<TPage extends PageObject>(url: string, page: new () => TPage): Promise<TPage>;
  navigateToPageInNewWindow<TPage extends PageObject>(url: string, page: new () => TPage): Promise<TPage>;
  opensInNewWindow(): Promise<void>;
  refresh(): Promise<void>;
  refreshPage<TPage extends PageObject>(page: new () => TPage): Promise<TPage>;
  setSize(width: number, height: number): Promise<void>;
  switchBack(): Promise<void>;
  switchToFrame(cssLocator: string): Promise<void>;
  switchToMainWindow(): Promise<void>;
  switchToWindow(nameOrHandle: any): Promise<void>;
  waitForElement(cssLocator: string): Promise<void>;
  waitForTitle(title: RegExp): Promise<void>;
  waitForURL(url?: RegExp): Promise<void>;
  waitForWindows(total: number): Promise<Array<string>>;
}
