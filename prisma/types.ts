export interface Dictionary {
    id:    string;
    name:  string;
    entry: Entry[];
}

export interface Entry {
    term: string;
    ety:  Etymology[] | Etymology;
}

export interface Etymology {
    id:    string;
    usage: Usage;
}

export interface Usage {
    pos:        Pos;
    definition: string[] | string;
}

export enum Pos {
    Un = "un",
}
