import { Comparator } from '../types';

/**
 *
 *
 * @param {string} str
 * @return {*}  {string}
 */
function escapeRegExp(str: string): string {
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
  return arg instanceof RegExp ? arg : new RegExp(escapeRegExp(arg), 'iu');
}

export const isAtLeast: Comparator = (a: number, b: number) => a >= b;

export const isAtMost: Comparator = (a: number, b: number) => a <= b;

export const strictEqual: Comparator = (a: number, b: number) => a === b;
