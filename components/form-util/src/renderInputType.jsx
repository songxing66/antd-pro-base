/*
 * @描述:  渲染对应input组件
 * @Author: /songzi
 * @Date: 2019-07-10 16:15:04
 * @Last Modified by: songzi
 * @Last Modified time: 2019-08-07 17:16:08
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
const RenderInputType = inputConfig => {
  const {
    type,
    placeholder,
    optionValue,
    optionName,
    max,
    min,
    format,
    showSearch,
    optionFilterProp,
    filterOption,
    tokenSeparators,
    mode,
  } = inputConfig;
  switch (type) {
    case 'input':
      return <Input placeholder={placeholder} />;
    case 'select':
      return (
        <Select
          {...{ showSearch, optionFilterProp, filterOption, tokenSeparators, mode }}
          placeholder={placeholder}
        >
          {mapOption(optionValue, optionName)}
        </Select>
      );
    case 'inputNumber':
      return <InputNumber max={max} min={min}></InputNumber>;
    case 'datePicker':
      return <DatePicker format={format} />;
    case 'monthPicker':
      return <MonthPicker placeholder={placeholder} format={format} />;
    case 'rangePicker':
      return <RangePicker format={format} />;
    case 'weekPicker':
      return <WeekPicker placeholder={placeholder} format={format} />;
    default:
      return <Input></Input>;
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
export default RenderInputType;
