import chalk from 'chalk'

export const showTitle = (title: string): void => {
  console.log(chalk.bgGreen.bold(`\n ◼︎ ${title} ◼︎ \n`))
}
