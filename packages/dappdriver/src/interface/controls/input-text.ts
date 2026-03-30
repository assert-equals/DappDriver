export interface IInputText {
  clear(): Promise<void>;
  focus(): Promise<void>;
  getText(): Promise<string>;
  getValue(): Promise<string>;
  type(keys: string): Promise<void>;
  typeAndEnter(keys: string): Promise<void>;
  typeAndTab(keys: string): Promise<void>;
}
