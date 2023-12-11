import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1, p2 } from './06.ts';

const input = '' +
	'Time:      7  15   30\n' +
	'Distance:  9  40  200';

Deno.test('it should run the first part of day 06 correctly', () => {
	const result = p1(input);
	const expected = 288;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 06 correctly', () => {
	const result = p2(input);
	const expected = 71503;
	assertEquals(result, expected);
});
