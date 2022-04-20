const ora = require('ora');

async function sleep(n) {
  return new Promise((resolve) => setTimeout(resolve, n));
}

async function wrapLoading(fn, message, ...args) {
  console.log();
  // 制作了等待的loading
  const spinner = ora(message);
  spinner.start(); // 开启loading
  try {
    let repo = await fn(...args);
    spinner.succeed(); //成功
    return repo;
  } catch (error) {
    spinner.fail('request failed, refresh ...');
    await sleep(1000);
    return wrapLoading(fn, message, ...args); // 重新
  }
}

module.exports = {
  sleep,
  wrapLoading,
};
