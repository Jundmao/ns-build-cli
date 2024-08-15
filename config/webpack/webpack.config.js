/**
 * webpack config
 */
const fs = require('node:fs')
const path = require('node:path')
const moment = require('moment')
const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const getNsConfig = require('../_utils/getNsConfig')
const babelConfigFactory = require('../babel/.babelrc.js')

const nsConfig = getNsConfig()

const isEnvDevelopment = webpackEnv => webpackEnv === 'development'
const isEnvProduction = webpackEnv => webpackEnv === 'production'

const getMode = webpackEnv =>
  isEnvProduction(webpackEnv) ? 'production' : 'development'

const getEntry = isSubApp => {
  // 优先判断入口是否是ts文件
  const getEntryJsTs = name => {
    const indexJsPath = path.join(process.cwd(), 'src', `${name}.js`)
    const indexTsPath = path.join(process.cwd(), 'src', `${name}.ts`)
    const indexTsxPath = path.join(process.cwd(), 'src', `${name}.tsx`)
    const indexTsFile = fs.existsSync(indexTsPath)
    const indexTsxFile = fs.existsSync(indexTsxPath)

    if (indexTsFile) return indexTsPath

    if (indexTsxFile) return indexTsxPath

    return indexJsPath
  }

  if (isSubApp && nsConfig.mode === 'integrated') {
    return {
      main: getEntryJsTs('main'),
    }
  }

  return getEntryJsTs('index')
}

const getOutput = isSubApp => ({
  path: path.resolve(process.cwd(), 'build'),
  jsonpFunction: 'webpackJsonp' + Date.now(),
  chunkFilename: '[name].[hash:8].js',
  filename: isSubApp ? undefined : 'main.js',
})

const getDevtool = webpackEnv =>
  isEnvProduction(webpackEnv)
    ? false
    : isEnvDevelopment(webpackEnv) && 'eval-source-map'

const getResolve = () => ({
  modules: ['src', 'node_modules'],
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  alias: {
    '@utils': path.join(process.cwd(), 'src/utils'),
    '@constants': path.join(process.cwd(), 'src/constants'),
    '@components': path.join(process.cwd(), 'src/components'),
    '@containers': path.join(process.cwd(), 'src/containers'),
    '@decorators': path.join(process.cwd(), 'src/decorators'),
    // 兼容旧的目录名
    '@util': path.join(process.cwd(), 'src/util'),
    '@constant': path.join(process.cwd(), 'src/constant'),
    '@component': path.join(process.cwd(), 'src/component'),
    '@container': path.join(process.cwd(), 'src/container'),
    '@decorator': path.join(process.cwd(), 'src/decorator'),
    '@inject': path.join(process.cwd(), 'src/inject'),
    // Ns的依赖在项目开发环境中需要用到
    '@babel/runtime': path.join(
      require.resolve('@babel/runtime/regenerator'),
      '../../',
    ),
    'babel-plugin-react-css-modules': path.join(
      require.resolve('babel-plugin-react-css-modules'),
      '../../',
    ),
  },
})

const getResolveLoader = () => ({
  modules: ['node_modules'],
})

const getExternals = webpackEnv => {
  if (isEnvDevelopment(webpackEnv) && nsConfig.mode === 'independent') {
    return {
      'night-kay': 'nightKay',
    }
  }

  return {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
    'mobx': 'MobX',
    'mobx-react': 'MobXReact',
    'antd': 'antd',
    '@antv/g2': 'G2',
    '@antv/data-set': 'DataSet',
    'moment': 'moment',
    'ns-mfe': 'nsMfe',
  }
}

const getModule = webpackEnv => {
  const getJSLoader = webpackEnv => {
    const loaders = [
      {
        loader: require.resolve('babel-loader'),
        options: babelConfigFactory(webpackEnv),
      },
    ]

    return loaders
  }

  const getCssLoader = webpackEnv => {
    const loaders = [
      {
        loader: require.resolve('css-loader'),
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          plugins: [require('autoprefixer'), require('tailwindcss')()],
        },
      },
    ]

    if (isEnvDevelopment(webpackEnv)) {
      loaders.unshift({ loader: require.resolve('style-loader') })
    }

    if (isEnvProduction(webpackEnv)) {
      loaders.unshift(MiniCssExtractPlugin.loader)
    }

    return loaders
  }

  const getLessLoader = webpackEnv => {
    const localIdentName = isEnvDevelopment(webpackEnv)
      ? '[path][name]__[local]--[hash:base64:5]'
      : '[hash:base64]'
    const loaders = [
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: {
            localIdentName,
          },
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          plugins: [require('autoprefixer')],
        },
      },
      {
        loader: require.resolve('less-loader'),
        options: {
          lessOptions: {
            relativeUrls: false,
            javascriptEnabled: true,
          },
        },
      },
    ]

    if (isEnvDevelopment(webpackEnv)) {
      loaders.unshift({ loader: require.resolve('style-loader') })
    }

    if (isEnvProduction(webpackEnv)) {
      loaders.unshift(MiniCssExtractPlugin.loader)
    }

    return loaders
  }

  const getUILessLoader = webpackEnv => {
    const loaders = [
      { loader: require.resolve('css-loader') },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          plugins: [require('autoprefixer')],
        },
      },
      {
        loader: require.resolve('less-loader'),
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ]

    if (isEnvDevelopment(webpackEnv)) {
      loaders.unshift({ loader: require.resolve('style-loader') })
    }

    if (isEnvProduction(webpackEnv)) {
      loaders.unshift(MiniCssExtractPlugin.loader)
    }

    return loaders
  }

  return {
    rules: [
      {
        test: /\.css$/,
        use: getCssLoader(webpackEnv),
      },
      {
        test: /\.less$/,
        exclude: /(node_modules|antd|xbee|xpanda)/,
        use: getLessLoader(webpackEnv),
      },
      {
        test: /(antd|xbee|xpanda)\.less$/,
        use: getUILessLoader(webpackEnv),
      },
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: getJSLoader(webpackEnv),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /ico\.svg$/,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 10 * 1024,
              name: 'image/[hash].[ext]',
              esModule: false,
            },
          },
        ],
      },
      {
        test: /ico\.svg$/,
        loader: require.resolve('svg-inline-loader'),
        options: {
          classPrefix: true,
          removeTags: true,
          removingTagAttrs: ['fill', 'opacity'],
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: require.resolve('url-loader'),
            options: {
              limit: 10 * 1024,
              name: 'image/[hash].[ext]',
            },
          },
        ],
      },
    ],
  }
}

const getPlugins = webpackEnv => {
  let plugins = [
    new webpack.ProvidePlugin({
      React: 'react',
    }),
    new webpack.DefinePlugin(
      (nsConfig.DefinePluginConfig &&
        nsConfig.DefinePluginConfig[webpackEnv]) || {
        API_SERVER_PLACEHOLDER: JSON.stringify(''),
      },
    ),
    new CaseSensitivePathsPlugin(),
  ]

  if (isEnvDevelopment(webpackEnv)) {
    plugins = plugins.concat([
      new HtmlWebpackPlugin({
        template: fs.existsSync(
          path.join(process.cwd(), 'template', 'index.dev.html'),
        )
          ? path.join(process.cwd(), 'template', 'index.dev.html')
          : path.join(process.cwd(), 'template', 'index.html'),
      }),
      new webpack.HotModuleReplacementPlugin(),
      // new ReactRefreshWebpackPlugin(),
    ])
  }

  if (isEnvProduction(webpackEnv)) {
    plugins = plugins.concat([
      new HtmlWebpackPlugin({
        template: fs.existsSync(
          path.join(process.cwd(), 'template', 'index.prod.html'),
        )
          ? path.join(process.cwd(), 'template', 'index.prod.html')
          : path.join(process.cwd(), 'template', 'index.html'),
        minify: false,
        hash: true,
        random: Math.random().toString().slice(2),
      }),
      new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`),
      new CompressionPlugin({
        algorithm: 'gzip',
        test: /\.(js|css)$/,
        threshold: 10_240,
        minRatio: 0.6,
      }),
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: ['!vendor.js'],
      }),
    ])

    const dataPath = path.join(process.cwd(), 'data')

    if (fs.existsSync(dataPath)) {
      plugins.push(
        new CopyWebpackPlugin({
          patterns: [dataPath],
        }),
      )
    }
  }

  return plugins
}

const getOptimization = () => ({
  minimizer: [
    new TerserPlugin({
      extractComments: false,
    }),
    new OptimizeCSSAssetsPlugin({}),
    new MiniCssExtractPlugin({
      chunkFilename: '[name].[hash:8].css',
      filename: '[name].css',
    }),
  ],
})

// 生成最终的webpack配置
const generateWebpackConfig = webpackEnv => {
  const isSubApp = nsConfig.mode !== undefined

  let webpackConfig = {
    mode: getMode(webpackEnv),
    entry: getEntry(isSubApp),
    output: getOutput(isSubApp),
    devtool: getDevtool(webpackEnv),
    resolve: getResolve(),
    resolveLoader: getResolveLoader(),
    externals: getExternals(),
    module: getModule(webpackEnv),
    plugins: getPlugins(webpackEnv),
  }

  // 线上环境特有配置
  if (isEnvProduction(webpackEnv)) {
    webpackConfig.optimization = getOptimization()
  }

  // 用户自定义配置
  if (nsConfig.webpack) {
    webpackConfig = nsConfig.webpack(webpackConfig, webpackEnv)
  }

  return webpackConfig
}

module.exports = generateWebpackConfig
