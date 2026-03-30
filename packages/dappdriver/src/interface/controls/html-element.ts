import { IPageObject } from '../page/page-object';
import { IConfirmation } from '../wallet/confirmation';

export interface IHTMLElement {
  click(): Promise<void>;
  clickRedirectsTo<TPage>(page: new () => TPage): Promise<TPage>;
  clickAndSwitchToWindow<TPage extends IConfirmation | IPageObject>(page: new () => TPage): Promise<TPage>;
  clickAndWait(duration: number): Promise<void>;
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
