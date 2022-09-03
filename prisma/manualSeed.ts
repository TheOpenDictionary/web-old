import prisma, {
	Definition,
	Dictionary,
	Entry,
	Etymology,
	Group,
	Language,
	Usage
} from '@prisma/client';
const { Prisma } = prisma;
import type { Dictionary as XmlDictionary } from './types';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { readFileSync, readdirSync } from 'fs';
import { compact, isArray } from 'lodash-es';
import xml from 'fast-xml-parser';
import he from 'he';

const prismaClient = new prisma.PrismaClient({
	log: ['query', 'info', 'warn', 'error']
});

const dictionaryDir: string = join(dirname(fileURLToPath(import.meta.url)), 'dictionaries');
const file: string = 'test-fra.xml';
const files: string[] = readdirSync(dictionaryDir.toString());
const convertToArray = <T>(value: T | T[]): T[] => {
	if (!value) return [];
	return compact(isArray(value) ? value : [value]);
};

async function main() {
	// note: template variables can only be used for data values.
	console.log('🌱 seeding the db!!!!!!!!');

	// get dict source/target lang codes from filename
	const splitFilename: string[] = file.split('-');
	const [sourceCode, targetCode] = splitFilename;

	const { dictionary } = xml.parse(readFileSync(join(dictionaryDir, file), 'utf8'), {
		attributeNamePrefix: '',
		ignoreAttributes: false,
		attrValueProcessor: (val) => he.decode(val, { isAttributeValue: true }),
		tagValueProcessor: (val) => he.decode(val)
	}) as { dictionary: XmlDictionary };

	console.log('Dictionary!!');
	console.log(dictionary);

	/* steps:
		- get ids from language table
		- check dictionaries if source/target dict exists already
			- if exists, stop/return
		- check if we can add source/target lang to languages
			- add if necessary
		- requery to grab language ids
		- create dictionary
		- create entries
		- create etymologies
		- create usages
		- create groups (if any)
		- create definitions
	*/

	// get ids from language table
	let dbSourceLang: Language | null = await prismaClient.language.findFirst({
		where: {
			code: sourceCode
		}
	});
	let dbTargetLang: Language | null = await prismaClient.language.findFirst({
		where: {
			code: targetCode
		}
	});

	// check dictionaries if source/target dict exists already
	if (dbSourceLang != null && dbTargetLang != null) {
		const dict: Dictionary | null = await prismaClient.dictionary.findFirst({
			where: {
				AND: [
					{
						sourceLanguageID: dbSourceLang.id,
						targetLanguageID: dbTargetLang.id
					}
				]
			}
		});

		// if exists, stop/return
		if (dict != null) {
			return;
		}
	}

	// if source/target language don't exist, add them to the db
	if (dbSourceLang == null) {
		await prismaClient.$queryRaw`INSERT INTO "languages" ("code", "flag") VALUES (${sourceCode}, '"testFlag"')`;
	}
	if (dbTargetLang == null) {
		await prismaClient.$queryRaw`INSERT INTO "languages" ("code", "flag") VALUES (${targetCode}, '"testFlag2"')`;
	}

	// requery for language ids
	dbSourceLang = await prismaClient.language.findFirst({
		where: {
			code: sourceCode
		}
	});
	dbTargetLang = await prismaClient.language.findFirst({
		where: {
			code: targetCode
		}
	});

	// create dictionary
	const dbDict: Dictionary = await prismaClient.dictionary.create({
		data: {
			name: dictionary.name,
			sourceLanguageID: dbSourceLang!.id,
			targetLanguageID: dbTargetLang!.id
		}
	});

	// here after creating, we get the ID back from the DB
	// and we use that ID to set the FKs of the children
	// create entries
	const xmlEntries = convertToArray(dictionary.entry);
	for (let i = 0; i < xmlEntries.length; i++) {
		const dbEntry: Entry = await prismaClient.entry.create({
			data: {
				term: xmlEntries[i].term,
				dictionaryID: dbDict.id
			}
		});
		// create etymologies
		const xmlEtyomologies = convertToArray(xmlEntries[i]?.ety);
		for (let j = 0; j < xmlEtyomologies.length; j++) {
			const dbEty: Etymology = await prismaClient.etymology.create({
				data: {
					description: xmlEntries[i].term,
					entryID: dbEntry.id
				}
			});

			// create usages
			const xmlUsages = convertToArray(xmlEtyomologies[j]?.usage);
			for (let k = 0; k < xmlUsages.length; k++) {
				const dbUsage: Usage = await prismaClient.usage.create({
					data: {
						pos: xmlUsages[k]!.pos,
						etymologyID: dbEty.id
					}
				});

				// create groups
				const xmlGroups = convertToArray(xmlUsages[k]?.group);
				for (let l = 0; l < xmlGroups.length; l++) {
					const dbGroup: Group = await prismaClient.group.create({
						data: {
							description: xmlGroups[l]!.description,
							usageID: dbUsage.id
						}
					});

					// create grouped definitions
					const xmlDefinitionsGroup = convertToArray(xmlGroups[l]?.definition);
					for (const m of xmlDefinitionsGroup) {
						const dbDefinition: Definition = await prismaClient.definition.create({
							data: {
								text: m!,
								usageID: dbUsage.id,
								groupID: dbGroup.id
							}
						});
					}
				}

				// create definitions without groups
				const xmlDefinitionsNoGroup = convertToArray(xmlUsages[k]?.definition);
				for (const n of xmlDefinitionsNoGroup) {
					const dbDefinition: Definition = await prismaClient.definition.create({
						data: {
							text: n!,
							usageID: dbUsage.id,
							groupID: null
						}
					});
				}
			}
		}
	}
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		// Exit from db session
		await prismaClient.$disconnect();
	});
