/*
 * @描述:联动过滤表单组件
 * @Author: /songzi
 * @Date: 2019-08-02 09:57:51
 * @Last Modified by: songzi
 * @Last Modified time: 2019-11-13 15:34:10
 */
import React, { PureComponent } from 'react';
import { Select, Button, Input } from 'antd';
import { generate as generateId } from 'shortid';
import { renderOptions } from './renderInputType';
import revDataTypeInputConfig from '@/utils/revDataTypeInputConfig';
import RenderInput from './RenderInput';
import styles from './ConnectionForm.less';

const { Option, OptGroup } = Select;

/**
 * @description 解析prop传过来的value对象为组件可用
 * @param {*} valueObj
 * @returns
 */
const ravValue = valueObj => {
  const { field } = valueObj;
  const fieldArr = field.split('.');
  const filedLast = fieldArr.pop();
  return { ...valueObj, fieldOptionValue: filedLast };
};

const revOptionName = optionItem => {
  const eventName = optionItem.event_name;
  const { groupName, name } = optionItem;
  const setVal = `${groupName}.${eventName ? `${eventName}.` : ''}${name}`;
  return setVal;
};

/**
 * @description 过滤出符合条件的datatype对应的input配置项
 * @param {*} dataTypeconfig
 * @param {*} options
 * @param {*} field
 * @returns
 */
const fiterDataType = (dataTypeconfig, dataType) => {
  const dataTypeOption = dataTypeconfig[dataType] || [];
  return dataTypeOption;
};

class ConnectionForm extends PureComponent {
  /**
   * @description  react生命周期函数（从props中获取state）
   * @author songs
   * @date 2019-08-02
   * @static
   * @param {*} nextProps
   * @returns
   * @memberof ConnectionForm
   */
  static getDerivedStateFromProps(nextProps, oldeProps) {
    const { options } = nextProps;
    if ('value' in nextProps) {
      return {
        options,
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);
    const value = props.value || props.defaultValue || {};
    const usedVal = ravValue(value);
    const { options = [] } = this.props;
    this.state = {
      funcName: usedVal.funcName || '',
      field: usedVal.field || '',
      fieldOptionValue: usedVal.fieldOptionValue || '',
      dataType: usedVal.dataType,
      params: usedVal.params || [],
      paramsOptionList: [],
    };
    this.checkGetParmas();
  }

  checkGetParmas = () => {
    // import { config, functionInput };
    const { funcConfig, getParams, options } = this.props;
    const { functionInput } = funcConfig;
    const { fieldOptionValue, funcName } = this.state;
    const { setParamsOption } = this;
    const inputTypeConfig = functionInput[funcName];
    if (inputTypeConfig && /select/.test(inputTypeConfig.type) && getParams) {
      const optionsItem = options.filter(item => item.name === fieldOptionValue)[0];
      getParams(optionsItem, setParamsOption);
    }
  };

  setParamsOption = paramsOptionList => {
    this.setState({ paramsOptionList });
  };

  /**
   * @description  functionname表单 change事件
   * @param {*} value
   * @returns
   */
  handleFuncNameChange = value => {
    const {
      funcConfig: { functionInput },
    } = this.props;
    const { triggerChange, checkGetParmas } = this;
    const inputTypeConfig = functionInput[value];
    this.setState({ funcName: value, params: [] }, checkGetParmas);
    if (!inputTypeConfig) {
      triggerChange();
    }
  };

  /**
   * @description 字段表单change事件
   * @param {*} value
   */
  handleNameChange = value => {
    const {
      options = [],
      funcConfig: { config },
    } = this.props;
    const optionItem = options.filter(item => item.name === value)[0];
    const dataType = optionItem.data_type;
    const dataTypeOption = fiterDataType(config, dataType);
    const funcName = dataTypeOption[0] ? dataTypeOption[0].funcName : '';
    const filed = revOptionName(optionItem);
    this.handleFuncNameChange(funcName);
    this.setState({ filed, fieldOptionValue: value, dataType });
  };

  /**
   * @description 参数表单change事件
   * @param {*} value
   */
  handleParamsChange = value => {
    const { triggerChange } = this;
    const valueType = value.constructor.name;
    const setStateObj = { params: value };
    if (valueType === 'SyntheticEvent') {
      setStateObj.params = [value.target.value];
    }
    this.setState(setStateObj, triggerChange);
  };

  /**
   * @description 最终表单change通知事件
   */
  triggerChange = () => {
    const { funcName, field, params, dataType } = this.state;
    const { onChange } = this.props;
    if (onChange) {
      onChange({ field, funcName, params, dataType });
    }
  };

  render() {
    const {
      size,
      options,
      funcConfig: { functionInput, config },
    } = this.props;
    const { funcName, fieldOptionValue, params, paramsOptionList, dataType } = this.state;
    const { handleParamsChange } = this;
    /**
     * @description 判断是否需要渲染parmas表单组件并输出组件
     * @returns
     */
    const needRnderInput = () => {
      const configInfo = functionInput[funcName];
      if (!configInfo) return <></>;
      const inputConfig = revDataTypeInputConfig(configInfo, { onChange: handleParamsChange, value: params, style: { width: 300 } }, { paramsOptionList });
      return (
        <div className={styles.connectionFormItem}>
          <RenderInput {...inputConfig}></RenderInput>
        </div>
      );
    };

    return (
      <div className={`${styles.connectionForm} "clearfix"`}>
        <div className={styles.connectionFormItem}>
          <Select title="lelellel" value={fieldOptionValue} style={{ width: 180 }} onChange={this.handleNameChange}>
            {renderOptions(options, 'name', 'cname')}
          </Select>
        </div>
        <div className={styles.connectionFormItem}>
          <Select title="funcName" value={funcName} size={size} style={{ width: 180 }} onChange={this.handleFuncNameChange}>
            {options.length && renderOptions(fiterDataType(config, dataType), 'funcName', 'cname')}
          </Select>
        </div>
        {needRnderInput()}
      </div>
    );
  }
}

export default ConnectionForm;
