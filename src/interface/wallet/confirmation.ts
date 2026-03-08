import { IPageObject } from '../page/page-object';

export interface IConfirmation {
  url: string | RegExp;
  title: string;
  accept<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage>;
  getAllWindowHandles(): Promise<Array<any>>;
  reject<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage>;
  switchToWindow(nameOrHandle: any): Promise<void>;
  switchToWindow<TPage>(nameOrHandle: any, page: new () => TPage): Promise<TPage>;
  switchToWindow<TPage>(nameOrHandle: any, page?: new () => TPage): Promise<any>;
}
