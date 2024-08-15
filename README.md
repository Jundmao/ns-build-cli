
<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g ns-build-cli
$ ns COMMAND
running command...
$ ns (--version)
ns-build-cli/1.0.2 darwin-x64 node-v16.12.0
$ ns --help [COMMAND]
USAGE
  $ ns COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`ns build`](#ns-build)
* [`ns eslint`](#ns-eslint)
* [`ns publish`](#ns-publish)
* [`ns start`](#ns-start)
* [`ns tar`](#ns-tar)
* [`ns vendor`](#ns-vendor)

## `ns build`

构建正式环境

```
USAGE
  $ ns build [--help] [-D] [-A]

FLAGS
  -A, --all    显示所有构建结果
  -D, --debug  开启调试模式
  --help       Show CLI help.

DESCRIPTION
  构建正式环境
```

## `ns eslint`

代码检查

```
USAGE
  $ ns eslint [--help] [--fix]

FLAGS
  --fix   是否自动修复
  --help  Show CLI help.

DESCRIPTION
  代码检查

EXAMPLES
  $ ns eslint
```

## `ns publish`

发布NPM包到顶象私有库

```
USAGE
  $ ns publish

DESCRIPTION
  发布NPM包到顶象私有库

EXAMPLES
  $ ns publish
```

## `ns start`

启动开发环境

```
USAGE
  $ ns start [--help] [--port <value>] [--host <value>] [--open]

FLAGS
  --help          Show CLI help.
  --host=<value>  [default: 0.0.0.0] 网址
  --open          是否打开
  --port=<value>  [default: 8080] 端口号

DESCRIPTION
  启动开发环境
```

## `ns tar`

为子应用生成tar包

```
USAGE
  $ ns tar

DESCRIPTION
  为子应用生成tar包
```

## `ns vendor`

构建vendor文件

```
USAGE
  $ ns vendor

DESCRIPTION
  构建vendor文件

EXAMPLES
  $ ns vendor
```
<!-- commandsstop -->
