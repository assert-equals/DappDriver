import { describe, expect, it } from 'vitest';
import { isAtLeast, isAtMost, strictEqual, toRegExp } from '.';

describe('toRegExp', () => {
  const chars = ['.', '*', '+', '?', '^', '$', '{', '}', '(', ')', '|', '[', ']', '\\'];

  it('returns the same RegExp instance when given a RegExp', () => {
    const re = /MetaMask/;
    expect(toRegExp(re)).toBe(re);
  });

  it('matches string input case-insensitively', () => {
    expect(toRegExp('cancel').test('Cancel')).toBe(true);
  });

  it('matches accented unicode characters case-insensitively', () => {
    expect(toRegExp('annulé').test('ANNULÉ')).toBe(true);
  });

  it('matches an empty string when given an empty string', () => {
    expect(toRegExp('').test('')).toBe(true);
  });

  it('dot does not match arbitrary characters (is not a wildcard)', () => {
    expect(toRegExp('metamask.github.io/test-dapp/').test('metamaskXgithubXio/test-dapp/')).toBe(false);
  });

  it.each(chars)('treats %s as a literal character', (char) => {
    const accountName = `Account ${char}`;
    expect(toRegExp(accountName).test(accountName)).toBe(true);
  });
});

describe.each([
  { name: 'isAtLeast', fn: isAtLeast, greaterThan: true, equalTo: true, lessThan: false },
  { name: 'isAtMost', fn: isAtMost, greaterThan: false, equalTo: true, lessThan: true },
  { name: 'strictEqual', fn: strictEqual, greaterThan: false, equalTo: true, lessThan: false }
])('$name', ({ fn, greaterThan, equalTo, lessThan }) => {
  it(`returns ${greaterThan} when value exceeds threshold (a > b)`, () => {
    expect(fn(4, 3)).toBe(greaterThan);
  });

  it(`returns ${equalTo} when value equals threshold (a === b)`, () => {
    expect(fn(3, 3)).toBe(equalTo);
  });

  it(`returns ${lessThan} when value is below threshold (a < b)`, () => {
    expect(fn(2, 3)).toBe(lessThan);
  });
});
