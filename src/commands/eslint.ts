import { exit } from 'node:process'
import { Command, Flags } from '@oclif/core'
import { ESLint } from 'eslint'
import ora from 'ora'

export default class EslintCommand extends Command {
  static description = '代码检查'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {
    help: Flags.help(),
    fix: Flags.boolean({ description: '是否自动修复' }),
  }

  static args = []

  public async run(): Promise<void> {
    const spinner = ora({
      text: '正在检查文件',
      spinner: 'aesthetic',
    }).start()

    try {
      const { flags } = await this.parse(EslintCommand)
      const eslint = new ESLint({ fix: flags.fix })
      const source_pattern = 'src/**/*.{js,jsx,ts,tsx}'
      const results = await eslint.lintFiles([source_pattern])

      await ESLint.outputFixes(results)

      const formatter = await eslint.loadFormatter()
      const resultText = await formatter.format(results)

      this.log(resultText)

      const fixCount = results.filter(item => !!item.output).length

      spinner.succeed(
        `完成 ${results.length} 个文件检查，自动修复 ${fixCount} 个文件`,
      )
    } catch (error) {
      spinner.fail(`文件检查报错\n ${error}`)
    }
  }
}
