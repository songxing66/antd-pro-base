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

更多 table API 请参考 antd-table

| 参数        | 说明                 | 类型     | 默认值   |
| ----------- | -------------------- | -------- | -------- |
| showSelect  | 显示多选             | boolean  | -        |
| onChange    | 表格操作事件监听     | function | []       |
| onSelectRow | 表格行被选中事件监听 | function | -        |
| isWatermark | 是否开启水印         | Boolean  | false    |
| watermark   | 水印配置项           | object   | 参考下表 |

水印配置表

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| watermark_id | 水印总体的 id | string | 'wm_div_id' |
| watermark_prefix | 小水印的 id 前缀 | string | 'mask_div_id' |
| watermark_txt | 水印的内容 | string | "测试水印" |
| watermark_x | 水印起始位置 x 轴坐标 | number | 20 |
| watermark_y | 水印起始位置 Y 轴坐标 | number | 20 |
| watermark_rows | 水印行数 | number | 0 |
| watermark_cols | 水印列数 | number | 0 |
| watermark_x_space | 水印 x 轴间隔 | number | 100 |
| watermark_y_space | 水印 y 轴间隔 | number | 50 |
| watermark_font | 水印字体 | string | '微软雅黑' |
| watermark_color | 水印字体颜色 | string | 'black' |
| watermark_fontsize | 水印字体大小 | string | '18px' |
| watermark_alpha | 水印透明度，要求设置在大于等于 0.005 | number | 0.15 |
| watermark_width | 水印宽度 | number | 100 |
| watermark_height | 水印长度 | number | 100 |
| watermark_angle | 水印倾斜度数 | number | 15 |
| watermark_parent_width | 水印的总体宽度（默认值：body 的 scrollWidth 和 clientWidth 的较大值） | number | 0 |
| watermark_parent_height | 水印的总体高度（默认值：body 的 scrollHeight 和 clientHeight 的较大值） | number | 0 |
| watermark_parent_node | 水印插件挂载的父元素 element,不输入则默认挂在 body 上 | object | null |
