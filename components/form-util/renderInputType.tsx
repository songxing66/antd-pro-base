/*
 * @描述:  渲染对应input组件
 * @Author: /songzi
 * @Date: 2019-07-10 16:15:04
 * @Last Modified by: songzi
 * @Last Modified time: 2019-12-23 11:32:08
 */

import React from 'react';
// import { generate as generateId } from 'shortid';
import { InputConf, AnyObject } from '../_util/searchFormProp';
import { Input, InputNumber, DatePicker, Select } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const { Option } = Select;
/**
 * @description 根据配置项类型渲染input类型
 * @param {Object} inputConfig input配置项
 * @returns
 */
const RenderInputType = (inputConfig: InputConf) => {
  const {
    type,
    placeholder,
    valueFiled = 'value',
    nameFiled = 'name',
    max,
    min,
    format,
    selectProps,
    optionData = [] as object[],
  } = inputConfig;
  switch (type) {
    case 'input':
      return <Input placeholder={placeholder} />;
    case 'select':
      return (
        <Select
          {...selectProps}
          //   {...{ showSearch, optionFilterProp, filterOption, tokenSeparators, mode }}
          placeholder={placeholder}
        >
          {renderOptions(optionData, valueFiled, nameFiled)}
        </Select>
      );
    case 'inputNumber':
      return <InputNumber max={max} min={min} />;
    case 'datePicker':
      return <DatePicker format={format} />;
    case 'monthPicker':
      return <MonthPicker placeholder={placeholder} format={format} />;
    case 'rangePicker':
      return <RangePicker format={format} />;
    case 'weekPicker':
      return <WeekPicker placeholder={placeholder} format={format} />;
    default:
      return <Input />;
  }
};
// /**
//  * @description 遍历opthion配置
//  * @author songs
//  * @date 2019-07-10
//  * @returns
//  * @memberof RenderInputType
//  */
// function mapOption(optionValue: any[], optionName: any[]) {
//   const optionList = optionValue.map((item: string, index: number) => (
//     <Option key={item} value={item}>
//       {optionName[index] || item}
//     </Option>
//   ));
//   return optionList;
// }
function renderOptions(optionList: object[], valueFiled: string, nameFiled: string) {
  const optionDomList = optionList.map((item: AnyObject) => {
    return (
      <Option key={item[valueFiled]} value={item[valueFiled]}>
        {item[nameFiled] || item[valueFiled]}
      </Option>
    );
  });
  return optionDomList;
}

export { renderOptions };
export default RenderInputType;
