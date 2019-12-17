import React, { PureComponent, Fragment } from 'react';
import { Button, Popconfirm } from 'antd';
class ButtonPlus extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (<Fragment>
        <Popconfirm title="Are you sure delete this task?" okText="Yes" cancelText="No">
          <Button>测试按钮</Button>
        </Popconfirm>
        ,
      </Fragment>);
    }
}
export default ButtonPlus;
