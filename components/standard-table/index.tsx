import * as React from 'react';
import { Table, Alert } from 'antd';
import { TableProps, ColumnProps } from 'antd/es/table';
import classNames from 'classnames';
import { PaginationProps } from 'antd/es/pagination';
const { PureComponent, Fragment } = React;

interface DataAny {
  [propName: string]: any;
}

interface StandardTableProps {
  prefixCls?: string;
  loading: boolean;
  tableProps?: TableProps<object>;
  pagination?: object;
  selectedRows?: any[];
  paginationProps?: PaginationProps;
  dataSource?: DataAny[];
  columns?: Array<DataAny>;
  rowKey?: any;
  scroll?: object | null;
  showSelect?: boolean;
  onChange?: (pagination: any, filters: any, sorter: any) => void;
  onSelectRow?: (selectedRows: any) => void;
}

interface StandardTableState {
  selectedRowKeys: any[];
  needTotalList: any[];
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

class StandardTable extends PureComponent<StandardTableProps, StandardTableState> {
  static defaultProps = {
    prefixCls: 'ant-standardtable',
  };

  static getDerivedStateFromProps(nextProps: { selectedRows: { length: number }; columns: any }) {
    // clean state
    if (nextProps.selectedRows && nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [] as any[],
        needTotalList,
      };
    }
    return null;
  }

  constructor(props: Readonly<StandardTableProps>) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);
    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

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

  handleTableChange = (pagination: object, filters: any, sorter: any) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const {
      dataSource = [],
      pagination,
      rowKey,
      scroll,
      showSelect,
      prefixCls,
      tableProps,
      paginationProps,
      columns,
    } = this.props;
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
        {console.log(dataSource, '------------------------')}
        <Table
          rowKey={rowKey || 'key'}
          scroll={scroll || {}}
          columns={columns}
          rowSelection={showSelect ? rowSelection : null}
          dataSource={dataSource}
          pagination={{ ...pagination, ...paginationProps }}
          onChange={this.handleTableChange}
          {...tableProps}
        />
      </div>
    );
  }
}

export default StandardTable;
