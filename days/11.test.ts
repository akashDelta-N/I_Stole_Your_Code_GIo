import {assertEquals} from "std/assert/assert_equals.ts";
import '../extension-methods.ts';
import {p1, p2} from './11.ts';

const input = '' +
  '...#......\n' +
  '.......#..\n' +
  '#.........\n' +
  '..........\n' +
  '......#...\n' +
  '.#........\n' +
  '.........#\n' +
  '..........\n' +
  '.......#..\n' +
  '#...#.....';

Deno.test('it should run the first part of day 11 correctly', () => {
  const result = p1(input);
  const expected = 374;
  assertEquals(result, expected);
});

Deno.test('it should run the first part of day 11 correctly', () => {
  const result = p1(input, 10);
  const expected = 1030;
  assertEquals(result, expected);
});

Deno.test('it should run the first part of day 11 correctly', () => {
  const result = p1(input, 100);
  const expected = 8410;
  assertEquals(result, expected);
});

Deno.test('it should run the second part of day 11 correctly', () => {
  const result = p2(input);
  const expected = 82000210;
  assertEquals(result, expected);
});
