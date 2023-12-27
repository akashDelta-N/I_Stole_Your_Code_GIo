import './extension-methods.ts'
import {ensureDir} from "std/fs/ensure_dir.ts";
import {load} from "std/dotenv/mod.ts";
import {parseArgs} from "std/cli/parse_args.ts";
import {brightBlue as blue, brightYellow as yellow, underline as ul} from "std/fmt/colors.ts";

const args = parseArgs(Deno.args, {
	boolean: ['scaffold'],
	default: {day: 1, part: 0, scaffold: false}
});
const [day, part, scaffold] = [args.day, args.part, args.scaffold] as [number, number, boolean];
if (isNaN(day)) throw new Error('Day number provided is incorrect');
const dayCode = `${day}`.padStart(2, '0');

if (scaffold) {
	console.log(`Scaffolding day ${day}`);
	const template = await Deno.readTextFile('./template.ts.txt');
	const testTemplate = await Deno.readTextFile('./template.test.ts.txt');
	await ensureDir(`./days`);
	await Deno.writeTextFile(`./days/${dayCode}.ts`, template);
	await Deno.writeTextFile(`./days/${dayCode}.test.ts`, testTemplate.replaceAll('{DAY-NUMBER}', dayCode));
	Deno.exit();
}

const {ADVENT_YEAR, ADVENT_SESSION_TOKEN} = await load();
const file = await import(`./days/${dayCode}.ts`);
const response = await fetch(`https://adventofcode.com/${ADVENT_YEAR}/day/${day}/input`, {headers: {cookie: `session=${ADVENT_SESSION_TOKEN}`}});
if (!response.ok) throw new Error('Error while fetching input, maybe your session token is expired?');
const input = await response.text();
const runPart = async (partNumber?: number): Promise<void> => {
	if (!(!part || partNumber === part)) return;
	const timerStart = performance.now();
	const result = file[`p${partNumber}`](input);
	const actualResult = result instanceof Promise ? await result : result;
	const timerEnd = performance.now() - timerStart;
	console.log(ul(blue(`Running day ${day} part ${partNumber}:`)));
	console.log(`${yellow('[Answer]\t')} ${actualResult}`);
	console.log(`${yellow('[Time]\t\t')} ~${timerEnd.toFixed(3)}ms\n`);
}
await runPart(1);
await runPart(2);
Deno.exit();
