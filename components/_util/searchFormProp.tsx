import { SelectProps } from 'antd/lib/select';
export declare type colType = {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
};

export interface InputConf {
  type?:
    | 'input'
    | 'select'
    | 'inputNumber'
    | 'datePicker'
    | 'monthPicker'
    | 'rangePicker'
    | 'weekPicker';
  name: string;
  label: string;
  format?: string;
  optionData?: object[];
  valueFiled?: string;
  nameFiled?: string;
  selectProps?: SelectProps;
  grid?: colType;
  defaultValue?: any;
  [propName: string]: any;
}

export interface AnyObject {
  [key: string]: any;
}
