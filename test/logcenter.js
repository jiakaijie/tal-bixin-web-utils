import { createInitLogCenter } from '../src/index.js';

const { cacheLogData, sendLog } = createInitLogCenter({
  appId: 'a',
  appKey: 'b',
})

cacheLogData({
  a: '1',
  b: '2'
})

cacheLogData({
  c: '3',
  d: '4'
})

// sendLog({
//   dataType: 'test',
//   haha: 'haha',
//   type: '第一次打'
// })

// setTimeout(() => {
//   sendLog({
//     dataType: 'test',
//     heihie: 'heihei',
//     type: '第二次打'
//   })
// }, 3000)
