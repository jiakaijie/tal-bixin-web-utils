import axios from 'axios'
import md5 from 'md5';

import {  } from './type.js';

const exampleAppConfig = {
  appId: 'appId',
  appKey: 'appKey'
}

// const appId = '1004487';
// const appKey = '07b3f1dbe62489ba862f17169c52a09d';

const createInitLogCenter = (config) => {
  const appConfig = config
  let commonData = {}

  const cacheLogData = (data) => {
    commonData = { ...commonData, data }
  }

  const sendLog = (nowData) => {
    const dateNow = Date.now()
    const data = { ...commonData, ...nowData }
    return axios.get(`https://dj.xesimg.com/${appConfig.appId}/c.gif?content=${JSON.stringify(data)}`, {
      headers: {
        'X-Log-Appid': appConfig.appId,
        'X-Log-TimeStamp': dateNow,
        'X-Log-Sign': md5(`${appConfig.appId}&${dateNow}${appConfig.appKey}`), // 通过appId + & +当前日期时间戳 + appkey 以md5签名
        'Content-Type': 'text/plain;charset=UTF-8',
      }
    })
  }
  return {
    cacheLogData,
    sendLog
  }
}

export {
  createInitLogCenter
}

const { cacheLogData, createInitLogCenter } = createInitLogCenter({
  appId: '123',
  appKey: '123'
})

cacheLogData({
  canshu1: '1'
})