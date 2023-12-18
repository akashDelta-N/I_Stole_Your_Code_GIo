import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1, p2 } from './17.ts';

const input = '' +
	'2413432311323\n' +
	'3215453535623\n' +
	'3255245654254\n' +
	'3446585845452\n' +
	'4546657867536\n' +
	'1438598798454\n' +
	'4457876987766\n' +
	'3637877979653\n' +
	'4654967986887\n' +
	'4564679986453\n' +
	'1224686865563\n' +
	'2546548887735\n' +
	'4322674655533';

const input2 = '' +
	'111111111111\n' +
	'999999999991\n' +
	'999999999991\n' +
	'999999999991\n' +
	'999999999991';

Deno.test('it should run the first part of day 17 correctly', () => {
	const result = p1(input);
	const expected = 102;
	assertEquals(result, expected);
});

Deno.test('it should run the first part of day 17 correctly', () => {
	const result = p1(input2);
	const expected = 59;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 17 correctly', () => {
	const result = p2(input);
	const expected = 94;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 17 correctly', () => {
	const result = p2(input2);
	const expected = 71;
	assertEquals(result, expected);
});
