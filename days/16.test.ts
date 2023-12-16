import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1, p2 } from './16.ts';

const input = '' +
	'.|...\\....\n' +
	'|.-.\\.....\n' +
	'.....|-...\n' +
	'........|.\n' +
	'..........\n' +
	'.........\\\n' +
	'..../.\\\\..\n' +
	'.-.-/..|..\n' +
	'.|....-|.\\\n' +
	'..//.|....';

Deno.test('it should run the first part of day 16 correctly', () => {
	const result = p1(input);
	const expected = 46;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 16 correctly', () => {
	const result = p2(input);
	const expected = 51;
	assertEquals(result, expected);
});
