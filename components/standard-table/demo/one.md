---
order: 1
title:
  zh-CN: 基础表格
  en-US: SearchForm
---

## zh-CN

## en-US

```jsx
import { StandardTable } from '@songxizi/joy-pro';
import { Popconfirm, Switch, message, Icon } from 'antd';
import moment from 'moment';

const revOsType = type => {
  switch (type) {
    case 'Android':
      return 'android';
    case 'iOS':
      return 'apple';
    default:
      return 'question-circle';
  }
};
const dataList = [
  {
    userId: 1,
    cityName: '北京',
    phone: '12345677899',
    regTime: '2017-07-14T00:00:00.000Z',
    hideTime: '2017-07-14T00:00:00.000Z',
    OS: 'iOS',
    client: 1,
    appName: '测试包',
    channel: '测试渠道',
    jinyan: true,
    source: '二维码 ',
  },
  {
    userId: 2,
    cityName: '上海',
    phone: '12345677899',
    regTime: '2017-01-11T00:00:00.000Z',
    hideTime: '2017-10-14T00:00:00.000Z',
    OS: 'Android',
    client: 1,
    appName: '测试包1',
    jinyan: true,
    channel: '测试渠道1',
    source: '二维码1 ',
  },
  {
    userId: 3,
    cityName: '石家庄',
    phone: '12345677899',
    regTime: '2017-01-12T00:00:00.000Z',
    hideTime: '2017-07-14T00:00:00.000Z',
    OS: 'iOS',
    client: 2,
    appName: '测试包',
    channel: '测试渠道',
    jinyan: false,
    source: '二维码 ',
  },
  {
    userId: 4,
    cityName: '北京',
    phone: '12345677899',
    regTime: '2017-01-13T00:00:00.000Z',
    hideTime: '2017-07-14T00:00:00.000Z',
    OS: 'iOS',
    client: 3,
    appName: '测试包',
    channel: '测试渠道',
    jinyan: false,
    source: '二维码 ',
  },
  {
    userId: 5,
    cityName: '北京',
    phone: '12345677899',
    regTime: '2017-01-14T00:00:00.000Z',
    hideTime: '2017-07-14T00:00:00.000Z',
    OS: 'iOS',
    client: 4,
    appName: '测试包',
    channel: '测试渠道',
    jinyan: false,
    source: '二维码 ',
  },
  {
    userId: 6,
    cityName: '北京',
    phone: '12345677899',
    regTime: '2017-02-14T00:00:00.000Z',
    hideTime: '2017-07-14T00:00:00.000Z',
    OS: 'iOS',
    client: 1,
    appName: '测试包',
    channel: '测试渠道',
    jinyan: false,
    source: '二维码 ',
  },
  {
    userId: 7,
    cityName: '北京',
    phone: '12345677899',
    regTime: '2017-03-14T00:00:00.000Z',
    hideTime: '2017-07-14T00:00:00.000Z',
    OS: 'iOS',
    client: 1,
    appName: '测试包',
    channel: '测试渠道',
    jinyan: false,
    source: '二维码 ',
  },
  {
    userId: 8,
    cityName: '北京',
    phone: '12345677899',
    regTime: '2017-04-14T00:00:00.000Z',
    hideTime: '2017-07-14T00:00:00.000Z',
    OS: 'iOS',
    client: 2,
    appName: '测试包',
    channel: '测试渠道',
    jinyan: false,
    source: '二维码 ',
  },
  {
    userId: 9,
    cityName: '北京',
    phone: '12345677899',
    regTime: '2017-05-14T00:00:00.000Z',
    hideTime: '2017-07-15T00:00:00.000Z',
    OS: 'iOS',
    client: 5,
    appName: '测试包',
    jinyan: false,
    channel: '测试渠道',
    source: '二维码 ',
  },
];

const paginations = {
  total: 14,
  pageSize: 10,
  current: 1,
  showSizeChanger: true,
  showQuickJumper: true,
};
const OS = ['iOS', 'Android'];
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      sInfo: {
        watermark_txt: '测试水印.2019.12.12.192222', // 水印的内容
        watermark_color: '#ddd', // 水印字体颜色
        watermark_alpha: 0.4, // 水印透明度，要求设置在大于等于0.005
        watermark_x_space: 100, // 水印x轴间隔
        watermark_y_space: 100, // 水印y轴间隔
        watermark_width: 300, // 水印宽度
      },
    };
  }

  switchOnchange = (changeVal, columnItem) => {
    message.success(`用户：${columnItem.userId}已${changeVal ? '被禁言' : '恢复言论'}`);
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    console.log(pagination, filtersArg, sorter);
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleHideComment = (changeVal, columnItem) => {
    console.log(this);
    message.success(`用户：${columnItem.userId} 评论已隐藏`);
  };

  revcolumns = () => {
    const { switchOnchange, handleHideComment } = this;

    return [
      {
        title: '用户ID',
        sorter: true,
        dataIndex: 'userId',
        width: 100,
        // render: val => `${val} 万`,
        // needTotal: true,
        fixed: 'left',
      },
      {
        title: '城市',
        dataIndex: 'cityName',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        align: 'left',
        width: 150,
      },
      {
        title: '注册时间',
        dataIndex: 'regTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: '隐藏评论时间',
        dataIndex: 'hideTime',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span>,
      },
      {
        title: 'OS',
        dataIndex: 'OS',
        width: 80,
        filters: OS.map(item => ({ text: item, value: item })),
        render: val => <Icon type={revOsType(val)} />,
      },
      {
        title: '应用名称',
        dataIndex: 'appName',
      },
      {
        title: '渠道',
        dataIndex: 'channel',
      },
      {
        title: '下载来源',
        width: 100,
        dataIndex: 'source',
      },
      {
        title: '禁言',
        width: 90,
        dataIndex: 'jinyan',
        render: (val, record) => (
          <Switch defaultChecked={val} onChange={type => switchOnchange(type, record)} />
        ),
      },
      {
        title: '操作',
        fixed: 'right',
        width: 90,
        render: (text, record) => (
          <React.Fragment>
            <Popconfirm
              placement="top"
              title="隐藏评论"
              onConfirm={() => handleHideComment(true, record)}
              okText="确定"
              cancelText="取消"
            >
              <a>隐藏评论</a>
            </Popconfirm>
          </React.Fragment>
        ),
      },
    ];
  };

  render() {
    const { selectedRows, sInfo } = this.state;
    const { revcolumns } = this;
    return (
      <div>
        <StandardTable
          isWatermark
          watermark={sInfo}
          pagination={paginations}
          dataSource={dataList}
          selectedRows={selectedRows}
          showSelect
          scroll={{ x: 1490 }}
          columns={revcolumns()}
          rowKey="userId"
          onSelectRow={this.handleSelectRows}
          onChange={this.handleStandardTableChange}
        />
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
