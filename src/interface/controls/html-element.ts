import { IPageObject } from '../page/page-object';
import { IConfirmation } from '../wallet/confirmation';

export interface IHTMLElement {
  click(): Promise<void>;
  click<TPage>(page: new () => TPage): Promise<TPage>;
  click<TPage>(page?: new () => TPage): Promise<any>;
  clickAndWait(duration: number): Promise<void>;
  clickAndOpensInNewWindow(): Promise<void>;
  clickAndOpensInNewWindow<TPage>(page: new () => TPage): Promise<TPage>;
  clickAndOpensInNewWindow<TPage>(page?: new () => TPage): Promise<any>;
  clickAndOpensInWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage>;
  clickAndSwitchToMainWindow(): Promise<void>;
  clickAndSwitchToMainWindow<TPage>(page: new () => TPage): Promise<TPage>;
  clickAndSwitchToMainWindow<TPage>(page?: new () => TPage): Promise<any>;
  getAttribute(attribute: string): Promise<string | null>;
  getCssValue(property: string): Promise<string | null>;
  getText(): Promise<string>;
  hover(): Promise<void>;
  isDisplayed(): Promise<boolean>;
  isEnabled(): Promise<boolean>;
  isVisible(): Promise<boolean>;
  type(keys: string): Promise<void>;
  waitForText(text?: string | RegExp): Promise<void>;
}
