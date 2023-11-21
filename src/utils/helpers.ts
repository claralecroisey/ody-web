import _ from 'lodash';

export function toCamelCase(obj: object) {
  return _.transform(obj, (acc, value, key, target) => {
    const camelKey = _.isArray(target) ? key : _.camelCase(key);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    acc[camelKey] = _.isObject(value) ? toCamelCase(value) : value;
  });
}

export function toSnakeCase(obj: object) {
  return _.transform(obj, (acc, value, key, target) => {
    const snakeKey = _.isArray(target) ? key : _.snakeCase(key);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    acc[snakeKey] = _.isObject(value) ? toSnakeCase(value) : value;
  });
}
