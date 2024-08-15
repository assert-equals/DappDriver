import { Comparator } from '../../types';
import { IConfirmation } from '../wallet/confirmation';

export interface IPageObject {
  url: string | RegExp;
  title: string;
  back(): Promise<void>;
  back<TPage>(page: new () => TPage): Promise<TPage>;
  back<TPage>(page?: new () => TPage): Promise<any>;
  close(): Promise<void>;
  close<TPage>(page: new () => TPage): Promise<TPage>;
  close<TPage>(page?: new () => TPage): Promise<any>;
  closeAndSwitchToMainWindow(): Promise<void>;
  closeAndSwitchToMainWindow<TPage>(page: new () => TPage): Promise<TPage>;
  closeAndSwitchToMainWindow<TPage>(page?: new () => TPage): Promise<any>;
  createNewWindow(): Promise<void>;
  executeScript(script: string): Promise<any>;
  executeScriptAndOpensInWindow<TPage extends IConfirmation | IPageObject>(
    script: string,
    page: new () => TPage
  ): Promise<TPage>;
  getAllWindowHandles(): Promise<Array<any>>;
  getCurrentUrl(): Promise<string>;
  getTitle(): Promise<string>;
  getWindowHandle(): Promise<any>;
  maximize(): Promise<void>;
  navigateTo(url: string): Promise<void>;
  navigateTo<TPage>(url: string, page: new () => TPage): Promise<TPage>;
  navigateTo<TPage>(url: string, page?: new () => TPage): Promise<any>;
  navigateToPageInNewWindow(url: string): Promise<void>;
  navigateToPageInNewWindow<TPage>(url: string, page: new () => TPage): Promise<TPage>;
  navigateToPageInNewWindow<TPage>(url: string, page?: new () => TPage): Promise<any>;
  opensInNewWindow(): Promise<void>;
  opensInNewWindow<TPage>(page: new () => TPage): Promise<TPage>;
  opensInNewWindow<TPage>(page?: new () => TPage): Promise<any>;
  opensInWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage>;
  refresh(): Promise<void>;
  refresh<TPage>(page: new () => TPage): Promise<TPage>;
  refresh<TPage>(page?: new () => TPage): Promise<any>;
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
  waitForTitle(title?: RegExp): Promise<void>;
  waitForURL(url?: RegExp): Promise<void>;
  waitForWindows(total: number, comparator: Comparator): Promise<Array<any>>;
}
