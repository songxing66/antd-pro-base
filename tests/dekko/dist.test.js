const $ = require('dekko');
const chalk = require('chalk');

$('dist')
  .isDirectory()
  .hasFile('antd-with-locales.js')
  .hasFile('antd-with-locales.min.js')
  .hasFile('@joy/joy-pro.css')
  .hasFile('@joy/joy-pro.min.css')
  .hasFile('@joy/joy-pro.js')
  .hasFile('@joy/joy-pro.min.js')
  .hasFile('@joy/joy-pro.less');

// eslint-disable-next-line
console.log(chalk.green('✨ `dist` directory is valid.'));
