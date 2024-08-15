/**
 * babel config
 */
const getNsConfig = require("../_utils/getNsConfig");

const nsConfig = getNsConfig();

module.exports = (webpackEnv) => {
  const isEnvProduction = webpackEnv === 'production'
  const plugins = [
    [require.resolve("@babel/plugin-transform-runtime")],
    [require.resolve("@babel/plugin-proposal-decorators"), { legacy: true }],
    [require.resolve("@babel/plugin-proposal-class-properties")],
    [require.resolve("@babel/plugin-proposal-optional-chaining")],
    [require.resolve("babel-plugin-import"), { "libraryName": "antd", "libraryDirectory": "es" }],
  ]

  if (isEnvProduction) {
    plugins.push([
      require.resolve("babel-plugin-react-css-modules"),
      {
        handleMissingStyleName: 'warn',
        autoResolveMultipleImports: true,
        generateScopedName: "[hash:base64]",
        filetypes: {
          ".less": {
            syntax: require.resolve("postcss-less"),
          },
        },
      },
    ])
  } else {
    plugins.push([
      require.resolve("babel-plugin-react-css-modules"),
      {
        webpackHotModuleReloading: true,
        autoResolveMultipleImports: true,
        generateScopedName: "[path][name]__[local]--[hash:base64:5]",
        filetypes: {
          ".less": {
            syntax: require.resolve("postcss-less"),
          },
        },
      },
    ])
  }


  let babelConfig = {
    presets: [
      [
        require.resolve("@babel/preset-env"),
        {
          targets: {
            browsers: ["last 2 versions"],
          },
          modules: false,
        },
      ],
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-typescript"),
    ],
    plugins,
  };

  // 用户自定义配置
  if (nsConfig.babel) {
    babelConfig = nsConfig.babel(babelConfig, webpackEnv);
  }

  return babelConfig;
};
