# tal-bixin-web-utils
下载
```
npm i tal-bixin-web-utils -S
```
引入
```
import { createInitLogCenter, dataTypeConfig } from 'tal-bixin-web-utils'
```
## 使用 createInitLogCenter: 日志埋点
```
// 初始化日志
const { cacheLogData, sendLog, changeManage } = createInitLogCenter({
  appId: 'abc',   // 未来云appId: String
  appKey: 'def',  // 未来云appKey: String
  isGoManage: 1,  // 是否执行打点请求 Number(1: 打点, 0: 不打点) 默认打点
  logType: 'sys', // 未来云平台配置类型: String('sys': 系统日志, 'interactive': 交互日志, 'pv': 展示日志, 'all': 合并日志) || 不传该字段默认 'sys'
  mustDataType: {}, // 需要校验的必要的参数类型: 不传默认是空对象
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

// 是否埋点方法 参数跟上边的isGoManage一致
changeManage(1)
```

## 使用 dataTypeConfig 对象: 去定义字段类型，跟上边mustDataType参数配合使用
```
const mustDataType = {
  a: {
    type: dataTypeConfig.string
  },
  b: {
    type: dataTypeConfig.number
  }
}
```
```
// 目前支持下边这些数据类型
const dataTypeConfig = {
  null: '[object Null]',
  undefined: '[object Undefined]',
  string: '[object String]',
  number: '[object Number]',
  boolean: '[object Boolean]',
  obj: '[object Object]',
  arr: '[object Array]',
}
```
