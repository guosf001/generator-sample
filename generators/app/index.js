//此文件作为Generator 的核心入口
// 需要导出一个继承自 Yeoman Generator的类型
// yeoman generator 在工作时会自动调用我们在此类型定义的一些什么周期方法
// 我们在这些方法中可以通过调用父类提供的方法实现一些功能，例如文件写入

const Generator = require('yeoman-generator');

module.exports = class extends (
  Generator
) {
  prompting() {
    //yeoman在询问用户环节会自动调用此方法
    //在此方法中可以调用父类的prompt()方法发出对用户的命令行询问
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname, //appname 为项目生成目录名称
      },
    ]).then((answers) => {
      //answers => { name: 'user input value'}
      this.answers = answers;
    });
  }
  writing() {
    // yeoman 自动在生成文件阶段调用此方法
    //我们这里尝试往项目目录中写入文件
    //   this.fs.write(this.destinationPath('temp.txt'), Math.random().toString());
    //通过模板方式写入文件到文件目录
    //模板文件路径
    const tmpl = this.templatePath('bar.html');
    //输出目标路径
    const output = this.destinationPath('bar.html');
    //模板数据上下文
    const context = this.answers;

    this.fs.copyTpl(tmpl, output, context);
  }
};
