import { IConfirmation } from '../wallet/confirmation';

export interface IHTMLElement {
  click(): Promise<void>;
  click<TPage>(page: new () => TPage): Promise<TPage>;
  click<TPage>(page?: new () => TPage): Promise<any>;
  clickAndWait(duration: number): Promise<void>;
  clickAndOpensInExtension(): Promise<void>;
  clickAndOpensInExtension<TPage extends IConfirmation>(page: new () => TPage): Promise<TPage>;
  clickAndOpensInExtension<TPage extends IConfirmation>(page?: new () => TPage): Promise<any>;
  clickAndOpensInNewWindow(): Promise<void>;
  clickAndOpensInNewWindow<TPage>(page: new () => TPage): Promise<TPage>;
  clickAndOpensInNewWindow<TPage>(page?: new () => TPage): Promise<any>;
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
}
