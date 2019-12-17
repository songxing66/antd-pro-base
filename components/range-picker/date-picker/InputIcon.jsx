import * as React from 'react';
import Icon from 'antd/lib/icon';
import classNames from 'classnames';
export default function InputIcon(props) {
    const { suffixIcon, prefixCls } = props;
    return ((suffixIcon &&
        (React.isValidElement(suffixIcon) ? (React.cloneElement(suffixIcon, {
            className: classNames({
                [suffixIcon.props.className]: suffixIcon.props.className,
                [`${prefixCls}-picker-icon`]: true,
            }),
        })) : (<span className={`${prefixCls}-picker-icon`}>{suffixIcon}</span>))) || <Icon type="calendar" className={`${prefixCls}-picker-icon`}/>);
}
