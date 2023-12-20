import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1, p2 } from './18.ts';

const input = '' +
	'R 6 (#70c710)\n' +
	'D 5 (#0dc571)\n' +
	'L 2 (#5713f0)\n' +
	'D 2 (#d2c081)\n' +
	'R 2 (#59c680)\n' +
	'D 2 (#411b91)\n' +
	'L 5 (#8ceee2)\n' +
	'U 2 (#caa173)\n' +
	'L 1 (#1b58a2)\n' +
	'U 2 (#caa171)\n' +
	'R 2 (#7807d2)\n' +
	'U 3 (#a77fa3)\n' +
	'L 2 (#015232)\n' +
	'U 2 (#7a21e3)';

Deno.test('it should run the first part of day 18 correctly', () => {
	const result = p1(input);
	const expected = 62;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 18 correctly', () => {
	const result = p2(input);
	const expected = 952408144115;
	assertEquals(result, expected);
});
