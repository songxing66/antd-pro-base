---
category: Components
type: form组件
title: SearchForm
subtitle: 搜索表单
---

### 搜索表单，适用于 table 列表的组合查询

## 何时使用

- 如果是为了显示普通表单的选择，建议使用 antd 的选择器
- 这里主要是用于对列表的多组合查询，进行多条件过滤选择使用。

## API

| 参数         | 说明               | 类型     | 默认值 |
| ------------ | ------------------ | -------- | ------ |
| defaultInput | 默认表单配置数组   | object[] | []     |
| moreInput    | 更多表单配置数组   | object[] | []     |
| gutter       | 表单间距           | object   | -      |
| useCol       | 是否应用 grid 布局 | object   | -      |
| onSearch     | 表单 search 回调   | function | -      |

### defaultInput && defaultInput 元素对象属性

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | input 类型 `'input'| 'select'| 'inputNumber'| 'datePicker'| 'monthPicker'| 'rangePicker'| 'weekPicker'` | string | 'input' |
| placeholder | 空值提示 | string | - |
| defaultValue | 默认值 | number/sting | - |
| name | input name(唯一性) | string | - |
| label | input 标题 | string | - |
| optionData | select 数据列表（仅对 select 有效）`[{name:"",value:""}]` | object[] | - |
| valueFiled | 指定 optionData 中的对象字段名作为 value 字段（仅对 select 有效） | string | value |
| nameFiled | 指定 optionData 中的对象字段名作为 name 字段（仅对 select 有效 | string | name |
| format | 时间格式化（仅对时间类型的 input 有效） | string | YYYY-MM-DD HH:mm |
| grid | input 独立设置 grid 栏数（设置 useCol 时生效） | object | - |

### optionData

### useCol props && useCol props && defaultInput.grid props && defaultInput.grid props

| 参数 | 说明    | 类型   | 默认值 |
| ---- | ------- | ------ | ------ |
| xs   | <576px  | number | -      |
| sm   | ≥576px  | number | -      |
| md   | ≥768px  | number | -      |
| lg   | ≥992px  | number | -      |
| xl   | ≥1200px | number | -      |
| xxl  | ≥1600px | number | -      |
