const fs = require('fs-extra'); //  额外增强的fs包
const path = require('path');
const inquirer = require('inquirer');
const Creator = require('./Creator');

module.exports = async function (proName, args) {
  // 创建项目
  const cwd = process.cwd(); // 获取当前命令执行时的工作目录
  const targetDir = path.join(cwd, proName); // 目标目录

  if (fs.pathExistsSync(targetDir)) {
    if (args.force) {
      // 如果强制创建，删除已有的
      // 如果强制安装  删除已有的
      await fs.remove(targetDir);
    } else {
      // 提示用户是否要覆盖
      let { action } = await inquirer.prompt([
        //配置询问的方式
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists pick an action:',
          choices: [
            { name: 'Overwrite', value: 'overwrite' },
            { name: 'Cancel', value: false },
          ],
        },
      ]);
      if (!action) {
        return;
      } else if (action === 'overwrite') {
        console.log(`\r\nRemoving...`);
        await fs.remove(targetDir);
      }
    }
  }

  // 创建
  const create = new Creator(proName, targetDir);
  create.create();
};
