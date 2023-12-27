import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1, p2 } from './21.ts';

const input = '' +
	'...........\n' +
	'.....###.#.\n' +
	'.###.##..#.\n' +
	'..#.#...#..\n' +
	'....#.#....\n' +
	'.##..S####.\n' +
	'.##..#...#.\n' +
	'.......##..\n' +
	'.##.#.####.\n' +
	'.##..##.##.\n' +
	'...........';

Deno.test('it should run the first part of day 21 correctly', () => {
	const result = p1(input, 6);
	const expected = 16;
	assertEquals(result, expected);
});

