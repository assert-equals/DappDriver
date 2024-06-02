export interface IHTMLElement {
  click(): Promise<void>;
  clickAndWait(duration: number): Promise<void>;
  clickAndOpensInNewWindow<TPage>(page: new () => TPage): Promise<TPage>;
  clickAndRedirectsTo<TPage>(page: new () => TPage): Promise<TPage>;
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
