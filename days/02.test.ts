import {assertEquals} from "std/assert/assert_equals.ts";
import '../extension-methods.ts';
import {p1, p2} from './02.ts';

const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

Deno.test('it should run the first part of day 02 correctly', () => {
  const result = p1(input);
  const expected = 2;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 02 correctly', () => {
  const result = p2(input);
  const expected = 4;
  assertEquals(result, expected);
});
