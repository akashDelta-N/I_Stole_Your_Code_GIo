import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1, p2 } from './08.ts';

const input = '' +
	'RL\n' +
	'\n' +
	'AAA = (BBB, CCC)\n' +
	'BBB = (DDD, EEE)\n' +
	'CCC = (ZZZ, GGG)\n' +
	'DDD = (DDD, DDD)\n' +
	'EEE = (EEE, EEE)\n' +
	'GGG = (GGG, GGG)\n' +
	'ZZZ = (ZZZ, ZZZ)';

Deno.test('it should run the first part of day 08 correctly', () => {
	const result = p1(input);
	const expected = 2;
	assertEquals(result, expected);
});

const inputRepeating = '' +
	'LLR\n' +
	'\n' +
	'AAA = (BBB, BBB)\n' +
	'BBB = (AAA, ZZZ)\n' +
	'ZZZ = (ZZZ, ZZZ)';

Deno.test('it should run the first part of day 08 correctly', () => {
	const result = p1(inputRepeating);
	const expected = 6;
	assertEquals(result, expected);
});

const inputGhost = '' +
	'LR\n' +
	'\n' +
	'11A = (11B, XXX)\n' +
	'11B = (XXX, 11Z)\n' +
	'11Z = (11B, XXX)\n' +
	'22A = (22B, XXX)\n' +
	'22B = (22C, 22C)\n' +
	'22C = (22Z, 22Z)\n' +
	'22Z = (22B, 22B)\n' +
	'XXX = (XXX, XXX)\n';

Deno.test('it should run the second part of day 08 correctly', () => {
	const result = p2(inputGhost);
	const expected = 6;
	assertEquals(result, expected);
});
