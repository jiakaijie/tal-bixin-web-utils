// 端类型:前端默认是pc|web
export const endTypeConfig = {
  pcOrWeb: 'https://dj.xesimg.com',
  mobil: 'https://appdj.xesimg.com'
}

// pc|web端日志上报类型
export const pWlogTypeConfig = {
  sys: 'sys', // 系统日志
  interactive: 'interactive', // 交互日志
  pv: 'pv', // 展示日志
  all: 'all' // 合并日志
}

// 对应的执行参数的类型
export const pcWebTypeConfig = {
  pv: 'a',
  interactive: 'b',
  sys: 'c',
  all: 'all'
}
