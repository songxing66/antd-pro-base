/* @remove-on-es-build-begin */
// this file is not used if use https://github.com/ant-design/babel-plugin-import
const ENV = process.env.NODE_ENV;
if (
  ENV !== 'production' &&
  ENV !== 'test' &&
  typeof console !== 'undefined' &&
  console.warn &&
  typeof window !== 'undefined'
) {
  console.warn(
    'You are using a whole package of antd, ' +
      'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  );
}
/* @remove-on-es-build-end */
export { default as DatePicker } from './range-picker';
export { default as SelectDown } from './selectdown';
export { default as SelectBox } from './selectbox';
export { default as SearchTemplate } from './search-template';
export { default as SearchForm } from './search-form';
export { default as StandardTable } from './standard-table';
