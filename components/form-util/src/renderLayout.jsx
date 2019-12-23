/*
 * @描述:  渲染搜索组件布局
 * @Author: /songzi
 * @Date: 2019-07-10 16:15:55
 * @Last Modified by: songzi
 * @Last Modified time: 2019-07-10 19:32:41
 */

import React, { PureComponent, Fragment } from 'react';
import { Row, Col } from 'antd';

/**
 * @description 根据useCol 参数判断是否启用 栅格 col布局
 * @param {*} prop
 * @returns
 */
const RenderSearchCol = prop => {
  const { useCol, md, sm, xl, xxl, children } = prop;
  if (!useCol) return children;
  return (
    <Col md={md} sm={sm} xl={xl} xxl={xxl}>
      {children}
    </Col>
  );
};

/**
 * @description 根据useCol 参数判断是否启用 栅格 row布局
 * @param {*} prop
 * @returns
 */
const ReanerSearchRow = prop => {
  const { useCol, gutter, children } = prop;
  if (!useCol) return children;
  return <Row gutter={gutter}>{children}</Row>;
};
export { ReanerSearchRow, RenderSearchCol };
