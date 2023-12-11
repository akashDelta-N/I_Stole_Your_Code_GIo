import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1, p2 } from './10.ts';

const input = '' +
	'.....\n' +
	'.S-7.\n' +
	'.|.|.\n' +
	'.L-J.\n' +
	'.....';

Deno.test('it should run the first part of day 10 correctly', () => {
	const result = p1(input);
	const expected = 4;
	assertEquals(result, expected);
});

const inputComplex = '' +
	'..F7.\n' +
	'.FJ|.\n' +
	'SJ.L7\n' +
	'|F--J\n' +
	'LJ...';

Deno.test('it should run the first part of day 10 correctly', () => {
	const result = p1(inputComplex);
	const expected = 8;
	assertEquals(result, expected);
});

const inputLarge = '' +
	'...........\n' +
	'.S-------7.\n' +
	'.|F-----7|.\n' +
	'.||.....||.\n' +
	'.||.....||.\n' +
	'.|L-7.F-J|.\n' +
	'.|..|.|..|.\n' +
	'.L--J.L--J.\n' +
	'...........';

Deno.test('it should run the second part of day 10 correctly', () => {
	const result = p2(inputLarge);
	const expected = 4;
	assertEquals(result, expected);
});

const inputLarger = '' +
	'.F----7F7F7F7F-7....\n' +
	'.|F--7||||||||FJ....\n' +
	'.||.FJ||||||||L7....\n' +
	'FJL7L7LJLJ||LJ.L-7..\n' +
	'L--J.L7...LJS7F-7L7.\n' +
	'....F-J..F7FJ|L7L7L7\n' +
	'....L7.F7||L7|.L7L7|\n' +
	'.....|FJLJ|FJ|F7|.LJ\n' +
	'....FJL-7.||.||||...\n' +
	'....L---J.LJ.LJLJ...';

Deno.test('it should run the second part of day 10 correctly', () => {
	const result = p2(inputLarger);
	const expected = 8;
	assertEquals(result, expected);
});

const inputLargerComplex = '' +
	'FF7FSF7F7F7F7F7F---7\n' +
	'L|LJ||||||||||||F--J\n' +
	'FL-7LJLJ||||||LJL-77\n' +
	'F--JF--7||LJLJ7F7FJ-\n' +
	'L---JF-JLJ.||-FJLJJ7\n' +
	'|F|F-JF---7F7-L7L|7|\n' +
	'|FFJF7L7F-JF7|JL---7\n' +
	'7-L-JL7||F7|L7F-7F7|\n' +
	'L.L7LFJ|||||FJL7||LJ\n' +
	'L7JLJL-JLJLJL--JLJ.L';

Deno.test('it should run the second part of day 10 correctly', () => {
	const result = p2(inputLargerComplex);
	const expected = 10;
	assertEquals(result, expected);
});
