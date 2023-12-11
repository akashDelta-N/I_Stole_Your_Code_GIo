import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1, p2 } from './03.ts';

const input = '' +
	'467..114..\n' +
	'...*......\n' +
	'..35..633.\n' +
	'......#...\n' +
	'617*......\n' +
	'.....+.58.\n' +
	'..592.....\n' +
	'......755.\n' +
	'...$.*....\n' +
	'.664.598..';

Deno.test('it should run the first part of day 03 correctly', () => {
	const result = p1(input);
	const expected = 4361;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 03 correctly', () => {
	const result = p2(input);
	const expected = 467835;
	assertEquals(result, expected);
});
