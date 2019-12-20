---
order: 1
title:
  zh-CN: 纵向布局
  en-US: SearchForm
---

## zh-CN

## en-US

```jsx
import { SearchForm } from '@joy/joy-pro';
import moment from 'moment';
const optionData = [
  {
    name: '选项1',
    value: 1,
  },
  {
    name: '选项2',
    value: 2,
  },
  {
    name: '选项3',
    value: 3,
  },
];
const optionData2 = [
  {
    cname: '选项1',
    id: 11,
  },
  {
    cname: '选项2',
    id: 22,
  },
  {
    cname: '选项3',
    id: 33,
  },
];
const inputConfig = [
  {
    type: 'input',
    name: 'userId',
    placeholder: '请输入用户ID',
    label: '用户 ID',
    defaultValue: 1,
  },
  {
    type: 'input',
    name: 'phone',
    placeholder: '请输入手机号',
    label: '手机号码',
    defaultValue: 123423423,
  },
  {
    type: 'input',
    name: 'cityName',
    placeholder: '请输入城市名称',
    label: '城市名称',
    defaultValue: '北京',
  },
  {
    type: 'select',
    placeholder: '请选择客户端类型',
    defaultValue: 1,
    name: 'client',
    optionData,
    label: '应用类型',
  },
  {
    type: 'select',
    placeholder: '请选择客户端类型',
    defaultValue: 22,
    name: 'client2',
    optionData: optionData2,
    valueFiled: 'id',
    nameFiled: 'cname',
    label: '应用类型2',
  },
  {
    type: 'input',
    name: 'appName',
    placeholder: '请输入包名',
    label: '搜索包名',
    defaultValue: 'sdasdas',
  },
  {
    type: 'rangePicker',
    name: 'regTime',
    label: '注册时间',
    format: 'YYYY-MM-DD',
    defaultValue: [moment('2015-01-01', 'YYYY-MM-DD'), moment('2015-01-03', 'YYYY-MM-DD')],
    grid: { sm: 24, md: 12 },
  },
];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  actionSearch = (formData, reaclData, isClear) => {
    console.log(formData, reaclData, isClear);
  };

  render() {
    return (
      <div>
        <SearchForm
          defaultInput={inputConfig}
          onSearch={this.actionSearch}
          formProp={tailFormItemLayout}
          formItemProp={formItemLayout}
        ></SearchForm>
      </div>
    );
  }
}
ReactDOM.render(<App />, mountNode);
```

<style>
.ant-col-12 {
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
}
</style>
