/**
 * get ns config
 */
const fs = require('node:fs')
const path = require('node:path')

module.exports = () => {
  const nsConfigPath = path.join(process.cwd(), 'ns.config.js')
  const nsConfig = fs.existsSync(nsConfigPath)
    ? require(nsConfigPath)
    : {}

  return nsConfig
}
