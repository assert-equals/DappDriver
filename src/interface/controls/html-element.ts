export interface IHTMLElement {
  click(): Promise<void>;
  click<TPage>(page: new () => TPage): Promise<TPage>;
  click<TPage>(page?: new () => TPage): Promise<any>;
  clickAndWait(duration: number): Promise<void>;
  clickAndOpensInNewWindow<TPage>(page: new () => TPage): Promise<TPage>;
  clickAndSwitchToMainWindow<TPage>(page: new () => TPage): Promise<TPage>;
  getAttribute(attribute: string): Promise<string | null>;
  getCssValue(property: string): Promise<string | null>;
  getText(): Promise<string>;
  hover(): Promise<void>;
  isDisplayed(): Promise<boolean>;
  isEnabled(): Promise<boolean>;
  isVisible(): Promise<boolean>;
  type(keys: string): Promise<void>;
}
