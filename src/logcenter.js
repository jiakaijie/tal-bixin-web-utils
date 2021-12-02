import axios from 'axios'
import md5 from 'md5';

import { endTypeConfig, pWlogTypeConfig, pcWebTypeConfig } from './utils/type.js';
import checkDataType, { checkConfig } from './checkData.js';
import { isNull, isUndefined, isNumber, isString, isBoolean, isObj, isArr, getType, dataTypeConfig } from './utils/dataType.js';
import { logError } from './utils/log.js';

const logCenterCommonData = 'logCenterCommonData'

const createInitLogCenter = (config) => {

  if (!isObj(config)) {
    logError(`初始化参数不能为null、undefined、且必须是对象`)
    return {};
  }
  if (isNull(config.appId) || isUndefined(config.appId)) {
    logError(`appid必传`)
    return {};
  }
  if (!isString(config.appId)) {
    logError(`appid必须是字符串`)
    return {};
  }
  if (isNull(config.appKey) || isUndefined(config.appKey)) {
    logError(`appKey必传`)
    return {};
  }
  if (!isString(config.appId)) {
    logError(`appKey必须是字符串`)
    return {};
  }

  const host = endTypeConfig.pcOrWeb;
  const appConfig = config;

  const { appId, appKey, logType = '', mustDataType = {}, isGoManage = 1 } = appConfig;

  if (!checkConfig(mustDataType)) {
    return {};
  }

  let isMyGoManage = isNumber(isGoManage) ? isGoManage : 1;

  // 默认是打的是系统日志
  const log = logType ? (pcWebTypeConfig[logType] ? pcWebTypeConfig[logType] : pcWebTypeConfig.sys) : pcWebTypeConfig.sys;

  let commonData = {};

  if (window && window.localStorage) {
    commonData = JSON.parse(localStorage.getItem(logCenterCommonData) || '{}') || {};
  }

  const cacheLogData = (data) => {
    if (isObj(data)) {
      commonData = { ...commonData, ...data };
      if (window && window.localStorage) {
        localStorage.setItem(logCenterCommonData, JSON.stringify(commonData));
      }
    } else {
      logError('入参必须是对象')
    }
  }

  const sendLog = (nowData) => {
    if (!isMyGoManage) {
      return;
    }
    if (isObj(nowData)) {
      let newCommonData;
      if (window && window.localStorage) {
        newCommonData = JSON.parse(localStorage.getItem(logCenterCommonData) || '{}') || {};
      } else {
        newCommonData = commonData;
      }
      const data = { ...newCommonData, ...nowData };
      if (checkDataType(mustDataType, data)) {
        const dateNow = Date.now();
        const href = `${host}/${appId}/${log}.gif`;

        return axios({
          url: href,
          method: 'post',
          headers: {
            'X-Log-Appid': appId,
            'X-Log-TimeStamp': dateNow,
            'X-Log-Sign': md5(`${appId}&${dateNow}${appKey}`), // 通过appId + & +当前日期时间戳 + appkey 以md5签名
            'Content-Type': 'text/plain;charset=UTF-8',
          },
          data
        })

      }
    } else {
      logError('入参必须是对象')
    }
  }

  const changeManage = (isGoManage) => {
    isMyGoManage = isNumber(isGoManage) ? isGoManage : 1
  }

  return {
    cacheLogData,
    sendLog,
    changeManage
  }
}

export default createInitLogCenter;