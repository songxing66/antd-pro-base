/*
 * @描述:  渲染对应input组件
 * @Author: /songzi
 * @Date: 2019-07-10 16:15:04
 * @Last Modified by: songzi
 * @Last Modified time: 2019-08-12 17:35:30
 */

import React from 'react';
// import { generate as generateId } from 'shortid';
import { Input, InputNumber, DatePicker, Select } from 'antd';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const { Option } = Select;
/**
 * @description 根据配置项类型渲染input类型
 * @param {Object} inputConfig input配置项
 * @returns
 */
const RenderInput = inputConfig => {
  const { type, optionValue, optionName, inputProps } = inputConfig;
  switch (type) {
    case 'input':
      return <Input {...inputProps} />;
    case 'select':
      return <Select {...inputProps}>{mapOption(optionValue, optionName)}</Select>;
    case 'selectMultiple':
      return (
        <Select mode="tags" {...inputProps}>
          {mapOption(optionValue, optionName)}
        </Select>
      );
    case 'selectTags':
      return (
        <Select mode="tags" {...inputProps}>
          {mapOption(optionValue, optionName)}
        </Select>
      );
    case 'inputNumber':
      return <InputNumber {...inputProps}></InputNumber>;
    case 'datePicker':
      return <DatePicker {...inputProps} />;
    case 'monthPicker':
      return <MonthPicker {...inputProps} />;
    case 'rangePicker':
      return <RangePicker {...inputProps} />;
    case 'weekPicker':
      return <WeekPicker {...inputProps} />;
    default:
      return <Input {...inputProps}></Input>;
  }
};
/**
 * @description 遍历opthion配置
 * @author songs
 * @date 2019-07-10
 * @returns
 * @memberof RenderInputType
 */
function mapOption(optionValue = [], optionName = []) {
  const optionList = optionValue.map((item, index) => (
    <Option key={item.id || index} value={item}>
      {optionName[index] || item}
    </Option>
  ));
  return optionList;
}
function renderOptions(optionList, valueFiled, nameFiled, lable) {
  const optionDomList = optionList.map((item, index) => {
    const keys = `option_${index}`;
    return (
      <Option lable={lable || ''} key={item.id || keys} value={item[valueFiled]}>
        {item[nameFiled] || item[valueFiled]}
      </Option>
    );
  });
  return optionDomList;
}

export { renderOptions };
export default RenderInput;
