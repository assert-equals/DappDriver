import { IConfirmation } from '../wallet/confirmation';

export interface IPageObject {
  back(): Promise<void>;
  backToPage<TPage>(page: new () => TPage): Promise<TPage>;
  close(): Promise<void>;
  closeAndSwitchToMainWindow<TPage>(page: new () => TPage): Promise<TPage>;
  createNewWindow(): Promise<void>;
  executeScript(script: string): Promise<any>;
  executeScriptAndOpensInExtension<TPage extends IConfirmation>(script: string, page: new () => TPage): Promise<TPage>;
  getAllWindowHandles(): Promise<Array<any>>;
  getCurrentUrl(): Promise<string>;
  getTitle(): Promise<string>;
  getWindowHandle(): Promise<any>;
  maximize(): Promise<void>;
  navigateTo(url: string): Promise<void>;
  navigateToPage<TPage>(url: string, page: new () => TPage): Promise<TPage>;
  navigateToPageInNewWindow<TPage>(url: string, page: new () => TPage): Promise<TPage>;
  opensInExtension<TPage extends IConfirmation>(page: new () => TPage): Promise<TPage>;
  opensInNewWindow(): Promise<void>;
  opensInNewWindow<TPage>(page: new () => TPage): Promise<TPage>;
  opensInNewWindow<TPage>(page?: new () => TPage): Promise<any>;
  refresh(): Promise<void>;
  refreshPage<TPage>(page: new () => TPage): Promise<TPage>;
  setSize(width: number, height: number): Promise<void>;
  switchBack(): Promise<void>;
  switchToFrame(cssLocator: string): Promise<void>;
  switchToMainWindow(): Promise<void>;
  switchToMainWindow<TPage>(page: new () => TPage): Promise<TPage>;
  switchToMainWindow<TPage>(page?: new () => TPage): Promise<any>;
  switchToWindow(nameOrHandle: any): Promise<void>;
  switchToWindow<TPage>(nameOrHandle: any, page: new () => TPage): Promise<TPage>;
  switchToWindow<TPage>(nameOrHandle: any, page?: new () => TPage): Promise<any>;
  waitForElement(cssLocator: string): Promise<void>;
  waitForTitle(title: RegExp): Promise<void>;
  waitForURL(url?: RegExp): Promise<void>;
  waitForWindows(total: number): Promise<Array<any>>;
}
