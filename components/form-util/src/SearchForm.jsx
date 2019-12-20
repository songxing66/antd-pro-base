/*
 * @描述:  搜索表单组件
 * @Author: /songzi
 * @Date: 2019-07-10 16:16:16
 * @Last Modified by: songzi
 * @Last Modified time: 2019-08-21 15:09:14
 */

import React, { PureComponent } from 'react';
import { Form, Button, Icon } from 'antd';
// import { generate as generateId } from 'shortid';
import { batchDataFormat, getFormatFromConfig } from '@/utils/smallTool';
import { ReanerSearchRow, RenderSearchCol } from './renderLayout';
import RenderInputType from './renderInputType';

import styles from './SearchForm.less';

const FormItem = Form.Item;

/**
 * @description 当 Form.Item 子节点的值（包括 error）发生改变时触发，可以把对应的值转存到 Redux store
 * @param {*} props
 * @param {*} changedFields
 * @param {*} allFields
 */
const onFieldsChange = (props, changedFields, allFields) => {
  //   console.log(changedFields.datePickerTest.value.format());
};
/**
 * @description 任一表单域的值发生改变时的回调
 * @param {*} props
 * @param {*} changedValues
 * @param {*} allValues
 */
const onValuesChange = (props, changedValues, allValues) => {
  console.log(allValues);
};

@Form.create({
  onFieldsChange,
  onValuesChange,
})
class SearchForm extends PureComponent {
  constructor(prop) {
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
  mapInput(inputConfig) {
    const {
      form: { getFieldDecorator },
      md = 6,
      sm = 12,
      xl = 6,
      xxl = 6,
      useCol,
    } = this.props;
    const InputList = inputConfig.map((inputItem, index) => {
      const { label, name, md: inputMd, sm: inputSm, xl: inputXl, xxl: inputXxl } = inputItem;
      return (
        <RenderSearchCol key={name} useCol={useCol} md={inputMd || md} sm={inputSm || sm} xl={inputXl || xl} xxl={inputXxl || xxl}>
          <FormItem label={label}>
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
  handleSearch(e, isClear) {
    e.preventDefault();
    const { onSearch, defaultInput = [], moreInput = [] } = this.props;
    const formData = this.props.form.getFieldsValue();
    const simpleData = batchDataFormat(formData, getFormatFromConfig([...defaultInput, ...moreInput], 'format'));
    onSearch(simpleData, formData, isClear);
  }

  /**
   * @description 重置搜索表单
   * @author songs
   * @date 2019-07-10
   * @memberof SearchForm
   */
  handleFormReset(e) {
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
  toggleForm(e) {
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
  renderMoreList() {
    const {
      state: { moreToggle },
    } = this;
    const { moreInput, useCol, gutter } = this.props;
    if (!moreToggle) return null;
    return (
      <ReanerSearchRow useCol={useCol} gutter={gutter}>
        {this.mapInput(moreInput)}
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
        {this.state.moreToggle ? '收起' : '展开'} <Icon type={this.state.moreToggle ? 'up' : 'down'} />
      </a>
    );
  }

  render() {
    const { defaultInput, useCol, gutter } = this.props;
    return (
      <Form onSubmit={this.handleSearch}>
        <div className={styles.searchBox}>
          <div className={styles.searchInputBox}>
            <ReanerSearchRow useCol={useCol} gutter={gutter}>
              {this.mapInput(defaultInput)}
            </ReanerSearchRow>
            {this.renderMoreList()}
          </div>
          <div className={styles.searchButtonBox}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              {this.renderMoreBtn()}
            </span>
          </div>
        </div>
      </Form>
    );
  }
}

export default SearchForm;
