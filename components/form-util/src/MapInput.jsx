/*
 * @描述: input配置信息遍历器
 * @Author: /songzi
 * @Date: 2019-07-19 18:29:55
 * @Last Modified by: songzi
 * @Last Modified time: 2019-07-22 16:05:11
 */
import React, { Fragment } from 'react';
import { Form } from 'antd';
import RenderInputType from './renderInputType';

const FormItem = Form.Item;

const RevInput = (render, isGetFieldDecorator, getFieldDecorator, inputItem) => {
  if (render) return render;
  if (!isGetFieldDecorator) return RenderInputType(inputItem);
  return getFieldDecorator(inputItem.name, {
    initialValue: inputItem.defaultValue,
  })(RenderInputType(inputItem));
};

const MapInput = ({ getFieldDecorator, inputConfig }) => {
  const InputList = inputConfig.map((inputItem, index) => {
    const { label, name, render, isGetFieldDecorator, isHide } = inputItem;
    return (
      <FormItem key={name} label={label} style={{ display: !isHide ? 'block' : 'none' }}>
        {RevInput(render, isGetFieldDecorator, getFieldDecorator, inputItem)}
      </FormItem>
    );
  });
  return InputList;
};
export default MapInput;
