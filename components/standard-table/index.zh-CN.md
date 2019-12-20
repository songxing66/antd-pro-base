---
category: Components
type: 表格
title: StandardTable
subtitle: 基础表格
---

### 基础表格业务组件,基于业务二次封装

## 何时使用

- 适用于基础表格展示以及对表格操作

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 展示 loading | boolean | false |
| dataSource | 表格数据 | object[] | [] |
| tableProps | 更多表格属性配置 属性参考 `antd.Table` | `TableProps<object>` | [] |
| pagination | 分页数据 `{ total: 14, pageSize: 10, current: 1 }` | object | - |
| selectedRows | 选中的行数据列表 | array | - |
| paginationProps | 更多分页属性配置 属性参考 `antd.Pagination` | `PaginationProps<object>` | - |
| columns | 表格列配置数组 属性参考 `antd.Table` | object[] | [] |
| rowKey | 表格-行的唯一值 | string | - |
| scroll | 超过多少滚动 | object | null |
| showSelect | 显示多选 | boolean | - |
| onChange | 表格操作事件监听 | function | [] |
| onSelectRow | 表格行被选中事件监听 | function | - |
