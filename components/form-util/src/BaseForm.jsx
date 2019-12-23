/*
 * @描述: 基础表单组件
 * @Author: /songzi
 * @Date: 2019-07-23 16:11:21
 * @Last Modified by: songzi
 * @Last Modified time: 2019-07-23 16:11:41
 */

import React, { PureComponent, Fragment, useState } from 'react';
import { Form } from 'antd';
import MapInput from './MapInput';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
/**
 * @description 当 Form.Item 子节点的值（包括 error）发生改变时触发，可以把对应的值转存到 Redux store
 * @param {*} props
 * @param {*} changedFields
 * @param {*} allFields
 */
const onFieldsChange = (props, changedFields, allFields) => {
  const { onFieldsChange: fieldsChangede = () => {}, form } = props;
  fieldsChangede(form, changedFields, allFields);
};
/**
 * @description 任一表单域的值发生改变时的回调
 * @param {*} props
 * @param {*} changedValues
 * @param {*} allValues
 */
const onValuesChange = (props, changedValues, allValues) => {
  const { onValuesChange: valuesChangede = () => {}, form } = props;
  valuesChangede(form, changedValues, allValues);
};

@Form.create({
  onFieldsChange,
  onValuesChange,
})
class BaseForm extends PureComponent {
  constructor(props) {
    super(props);
    console.log(this);
  }

  resetFrom() {
    this.props.form.resetFields();
  }

  render() {
    const {
      form: { getFieldDecorator },
      inputConfig,
    } = this.props;
    return (
      <Form {...formItemLayout}>
        <MapInput getFieldDecorator={getFieldDecorator} inputConfig={inputConfig}></MapInput>
      </Form>
    );
  }
}

export default BaseForm;
