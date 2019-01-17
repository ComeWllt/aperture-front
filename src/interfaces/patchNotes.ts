export interface IParsedPatchNote {
  version: string;
  description: string[];
  date: string;
}

export interface IPatchNote {
  [version: string]: {
    description: string[];
    date: string;
  };
}
