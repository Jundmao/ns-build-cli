import { Hook } from '@oclif/core'
import chalk from 'chalk'
import figlet from 'figlet'

const pjson = require('../../../package.json')

const hook: Hook<'welcome'> = async function () {
  await new Promise(resolve => {
    figlet(
      'NS',
      {
        font: 'Standard',
        horizontalLayout: 'full',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true,
      },
      function (err: any, data: any) {
        if (err) {
          console.log('Something went wrong...')
          console.dir(err)
          return
        }

        console.log(
          chalk.green(data),
          chalk.blue(
            `\n------ 🦅 NS ${pjson.version} 正在为您服务 ------\n\n`,
          ),
        )

        resolve(true)
      },
    )
  })
}

export default hook
