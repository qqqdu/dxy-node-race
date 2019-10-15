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