export const dataTypeConfig = {
  null: '[object Null]',
  undefined: '[object Undefined]',
  string: '[object String]',
  number: '[object Number]',
  boolean: '[object Boolean]',
  obj: '[object Object]',
  arr: '[object Array]',
}

export const typeName = {
  [dataTypeConfig.null]: 'null',
  [dataTypeConfig.undefined]: 'undefined',
  [dataTypeConfig.string]: 'string',
  [dataTypeConfig.number]: 'number',
  [dataTypeConfig.boolean]: 'boolean',
  [dataTypeConfig.obj]: 'obj',
  [dataTypeConfig.arr]: 'arr',
}

export const getType = (data) => {
  return Object.prototype.toString.call(data)
}

export const isNull = (data) => {
  return getType(data) === dataTypeConfig.null
}

export const isUndefined = (data) => {
  return getType(data) === dataTypeConfig.undefined
}

export const isString = (data) => {
  return !isNull(data) && !isUndefined(data) && getType(data) === dataTypeConfig.string
}

export const isNumber = (data) => {
  return !isNull(data) && !isUndefined(data) && getType(data) === dataTypeConfig.number
}

export const isBoolean = (data) => {
  return !isNull(data) && !isUndefined(data) && getType(data) === dataTypeConfig.boolean
}

export const isObj = (data) => {
  return !isNull(data) && !isUndefined(data) && getType(data) === dataTypeConfig.obj
}

export const isArr = (data) => {
  return !isNull(data) && !isUndefined(data) && getType(data) === dataTypeConfig.arr
}
