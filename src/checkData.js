import { isNull, isUndefined, isNumber, isString, isBoolean, isObj, isArr, getType, dataTypeConfig, typeName } from './utils/dataType.js';
import { logError } from './utils/log.js';

export const checkConfig = (config) => {
  const checkConfigKeys = Object.keys(config);
  for (let i = 0; i < checkConfigKeys.length; i++) {
    const key = checkConfigKeys[i];
    // 如果给的校验配置没有type, 直接忽略
    const checkConfigValue = config[key]
    if (!isObj(checkConfigValue)) {
      logError(`校验的配置对象, 属性${key}必须是obj`)
      return false;
    }
    const type = checkConfigValue.type
    if (!isString(type)) {
      logError(`校验的配置对象, 属性${key}中的${type}必须是str`)
      return false;
    }
  }
  return true;
}

const checkDataType = (checkConfig, data) => {
  const checkConfigKeys = Object.keys(checkConfig);
  for (let i = 0; i < checkConfigKeys.length; i++) {
    const key = checkConfigKeys[i];
    const type = checkConfig[key].type
    const dataValue = data[key];
    if (isNull(dataValue) || isUndefined(dataValue)) {
      logError(`埋点对象参数${key}必须上报`)
      return false;
    }
    if (getType(dataValue) !== type) {
      logError(`埋点对象参数${key}类型是${typeName[getType(dataValue)]}, 约定必须是${typeName[type]}`)
      return false;
    }
  }
  return true;
}

export default checkDataType;
