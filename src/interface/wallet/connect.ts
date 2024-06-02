export interface IConnect {
  accept<TPage>(page: new () => TPage): Promise<TPage>;
  reject<TPage>(page: new () => TPage): Promise<TPage>;
}
