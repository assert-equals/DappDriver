import { PageObject } from '../../page';

export interface IConnect {
  accept<TPage extends PageObject>(page: new () => TPage): Promise<TPage>;
  reject<TPage extends PageObject>(page: new () => TPage): Promise<TPage>;
}
