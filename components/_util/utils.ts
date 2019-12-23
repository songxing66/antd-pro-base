/*
 * @描述: 项目小工具集合
 * @Author: /songzi
 * @Date: 2019-07-11 12:52:36
 * @Last Modified by: songzi
 * @Last Modified time: 2019-12-23 11:30:32
 */

/**
 * @description 批量格式化数据中的monent数据
 * @param {object} data form原始数据
 * @param {object} formateConfig from format配置项
 */
const batchDataFormat = (data: { [x: string]: any }, formatConfig: any[]) => {
  const dataKeys = Object.keys(data);
  const newData: any = {};
  dataKeys.forEach(key => {
    const hasMoment =
      Object.prototype.toString.call(data[key]) === '[object Array]' ? data[key][0] : data[key];
    if (!(hasMoment instanceof Object) || hasMoment.constructor.name !== 'Moment') {
      newData[key] = data[key];
      return;
    }
    const formatObj = formatConfig.filter(item => item.name === key);
    const format = formatObj.length ? formatObj[0].format : 'YYYY-MM-DD';
    if (!Array.isArray(data[key])) {
      newData[key] = data[key].format(format);
      return;
    }
    newData[key] = data[key].map((item: { format: (arg0: any) => any }) => item.format(format));
  });
  return newData;
};
/**
 * @description 从配置项中获取单独一项配置属性
 * @param {object} config 配置项原始数据
 * @param {string} fildeName 配置项名称
 * @returns
 */
const getFormatFromConfig = (config: any[], fildeName: string) => {
  const filterFormat = config.filter(item => item[fildeName]);
  const filterMap = filterFormat.map(item => {
    const { name } = item;
    const fildeVal = item[fildeName];
    return {
      name,
      [fildeName]: fildeVal,
    };
  });
  return filterMap;
};

/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        传入函数，最后一个参数是额外增加的this对象，.apply(this, args) 这种方式，this无法传递进函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
function debounce(func: { call: (arg1: any, ...arg2: any) => any }, wait: number, immediate: any) {
  let timeout: any;
  let args: any;
  let context: any;
  let timestamp: any;
  let result: any;
  function later() {
    // 据上一次触发时间间隔
    const last = Number(new Date()) - timestamp;

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.call(context, ...args, context);
        if (!timeout) {
          context = args = null;
        }
      }
    }
  }
  return function set(..._args: any[]) {
    // console.log(_args);
    context = this;
    args = _args;
    timestamp = Number(new Date());
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = func.call(context, ...args, context);
      context = args = null;
    }
    return result;
  };
}

/**
 * @description 初始化table配置中的total
 * @param {*} columns
 * @returns
 */
const initTotalList = (columns: any[]) => {
  const totalList: any[] = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
};

/**
 * @description 获取obj的值
 * @param {*} obj
 */
const getValue = (obj: { [x: string]: any }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/**
 * @description 展开树
 * @param {*} tree 树结构对象
 */
const breadthSearch = (tree: any): any => {
  let stark: any[] = [];
  stark = stark.concat(tree);
  while (stark.length) {
    const temp = stark.shift();
    if (temp.child) {
      stark = stark.concat(temp.child);
    }
  }
  return stark;
};

/**
 * @description 树结构查询
 * @param {*} key
 * @param {*} value
 * @param {*} dataArry
 */
const treeQuery = (key: string | number, value: any, dataArry: any) => {
  let stark: any[] = [];
  stark = stark.concat(dataArry);
  while (stark.length) {
    const temp = stark.shift();
    if (temp.child) {
      stark = stark.concat(temp.child);
    }
    if (temp[key] === value) {
      return temp;
    }
  }
  return {};
};

/**
 * @description 解析数据中的某一项为option数据
 * @param {Array} data data数组
 * @param {String} valueType 指定作为值的字段名称
 * @param {String} nameType 指定作为lable的字段名称
 * @returns
 */
const revOption = (
  data: Array<any> = [],
  valueType: string | number,
  nameType: string | number,
) => {
  const optionValue = data.map(item => item[valueType]);
  const optionName = data.map(item => item[nameType]);
  return { optionValue, optionName };
};

const fraction = (num1: any, num2: any) => {
  function gcd(a: number, b: number): any {
    // 欧几里德算法
    return b === 0 ? a : gcd(b, a % b);
  }
  const aNum = num1;
  const bNum = num2;
  // 约分操作
  if (aNum === 0 || bNum === 1) return 0; // 如果分子是0或分母是1就不用约分了
  const e = gcd(aNum, bNum);
  const newANum = aNum / e;
  const newBNum = bNum / e;
  return newANum / newBNum === 1 ? 1 : `${newANum}/${newBNum}`;
};

/*
 * 数字序号转字符串序号  0 => "A"
 */
const indexToString = (index: any) => {
  let charcode;
  return index
    .toString(26)
    .split('')
    .map((item: string) => {
      charcode = item.charCodeAt(0);
      charcode += charcode >= 97 ? 10 : 49;
      return String.fromCharCode(charcode);
    })
    .join('')
    .toUpperCase();
};

/*
 * 字符串序号转数字序号  "A" => 0
 */
const stringToIndex = (str: string) => {
  let charcode;
  return parseInt(
    str
      .toLowerCase()
      .split('')
      .map(item => {
        charcode = item.charCodeAt(0);
        charcode -= charcode < 107 ? 49 : 10;
        return String.fromCharCode(charcode);
      })
      .join(''),
    26,
  );
};

export {
  batchDataFormat,
  getFormatFromConfig,
  debounce,
  getValue,
  initTotalList,
  treeQuery,
  revOption,
  fraction,
  indexToString,
  stringToIndex,
  breadthSearch,
};
