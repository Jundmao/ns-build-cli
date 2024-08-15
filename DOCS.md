# 前端项目开发工具

## nsConfig

- nsConfig.babel(config, env)
- nsConfig.webpack(config, env)
- nsConfig.eslint(config, env)
- nsConfig.mode
  * independent: 独立运行模式，开发环境external只有night-kay
  * integrated: 集成运行模式，开发环境external与生产环境一致，使用父页面的公共库

## 所服务项目的依赖

```
"@antv/data-set": "^0.10.1",
"@antv/g2": "^3.5.19",
"antd": "^3.26.20",
"mobx": "^5.1.0",
"mobx-react": "^6.2.2",
"moment": "^2.29.4",
"react": "^17.0.2",
"react-dom": "^17.0.2",
"react-router-dom": "^5.2.0",
"ns-mfe": "^1.0.0",
```



## 所服务项目的开发依赖

```
"ns-build-cli": "^2.1.8",
"@types/react": "^17.0.0",
"@types/react-dom": "17.0.0",
"@types/react-css-modules": "^4.6.4",
"@types/react-router": "^5.1.18",
"husky": "^4.2.5",
"lint-staged": "^8.1.0",
"ns-mfe-cli": "^0.2.3"
```

## 开发

```
发布
$ pnpm run pub
```
