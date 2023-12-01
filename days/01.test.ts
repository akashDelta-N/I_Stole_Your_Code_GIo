import {assertEquals} from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import {p1, p2} from './01.ts';

Deno.test('it should run the first part of day 01 correctly', () => {
  const result = p1('1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet');
  const expected = 142;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 01 correctly', () => {
  const result = p2('two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen');
  const expected = 281;
  assertEquals(result, expected);
});
