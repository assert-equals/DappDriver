export interface IConfirmation {
  accept(): Promise<void>;
  accept<TPage>(page: new () => TPage): Promise<TPage>;
  getAllWindowHandles(): Promise<Array<any>>;
  reject(): Promise<void>;
  reject<TPage>(page: new () => TPage): Promise<TPage>;
  switchToMainWindow(): Promise<void>;
  switchToWindow(nameOrHandle: any): Promise<void>;
}
