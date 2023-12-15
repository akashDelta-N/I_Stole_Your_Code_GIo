import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1, p2 } from './15.ts';

const input = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7';

Deno.test('it should run the first part of day 15 correctly', () => {
	const result = p1(input);
	const expected = 1320;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 15 correctly', () => {
	const result = p2(input);
	const expected = 145;
	assertEquals(result, expected);
});
