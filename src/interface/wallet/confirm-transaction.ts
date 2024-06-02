export interface IConfirmTransaction {
  accept<TPage>(page: new () => TPage): Promise<TPage>;
  reject<TPage>(page: new () => TPage): Promise<TPage>;
}
