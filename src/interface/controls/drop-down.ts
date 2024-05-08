export interface IDropDown {
  getSelectedOption(): Promise<string>;
  selectByIndex(index: number): Promise<void>;
  selectByText(text: string): Promise<void>;
  selectByValue(value: string): Promise<void>;
}
