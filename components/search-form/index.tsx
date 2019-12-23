/*
 * @描述:  搜索表单组件
 * @Author: /songzi
 * @Date: 2019-07-10 16:16:16
 * @Last Modified by: songzi
 * @Last Modified time: 2019-12-23 11:34:52
 */

import * as React from 'react';
import { Form, Button, Icon, Row, Col } from 'antd';
import classNames from 'classnames';
import { batchDataFormat, getFormatFromConfig } from '../_util/utils';
import { colType, InputConf } from '../_util/searchFormProp';
import { FormComponentProps, FormItemProps } from 'antd/es/form';
import { ReanerSearchRow, RenderSearchCol } from './_util/renderLayout';
import { RenderInputType } from '../form-util';

const FormItem = Form.Item;

interface SearchFormProps extends FormComponentProps {
  prefixCls?: string;
  defaultInput?: InputConf[];
  moreInput?: InputConf[];
  gutter?: object;
  useCol?: colType;
  grid?: colType;
  formProp?: FormComponentProps;
  formItemProp?: FormItemProps;
  onSearch?: (simpleData: any, formData: any, isClear: boolean) => void;
}

interface SearchFormState {
  moreToggle: boolean;
}
/**
 * @description 当 Form.Item 子节点的值（包括 error）发生改变时触发，可以把对应的值转存到 Redux store
 * @param {*} props
 * @param {*} changedFields
 * @param {*} allFields
 */
const onFieldsChange = () => {
  //   console.log(changedFields.datePickerTest.value.format());
};
/**
 * @description 任一表单域的值发生改变时的回调
 * @param {*} props
 * @param {*} changedValues
 * @param {*} allValues
 */
const onValuesChange = () => {};

class SearchForm extends React.PureComponent<SearchFormProps, SearchFormState> {
  static defaultProps = {
    prefixCls: 'ant-searchBox',
    defaultInput: [] as InputConf[],
    moreInput: [] as InputConf[],
  };
  constructor(prop: SearchFormProps) {
    super(prop);
    this.state = {
      moreToggle: false,
    };
    this.handleFormReset = this.handleFormReset.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  /**
   * @description 遍历input配置输出input列表
   * @author songs
   * @date 2019-07-10
   * @param {Object} inputConfig
   * @returns
   * @memberof SearchForm
   */
  mapInput(inputConfig: InputConf[]) {
    const {
      form: { getFieldDecorator },
      useCol,
      formItemProp,
    } = this.props;
    const InputList = inputConfig.map((inputItem: InputConf) => {
      const { label, name, grid } = inputItem;
      return (
        <RenderSearchCol key={name} useCol={useCol} grid={grid}>
          <FormItem {...formItemProp} label={label}>
            {getFieldDecorator(name, {
              initialValue: inputItem.defaultValue,
            })(RenderInputType(inputItem))}
          </FormItem>
        </RenderSearchCol>
      );
    });
    return InputList;
  }

  /**
   * @description 搜索表单开始搜索
   * @author songs
   * @date 2019-07-10
   * @param {*} e
   * @memberof SearchForm
   */
  handleSearch(e: any, isClear: boolean) {
    e.preventDefault();
    const { onSearch, defaultInput = [], moreInput = [] } = this.props;
    const formData = this.props.form.getFieldsValue();
    const simpleData = batchDataFormat(
      formData,
      getFormatFromConfig([...defaultInput, ...moreInput], 'format'),
    );
    onSearch(simpleData, formData, isClear);
  }

  /**
   * @description 重置搜索表单
   * @author songs
   * @date 2019-07-10
   * @memberof SearchForm
   */
  handleFormReset(e: any) {
    e.preventDefault();
    this.props.form.resetFields();
    this.handleSearch(e, true);
  }

  /**
   * @description 切换更多展开
   * @author songs
   * @date 2019-07-11
   * @param {*} e
   * @memberof SearchForm
   */
  toggleForm(e: any) {
    e.preventDefault();
    this.setState(priveState => {
      const { moreToggle } = priveState;
      return { ...priveState, moreToggle: !moreToggle };
    });
  }

  /**
   * @description 渲染更多input设置项
   * @author songs
   * @date 2019-07-11
   * @returns
   * @memberof SearchForm
   */
  renderInputList(inputConfName: 'defaultInput' | 'moreInput') {
    const { useCol, gutter } = this.props;
    return (
      <ReanerSearchRow useCol={useCol} gutter={gutter}>
        {this.mapInput(this.props[inputConfName])}
      </ReanerSearchRow>
    );
  }

  /**
   * @description 根据更多input渲染展开按钮
   * @author songs
   * @date 2019-07-11
   * @returns
   * @memberof SearchForm
   */
  renderMoreBtn() {
    const { moreInput } = this.props;
    if (!moreInput || !moreInput.length) return null;
    return (
      <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
        {this.state.moreToggle ? '收起' : '展开'}{' '}
        <Icon type={this.state.moreToggle ? 'up' : 'down'} />
      </a>
    );
  }
  render() {
    const { prefixCls, useCol, formProp = {}, formItemProp = {} } = this.props;
    const { moreToggle } = this.state;
    return (
      <Form
        {...formProp}
        onSubmit={e => {
          this.handleSearch(e, false);
        }}
      >
        <div className={classNames({ [prefixCls]: true, [`${prefixCls}-horizontal`]: useCol })}>
          <div className={classNames(`${prefixCls}-input`)}>
            {this.renderInputList('defaultInput')}
            {moreToggle && this.renderInputList('moreInput')}
          </div>
          <Row>
            <Col {...formItemProp.labelCol} />
            <Col {...formItemProp.wrapperCol}>
              <div className={classNames(`${prefixCls}-button`)}>
                <span className={classNames(`${prefixCls}-buttons-submit`)}>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                    重置
                  </Button>
                  {this.renderMoreBtn()}
                </span>
              </div>
            </Col>
          </Row>
        </div>
      </Form>
    );
  }
}
const creatSearchForm = Form.create<SearchFormProps>({ onFieldsChange, onValuesChange })(
  SearchForm,
);

export default creatSearchForm;
