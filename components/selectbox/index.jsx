import React, { Component } from 'react';
import { Tag } from 'antd';
export default class SelectBox extends Component {
    constructor(props) {
        super(props);
        this.handleCloseTag = (value) => {
            const values = this.props.value.split('|').filter(val => val !== '' && val !== value);
            const nextProps = Object.assign({}, this.props, { value: values.join('|') });
            if (this.props.onChange) {
                this.props.onChange(nextProps);
            }
        };
        const { value, options } = this.props;
        this.state = {
            value,
            options,
        };
    }
    componentWillReceiveProps(nextProps) {
        const { value, options } = nextProps;
        this.setState({
            value,
            options,
        });
    }
    render() {
        const { name, text, type, prefixCls } = this.props;
        const { value, options } = this.state;
        const keyTitles = new Array();
        if (value !== '') {
            const keys = value.split('|');
            if (type === 'Select') {
                keys.forEach(key => {
                    const x = options.filter(opt => opt.key.toString() === key);
                    if (x.length > 0) {
                        keyTitles.push(x[0]);
                    }
                });
            }
            else {
                keys.forEach(key => {
                    keyTitles.push({ key, title: key });
                });
            }
        }
        return (<div key={name} className={`${prefixCls}-selecteditem`}>
        <span className={`${prefixCls}-selectedlabel`}>{text}：</span>
        {keyTitles.map(item => (<Tag key={item.key} closable onClose={() => this.handleCloseTag(item.key.toString())}>
            {item.title}
          </Tag>))}
      </div>);
    }
}
SelectBox.defaultProps = {
    prefixCls: 'ant-selectbox',
    name: '',
    text: '',
    options: Array(),
    value: '',
    type: 'Select',
};
