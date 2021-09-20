import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { readFileSync, readdirSync } from 'fs';
import { compact, isArray } from 'lodash-es';

import prisma from '@prisma/client';
import xml from 'fast-xml-parser';
import he from 'he';

const client = new prisma.PrismaClient();
const dictionaryDir = join(dirname(fileURLToPath(import.meta.url)), 'dictionaries');
const files = readdirSync(dictionaryDir.toString()).map((file) => join(dictionaryDir, file));

const convertToArray = <T>(value: T | T[]): T[] => {
	return compact(isArray(value) ? value : [value]);
};

const seed = files.forEach(async (file) => {
	const splitFilename = file.split('-');

	const [sourceLanguage, targetLanguage] = splitFilename;

	const data = xml.parse(readFileSync(file, 'utf8'), {
		attributeNamePrefix: '',
		ignoreAttributes: false,
		attrValueProcessor: (val) => he.decode(val, { isAttributeValue: true }),
		tagValueProcessor: (val) => he.decode(val)
	});

	// client.dictionary.create({
	//   data: {
	//     name: dictionary.name,
	//   }
	// });
	console.log(JSON.stringify(data));
	// data.dictionary.entry.forEach((entry) => {
	// 	const { id, term, ety } = entry;

	// 	convertToArray(ety).forEach(({ usage }) => {
	// 		convertToArray(usage).forEach(({ group, definition, pos }) => {
	// 			console.log(definition);
	// 			convertToArray(group).forEach(({ definition }) => {
	// 				console.log(definition);
	// 			});
	// 		});
	// 	});
	// 	console.log(term);
	// });
	// const { dictionary } = data;
	// const { entries } = dictionary;
	// const { entry } = entries;
	// const { id, word, definition } = entry;
	// const { language, region } = id;
	// const { text } = definition;
	// const { $t } = text;

	// client.dictionary.create({
	// 	data: {
	// 		language,
	// 		region,
	// 		word,
	// 		definition: $t
	// 	}
	// });
});

export {};
