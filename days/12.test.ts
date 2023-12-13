import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1, p2 } from './12.ts';

const input = '' +
	'???.### 1,1,3\n' +
	'.??..??...?##. 1,1,3\n' +
	'?#?#?#?#?#?#?#? 1,3,1,6\n' +
	'????.#...#... 4,1,1\n' +
	'????.######..#####. 1,6,5\n' +
	'?###???????? 3,2,1';

Deno.test('it should run the first part of day 12 correctly', () => {
	const result = p1(input);
	const expected = 21;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 12 correctly', () => {
	const result = p2(input);
	const expected = 525152;
	assertEquals(result, expected);
});
