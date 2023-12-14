import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1, p2 } from './14.ts';

const input = '' +
	'O....#....\n' +
	'O.OO#....#\n' +
	'.....##...\n' +
	'OO.#O....O\n' +
	'.O.....O#.\n' +
	'O.#..O.#.#\n' +
	'..O..#O..O\n' +
	'.......O..\n' +
	'#....###..\n' +
	'#OO..#....';

Deno.test('it should run the first part of day 14 correctly', () => {
	const result = p1(input);
	const expected = 136;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 14 correctly', () => {
	const result = p2(input);
	const expected = 64;
	assertEquals(result, expected);
});
