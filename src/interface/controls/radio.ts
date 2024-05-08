export interface IRadio {
  isSelected(): Promise<boolean>;
  select(): Promise<void>;
}
