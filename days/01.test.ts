import {assertEquals} from "std/assert/assert_equals.ts";
import '../extension-methods.ts';
import {p1, p2} from './01.ts';

const input = '';

Deno.test('it should run the first part of day 01 correctly', () => {
  const result = p1(input);
  const expected = 0;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 01 correctly', () => {
  const result = p2(input);
  const expected = 0;
  assertEquals(result, expected);
});
