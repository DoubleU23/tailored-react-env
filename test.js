import {exec, spawn} from 'child_process'

const test = spawn(
      // 'node ' + path.normalize(path.join(config.rootDir, 'webpack', 'hotserver')),
      '/bin/ping', ['localhost']
      // (err, stdout, stderr) => {
      //   console.log('err:' + err)
      //   console.log('stdout:' + stdout)
      //
      //   console.log('stderr: ' + stderr)
      // }
    )

    test.stdout.on('data', (data) => {
      console.log('data_: ' + data)
    });
