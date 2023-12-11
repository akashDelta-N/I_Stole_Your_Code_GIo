import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1, p2 } from './02.ts';

const input = '' +
	'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n' +
	'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n' +
	'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n' +
	'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n' +
	'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green';

Deno.test('it should run the first part of day 02 correctly', () => {
	const result = p1(input);
	const expected = 8;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 02 correctly', () => {
	const result = p2(input);
	const expected = 2286;
	assertEquals(result, expected);
});
