export interface Dictionary {
	id: string;
	name: string;
	entry: Entry[] | Entry;
}

export interface Entry {
	term: string;
	ety?: Etymology[] | Etymology;
}

export interface Etymology {
	id: string;
	description?: string;
	usage?: Usage[] | Usage;
}

export interface Usage {
	pos: Pos;
	group?: Group | Group[];
	definition?: string[] | string;
}

export interface Group {
	description: string;
	definition: string[] | string;
}

export enum Pos {
	Un = 'un'
}
