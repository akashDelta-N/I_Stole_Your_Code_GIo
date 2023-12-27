import { assertEquals } from 'std/assert/assert_equals.ts';
import '../extension-methods.ts';
import { p1 } from './25.ts';

const input = '' +
	'jqt: rhn xhk nvd\n' +
	'rsh: frs pzl lsr\n' +
	'xhk: hfx\n' +
	'cmg: qnr nvd lhk bvb\n' +
	'rhn: xhk bvb hfx\n' +
	'bvb: xhk hfx\n' +
	'pzl: lsr hfx nvd\n' +
	'qnr: nvd\n' +
	'ntq: jqt hfx bvb xhk\n' +
	'nvd: lhk\n' +
	'lsr: lhk\n' +
	'rzs: qnr cmg lsr rsh\n' +
	'frs: qnr lhk lsr';

Deno.test('it should run the first part of day 25 correctly', () => {
	const result = p1(input);
	const expected = 54;
	assertEquals(result, expected);
});

Deno.test('it should run the second part of day 25 correctly', () => {
	assertEquals(true, true);
});
