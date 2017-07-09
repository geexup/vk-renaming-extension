import { DEFAULT_RENAMES } from '../core/rename.config';

for (const rename in DEFAULT_RENAMES) console.log(`[Rename] ${rename} -> ${DEFAULT_RENAMES[rename]}`);