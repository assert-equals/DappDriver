export interface ICheckBox {
  setValue(value: boolean): Promise<void>;
  isSelected(): Promise<boolean>;
}
