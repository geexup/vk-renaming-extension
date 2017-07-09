import { DEFAULT_RENAMES } from '../core/rename.config';

let RENAMES = {};

chrome.runtime.sendMessage({ method: "getLocalStorage", key: "RENAMES_OBJECT" }, function (response) {
  RENAMES = JSON.parse(response.data) || DEFAULT_RENAMES;

  makeRename(); setInterval(makeRename, 300);
});

function makeRename() {
  let renamedCount = 0;
  const names = Array.from(document.querySelectorAll('.im-mess-stack--lnk:not(.renamed)'));

  names.forEach((nameElem) => {
    const userId = nameElem.href.split('/').filter((elem, indx, arr) => indx === arr.length - 1)[0];
    
    if (RENAMES[userId] !== void 0) {
      nameElem.innerText = RENAMES[userId];
      renamedCount++;
    }
    
    nameElem.classList.add('renamed');
  });

  if (renamedCount > 0) console.log(`[Rename] ${renamedCount} users was renamed`);
}