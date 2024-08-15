import { Command } from '@oclif/core'
import spawn from 'cross-spawn'

export default class Tar extends Command {
  static description = '发布NPM包到顶象私有库'

  static examples = ['<%= config.bin %> <%= command.id %>']

  static flags = {}

  static args = []

  public async run(): Promise<void> {
    spawn(
      'npm',
      ['publish', '--registry', 'https://registry.dingxiang-inc.com'],
      {
        stdio: 'inherit',
      },
    )
  }
}
