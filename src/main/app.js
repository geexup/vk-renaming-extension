import { DEFAULT_RENAMES } from '../core/rename.config';

// for (const rename in DEFAULT_RENAMES) console.log(`[Rename] ${rename} -> ${DEFAULT_RENAMES[rename]}`);

function makeRename() {
  let renamedCount = 0;
  const names = Array.from(document.querySelectorAll('.im-mess-stack--lnk:not(.renamed)'));

  names.forEach((nameElem) => {
    const userId = nameElem.href.split('/').filter((elem, indx, arr) => indx === arr.length - 1)[0];
    
    if (DEFAULT_RENAMES[userId] !== void 0) {
      nameElem.innerText = DEFAULT_RENAMES[userId];
      renamedCount++;
    }
    
    nameElem.classList.add('renamed');
  });

  if (renamedCount > 0) console.log(`[Rename] ${renamedCount} users was renamed`);
}

makeRename(); setInterval(makeRename, 300);