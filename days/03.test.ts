import {assertEquals} from "std/assert/assert_equals.ts";
import '../extension-methods.ts';
import {p1, p2} from './03.ts';

const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

Deno.test('it should run the first part of day 03 correctly', () => {
  const result = p1(input);
  const expected = 161;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 03 correctly', () => {
  const result = p2(input);
  const expected = 48;
  assertEquals(result, expected);
});
