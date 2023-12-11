import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1, p2 } from './07.ts';

const input = '' +
	'32T3K 765\n' +
	'T55J5 684\n' +
	'KK677 28\n' +
	'KTJJT 220\n' +
	'QQQJA 483';

Deno.test('it should run the first part of day 07 correctly', () => {
	const result = p1(input);
	const expected = 6440;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 07 correctly', () => {
	const result = p2(input);
	const expected = 5905;
	assertEquals(result, expected);
});
