import {assertEquals} from "std/assert/assert_equals.ts";
import '../extension-methods.ts';
import {p1, p2} from './01.ts';

const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

Deno.test('it should run the first part of day 01 correctly', () => {
  const result = p1(input);
  const expected = 11;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 01 correctly', () => {
  const result = p2(input);
  const expected = 31;
  assertEquals(result, expected);
});
