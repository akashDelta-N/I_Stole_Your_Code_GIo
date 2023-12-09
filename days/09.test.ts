import {assertEquals} from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import {p1, p2} from './09.ts';

const input = '' +
  '0 3 6 9 12 15\n' +
  '1 3 6 10 15 21\n' +
  '10 13 16 21 30 45';

Deno.test('it should run the first part of day 09 correctly', () => {
  const result = p1(input);
  const expected = 114;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 09 correctly', () => {
  const result = p2(input);
  const expected = 2;
  assertEquals(result, expected);
});
