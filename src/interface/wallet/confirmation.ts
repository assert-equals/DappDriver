export interface IConfirmation {
  accept(): Promise<void>;
  accept<TPage>(page: new () => TPage): Promise<TPage>;
  accept<TPage>(page?: new () => TPage): Promise<any>;
  getAllWindowHandles(): Promise<Array<any>>;
  reject(): Promise<void>;
  reject<TPage>(page: new () => TPage): Promise<TPage>;
  reject<TPage>(page?: new () => TPage): Promise<any>;
  switchToMainWindow(): Promise<void>;
  switchToMainWindow<TPage>(page: new () => TPage): Promise<TPage>;
  switchToMainWindow<TPage>(page?: new () => TPage): Promise<any>;
  switchToWindow(nameOrHandle: any): Promise<void>;
  switchToWindow<TPage>(nameOrHandle: any, page: new () => TPage): Promise<TPage>;
  switchToWindow<TPage>(nameOrHandle: any, page?: new () => TPage): Promise<any>;
}
