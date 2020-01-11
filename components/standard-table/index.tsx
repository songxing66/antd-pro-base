import * as React from 'react';
import { Table, Alert } from 'antd';
import { TableProps, ColumnProps } from 'antd/es/table';
import WatermarkDom from '@joy/watermarkjs';
import { generate as generateId } from 'shortid';
import classNames from 'classnames';
const { Fragment } = React;

interface DataAny {
  [propName: string]: any;
}

interface StandardTableProps extends TableProps<Object> {
  isWatermark?: boolean;
  watermark?: object;
  prefixCls?: string;
  selectedRows?: any[];
  showSelect?: boolean;
  onChange?: (pagination: any, filters: any, sorter: any) => void;
  onSelectRow?: (selectedRows: any) => void;
}

interface StandardTableState {
  selectedRowKeys?: any[];
  needTotalList?: any[];
  tableBoxId?: string;
  watermark?: object;
  isWatermark?: boolean;
}

function initTotalList(columns: Array<DataAny & ColumnProps<DataAny>>) {
  const totalList: object[] = [];
  columns.forEach((column: DataAny) => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends React.PureComponent<StandardTableProps, StandardTableState> {
  static defaultProps = {
    prefixCls: 'ant-standardtable',
    watermark: {},
  };

  static getDerivedStateFromProps(nextProps: StandardTableProps, oldState: StandardTableState) {
    let nextState: StandardTableState = {};
    // 计算选中行
    if (nextProps.selectedRows && nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      nextState = {
        selectedRowKeys: [] as any[],
        needTotalList,
      };
    }
    // 判断props.watermark数据有没有改变？更新state:保持state不变
    if (nextProps.isWatermark && oldState.watermark !== nextProps.watermark) {
      nextState.watermark = nextProps.watermark || {};
    }
    return Object.keys(nextState).length ? nextState : null;
  }

  public tableBoxId = generateId(8);
  public watermarkObj: any = null;
  constructor(props: Readonly<StandardTableProps>) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);
    const tableBoxId = generateId(8);
    this.state = {
      selectedRowKeys: [],
      needTotalList,
      tableBoxId,
      isWatermark: false,
      watermark: {},
    };
  }

  componentDidMount = () => {
    const { isWatermark } = this.props;
    const { tableBoxId, watermark = {} } = this.state;
    if (isWatermark) {
      this.watermarkObj = new WatermarkDom({ watermark_parent_node: tableBoxId, ...watermark });
    }
  };
  componentDidUpdate = (prevProps: StandardTableProps) => {
    const { watermarkObj } = this;
    const { watermark } = this.state;
    const { isWatermark } = prevProps;
    if (isWatermark && watermark !== prevProps.watermark) {
      watermarkObj.load(watermark || {});
    }
  };
  componentWillUnmount = () => {
    const { isWatermark = {} } = this.props;
    const { watermarkObj } = this;
    if (isWatermark && watermarkObj) {
      watermarkObj.destroy();
      this.watermarkObj = null;
    }
  };
  /**
   * @description 多选事件触发回调函数
   * @param {any[]} selectedRowKeys
   * @param {any[]} selectedRows
   */
  handleRowSelectChange = (selectedRowKeys: any[], selectedRows: any[]) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex]), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }
    this.setState({ selectedRowKeys, needTotalList });
  };

  /**
   * @description 表格操作改变事件回调函数
   * @param {object} pagination
   * @param {*} filters
   * @param {*} sorter
   */
  handleTableChange = (pagination: object, filters: any, sorter: any) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  /**
   * @description 清空所有选项
   */
  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList, tableBoxId } = this.state;
    // ...reset
    const { prefixCls, selectedRows = [], showSelect, onChange, ...reset } = this.props;
    const rowSelection = selectedRowKeys
      ? {
          selectedRowKeys,
          onChange: this.handleRowSelectChange,
          getCheckboxProps: (record: { disabled: any }) => ({
            disabled: record.disabled,
          }),
        }
      : null;
    const showSelectInfo = () => (
      <div className={classNames(`${prefixCls}-alert`)}>
        <Alert
          message={
            <Fragment>
              已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
              {needTotalList.map(item => (
                <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                  {item.title}
                  总计&nbsp;
                  <span style={{ fontWeight: 600 }}>
                    {item.render ? item.render(item.total) : item.total}
                  </span>
                </span>
              ))}
              <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                清空
              </a>
            </Fragment>
          }
          type="info"
          showIcon
        />
      </div>
    );

    return (
      <div className={classNames(prefixCls)}>
        {showSelect && showSelectInfo()}

        <div id={tableBoxId}>
          <Table
            rowSelection={showSelect ? rowSelection : null}
            onChange={this.handleTableChange}
            {...reset}
          />
        </div>
      </div>
    );
  }
}

export default StandardTable;
