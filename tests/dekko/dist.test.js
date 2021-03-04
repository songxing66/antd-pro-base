const $ = require('dekko');
const chalk = require('chalk');

$('dist')
  .isDirectory()
  .hasFile('antd-with-locales.js')
  .hasFile('antd-with-locales.min.js')
  .hasFile('@songxizi/joy-pro.css')
  .hasFile('@songxizi/joy-pro.min.css')
  .hasFile('@songxizi/joy-pro.js')
  .hasFile('@songxizi/joy-pro.min.js')
  .hasFile('@songxizi/joy-pro.less');

// eslint-disable-next-line
console.log(chalk.green('✨ `dist` directory is valid.'));
