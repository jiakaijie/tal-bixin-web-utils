# tal-bixin-web-utils
## createInitLogCenter 日志打点

```
  // 初始化日志
  const { cacheLogData, sendLog } = createInitLogCenter({
    // 未来云appId: String
    appId: 'abc',
    // 未来云appKey: String
    appKey: 'def',
    // 未来云平台配置类型: String('sys': 系统日志, 'interactive': 交互日志, 'pv': 展示日志, 'all': 合并日志) || 不传该字段默认 'sys'
    logType: 'sys' 
  })

  // 缓存一些每次都要传的日志,可以多次调用,可以传同一个参数多次,会做合并
  cacheLogData({
    a: '1',
    b: '2'
  })

  // 发送埋点
  sendLog({
    a: '1',
    b: 2
  })
```