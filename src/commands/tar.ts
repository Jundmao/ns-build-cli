import fs from 'node:fs'
import path from 'node:path'
import { Command } from '@oclif/core'
import ora from 'ora'
import spawn from 'cross-spawn'
import chalk from 'chalk'

export default class Tar extends Command {
  static description = '为子应用生成tar包'

  public async run(): Promise<void> {
    const tarFilename = 'build.tar.gz'
    const tarDir = 'build'
    const spinner = ora({
      text: '正在打包中',
      spinner: 'aesthetic',
    }).start()
    const dirPath = path.join(process.cwd(), tarDir)

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    }

    const child = spawn('tar', ['-zcvf', tarFilename, tarDir])

    child.stderr?.setEncoding('utf8')
    child.stderr?.on('data', (data: any) => {
      data
        .toString()
        .split('\n')
        .forEach((line: string) => {
          spinner.text = line
        })
    })

    child.on('close', () => {
      spinner.succeed(`🎉 ${chalk.yellow(tarFilename)} 打包完成`)
    })
  }
}
