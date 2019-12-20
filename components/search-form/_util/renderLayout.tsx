/*
 * @描述:  渲染搜索组件布局
 * @Author: /songzi
 * @Date: 2019-07-10 16:15:55
 * @Last Modified by: songzi
 * @Last Modified time: 2019-12-20 13:32:21
 */

import * as React from 'react';
import { Row, Col } from 'antd';
import { colType } from '../../_util/searchFormProp';
const { Fragment } = React;
export interface SearchGridProps {
  useCol?: colType;
  gutter?: object;
  grid?: colType;
}
/**
 * @description 根据useCol 参数判断是否启用 栅格 col布局
 * @param {*} prop
 * @returns
 */

const RenderSearchCol: React.SFC<SearchGridProps> = ({ useCol, children, grid }) => {
  if (!useCol) return <Fragment>{children}</Fragment>;
  const _grid = grid || useCol;
  return <Col {..._grid}>{children}</Col>;
};

/**
 * @description 根据useCol 参数判断是否启用 栅格 row布局
 * @param {*} prop
 * @returns
 */

const ReanerSearchRow: React.SFC<SearchGridProps> = ({ useCol, gutter, children }) => {
  if (!useCol) return <Fragment>{children}</Fragment>;
  return <Row gutter={gutter}>{children}</Row>;
};

export { ReanerSearchRow, RenderSearchCol };
