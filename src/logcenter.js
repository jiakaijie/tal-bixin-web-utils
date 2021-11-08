import axios from 'axios'
import md5 from 'md5';

import { endTypeConfig, pWlogTypeConfig, pcWebTypeConfig } from './utils/type.js';

const createInitLogCenter = (config) => {
  const appConfig = config;
  const host = endTypeConfig.pcOrWeb;

  const { appId = '', appKey = '', logType = '' } = appConfig;

  const log = appConfig.logType ? (pcWebTypeConfig[logType] ? pcWebTypeConfig[logType] : pcWebTypeConfig.sys) : pcWebTypeConfig.sys;

  let commonData = {};

  const cacheLogData = (data) => {
    commonData = { ...commonData, ...data }
  }

  const sendLog = (nowData) => {
    const dateNow = Date.now();
    const data = { ...commonData, ...nowData };
    const href = `${host}/${appId}/${log}.gif?content=${JSON.stringify(data)}`;

    return axios.get(href, {
      headers: {
        'X-Log-Appid': appId,
        'X-Log-TimeStamp': dateNow,
        'X-Log-Sign': md5(`${appId}&${dateNow}${appKey}`), // 通过appId + & +当前日期时间戳 + appkey 以md5签名
        'Content-Type': 'text/plain;charset=UTF-8',
      }
    })
  }
  return {
    cacheLogData,
    sendLog
  }
}

export default createInitLogCenter;
