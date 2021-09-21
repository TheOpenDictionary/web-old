import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { readFileSync, readdirSync } from 'fs';
import { compact, isArray } from 'lodash-es';

import prisma from '@prisma/client';
import xml from 'fast-xml-parser';
import he from 'he';

import type { Dictionary } from './types';

const client = new prisma.PrismaClient();
const dictionaryDir = join(dirname(fileURLToPath(import.meta.url)), 'dictionaries');
const files = readdirSync(dictionaryDir.toString());

const convertToArray = <T>(value: T | T[]): T[] => {
	if (!value) return [];
	return compact(isArray(value) ? value : [value]);
};

const seed = files.map(async (file) => {
	const splitFilename = file.split('-');

	const [sourceLanguage, targetLanguage] = splitFilename;

	const { dictionary } = xml.parse(readFileSync(join(dictionaryDir, file), 'utf8'), {
		attributeNamePrefix: '',
		ignoreAttributes: false,
		attrValueProcessor: (val) => he.decode(val, { isAttributeValue: true }),
		tagValueProcessor: (val) => he.decode(val)
	}) as { dictionary: Dictionary };
	console.log(convertToArray(dictionary.entry).length);
	await client.dictionary.create({
		data: {
			sourceLanguage: {
				connectOrCreate: {
					create: {
						code: sourceLanguage,
						flag: sourceLanguage
					},
					where: {
						code: sourceLanguage
					}
				}
			},
			targetLanguage: {
				connectOrCreate: {
					create: {
						code: targetLanguage,
						flag: targetLanguage
					},
					where: {
						code: targetLanguage
					}
				}
			},
			name: dictionary.name,
			entries: {
				create: convertToArray(dictionary.entry)
					.slice(1, 5)
					.map((entry) => ({
						term: entry.term,
						etymologies: {
							create: convertToArray(entry.ety).map((ety) => ({
								description: ety?.description,
								usages: convertToArray(ety.usage).map((usage) => ({
									pos: usage?.pos,
									definitions: convertToArray(usage?.definition),
									groups: convertToArray(usage.group).map((group) => ({
										description: group.description,
										definitions: convertToArray(group.definition)
									}))
								}))
							}))
						}
					}))
			}
		}
	});
});

Promise.all(seed).catch((e) => console.log(e));
