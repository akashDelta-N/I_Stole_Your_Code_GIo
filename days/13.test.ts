import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1, p2 } from './13.ts';

const input = '' +
	'#.##..##.\n' +
	'..#.##.#.\n' +
	'##......#\n' +
	'##......#\n' +
	'..#.##.#.\n' +
	'..##..##.\n' +
	'#.#.##.#.\n' +
	'\n' +
	'#...##..#\n' +
	'#....#..#\n' +
	'..##..###\n' +
	'#####.##.\n' +
	'#####.##.\n' +
	'..##..###\n' +
	'#....#..#';

Deno.test('it should run the first part of day 13 correctly', () => {
	const result = p1(input);
	const expected = 405;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 13 correctly', () => {
	const result = p2(input);
	const expected = 400;
	assertEquals(result, expected);
});
