import { Comparator } from '../types';

/**
 *
 *
 * @export
 * @param {string} str
 * @return {*}  {string}
 */
export function escapeSpecialChars(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
/**
 *
 *
 * @export
 * @param {(string | RegExp)} arg
 * @return {*}  {RegExp}
 */
export function toRegExp(arg: string | RegExp): RegExp {
  return arg instanceof RegExp ? arg : new RegExp(escapeSpecialChars(arg), 'iu');
}

export const isAtLeast: Comparator = (a: number, b: number) => a >= b;

export const strictEqual: Comparator = (a: number, b: number) => a === b;
