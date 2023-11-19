import _ from 'lodash';

export function toCamelCase(obj: Record<string, unknown>) {
  return _.mapKeys(obj, (value, key) => _.camelCase(key));
}

export function toSnakeCase(obj: Record<string, unknown>) {
  return _.mapKeys(obj, (value, key) => _.snakeCase(key));
}
