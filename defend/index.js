var spawn = require('child_process').spawn;
var process = require('process');

var p = spawn('node',['./child.js'], {
  detached : true,
  stdio: 'pipe'
});
p.stdout.on('data', function (data, err) {
  console.log('child say:')
  console.log('stdout: ' + data);
  console.log(err)
});
console.log(process.pid, p.pid);
p.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

p.on('close', function (code) {
  console.log('子进程已退出，退出码 '+code);
});

/**
 * 
 * 守护进程是一个在后台运行并且不受任何终端控制的进程。（像pm2\forever）
 * 比如 defend 文件夹中的 index 主进程，当运行后，关闭了命令行，该进程就会结束。
 * 而 守护进程 会一直运行在后台，如果我们想应用持久稳定的运行项目，
 * 就需要守护进程，spawn 方法的 detached: true 可以将child 进程变为守护进程
 * 你可以运行该 demo， 当命令行关闭时，父进程结束，子进程仍在执行 （活动监视器可以看到）  
 * 问题来了：
 * 小明编写的守护进程 child.js 线上一直有报错，一报错整个child服务都崩溃了，崩溃后大批用户受到影响，问题难以查找，
 * 所以组长对他提出了三个要求，再解决不掉就要回家种地了：
 * - 在执行完 `node index` 后，父进程会关闭掉
 * - child 崩溃后要迅速重启，不要影响客户
 * - 崩溃后将报错信息保存在log文件里，方便排查
 * 你能帮他实现一个优雅的方案吗？（不使用 pm2\forever 等等守护进程库）
 */ 