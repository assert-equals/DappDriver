export interface IConfirmation {
  accept(): Promise<void>;
  accept<TPage>(page: new () => TPage): Promise<TPage>;
  reject(): Promise<void>;
  reject<TPage>(page: new () => TPage): Promise<TPage>;
}
