const { fetchRepoList, fetchTagList } = require('./request');
const Inquirer = require('inquirer');
const { wrapLoading, sleep } = require('./utils/index');
const downloadGitRepo = require('download-git-repo'); // 不支持promise
const path = require('path');
const util = require('util');

class Creator {
  constructor(projectName, targetDir) {
    this.name = projectName;
    this.target = targetDir;
    // 转换为promise的方法
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }
  async fetchRepo() {
    // 失败重新拉取
    let repo = await wrapLoading(fetchRepoList, 'waiting fetch template ');
    if (!repo) return;
    repo = repo.map((item) => item.name);

    let { rep } = await Inquirer.prompt({
      name: 'rep',
      type: 'list',
      choices: repo,
      message: 'please choose a template to create project',
    });
    return rep;
  }

  async fetchTag(repo) {
    let tags = await wrapLoading(fetchTagList, 'waiting fetch tag', repo);
    if (!tags) return;
    tags = tags.map((item) => item.name);

    let { tag } = await Inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tags,
      message: 'please choose a tag to create project',
    });
    return tag;
  }

  async download(repo, tag) {
    // 1、需要拼接成下载路径
    let requestUrl = `gsf-cli/${repo}${tag ? '#' + tag : ''}`;
    // 2、把资源下载到某个路径 (后续可以增加缓存功能, 应该下载到系统目录，稍后可以使用ejs handlebar 去渲染模板 最后生成结果再写入)
    this.downloadGitRepo(requestUrl, process.cwd(), `${repo}@${tag}`);
  }

  async create() {
    // 拉取模板
    // 采用远程拉取，github方式
    // 1、先去拉取当前组织下的模板

    let repo = await this.fetchRepo();
    // console.log('repo', repo);
    //2、在通过模板找到版本号
    let tag = await this.fetchTag(repo);
    // 3、下载
    let downloadUrl = await this.download(repo, tag);
    //4、编译模板

    console.log(this.name, this.target);
  }
}

module.exports = Creator;
