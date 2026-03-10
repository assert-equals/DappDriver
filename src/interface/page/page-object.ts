import { Comparator, Cookie } from '../../types';
import { IConfirmation } from '../wallet/confirmation';

export interface IPageObject {
  url: string | RegExp;
  title: string;
  addCookie(cookie: Cookie): Promise<void>;
  back<TPage>(page: new () => TPage): Promise<TPage>;
  clearCookie(name: string): Promise<void>;
  clearCookies(): Promise<void>;
  close(): Promise<void>;
  close<TPage>(page: new () => TPage): Promise<TPage>;
  close<TPage>(page?: new () => TPage): Promise<any>;
  closeAndSwitchToWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage>;
  executeScript(script: string): Promise<any>;
  executeScriptAndOpensInWindow<TPage extends IConfirmation | IPageObject>(
    script: string,
    page: new () => TPage
  ): Promise<TPage>;
  forward(): Promise<void>;
  forward<TPage>(page: new () => TPage): Promise<TPage>;
  forward<TPage>(page?: new () => TPage): Promise<any>;
  getAllWindowHandles(): Promise<Array<any>>;
  getCookie(name: string): Promise<any>;
  getCookies(): Promise<Array<any>>;
  getCurrentUrl(): Promise<string>;
  getPageSource(): Promise<string>;
  getTitle(): Promise<string>;
  getWindowHandle(): Promise<any>;
  maximize(): Promise<void>;
  navigateTo(url: string): Promise<void>;
  navigateTo<TPage>(url: string, page: new () => TPage): Promise<TPage>;
  navigateTo<TPage>(url: string, page?: new () => TPage): Promise<any>;
  navigateToPageInNewWindow(url: string): Promise<void>;
  navigateToPageInNewWindow<TPage>(url: string, page: new () => TPage): Promise<TPage>;
  navigateToPageInNewWindow<TPage>(url: string, page?: new () => TPage): Promise<any>;
  opensInWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage>;
  refresh(): Promise<void>;
  refresh<TPage>(page: new () => TPage): Promise<TPage>;
  refresh<TPage>(page?: new () => TPage): Promise<any>;
  setSize(width: number, height: number): Promise<void>;
  switchBack(): Promise<void>;
  switchToFrame(cssLocator: string): Promise<void>;
  switchToWindow(nameOrHandle: any): Promise<void>;
  switchToWindow<TPage>(nameOrHandle: any, page: new () => TPage): Promise<TPage>;
  switchToWindow<TPage>(nameOrHandle: any, page?: new () => TPage): Promise<any>;
  waitForElement(cssLocator: string): Promise<void>;
  waitForTitle(title?: RegExp): Promise<void>;
  waitForURL(url?: RegExp): Promise<void>;
  waitForWindows<TPage extends IConfirmation | IPageObject>(
    total: number,
    comparator: Comparator,
    page: new () => TPage
  ): Promise<TPage>;
}
