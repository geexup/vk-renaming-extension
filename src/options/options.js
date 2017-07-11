import { DEFAULT_RENAMES }  from '../core/rename.config'

class OptionsPage {
  constructor() {
    this.renameList = [];
    this.addList = [];

    this.listElement = document.querySelector('.list');
    this.addListElement = document.querySelector('.addingList');

    this.addBtn = document.querySelector('.addUser');
    this.saveBtn = document.querySelector('.save');
    
    this.init();
  }

  init() {
    if (localStorage.getItem('RENAMES_OBJECT') === null) localStorage.setItem('RENAMES_OBJECT', JSON.stringify(DEFAULT_RENAMES));

    console.log(`[Rename] Options page`);
    this.renameList = this.makeList(JSON.parse(localStorage.getItem('RENAMES_OBJECT')) || DEFAULT_RENAMES);

    this.addBtn.addEventListener('click', () => this.addUser());
    this.saveBtn.addEventListener('click', () => this.save());

    console.log(this.renameList);

    this.render();
  }

  render() {
    const userTemplate = (userId, rename) => `<div class="user"><span class="userId">${userId}</span><span class="rename">${rename}</span><div class="delete">Delete</div></div>`;
    const addingTemplate = (userId, rename) => `<div class="user"><input name="userId" class="userId" value="${userId}" placeholder="user id"></input><input name="rename" class="rename" value="${rename}" placeholder="new name"></input></div>`;

    let listHtml = '';
    let addListHtml = '';

    // Clear
    this.listElement.innerHTML = '';
    this.addListElement.innerHTML = '';

    for (const user of this.renameList) listHtml += userTemplate(user.key, user.value);
    for (const user of this.addList) addListHtml += addingTemplate(user.key, user.value);

    this.listElement.innerHTML = listHtml;
    this.addListElement.innerHTML = addListHtml;

    Array.from(this.listElement.querySelectorAll('.user')).forEach((element, index) => { 
      element.addEventListener('click', () => this.edit(index));
    });

    Array.from(this.listElement.querySelectorAll('.user .delete')).forEach((element, index) => {
      element.addEventListener('click', (e) => {
        e.stopPropagation();

        if (!confirm(`Delete '${this.renameList[index].key}' -> '${this.renameList[index].value}'?`)) return;

        this.renameList.splice(index, 1);

        localStorage.setItem('RENAMES_OBJECT', JSON.stringify(this.makeObjectFromList(this.renameList)));
        this.render();
      });
    });

    console.log('[Rename] Re-rendered');
  }

  makeList(obj) {
    const arr = [];
    for (const key in obj) arr.push({ key, value: obj[key] });
    return arr;
  }

  makeObjectFromList(arr) {
    const obj = {};
    for (const o of arr) obj[o.key] = o.value;
    return obj;
  }

  bindHtmlAddListToObj() {
    const userElements = Array.from(this.addListElement.querySelectorAll('.user'));

    for (let i = 0; i < userElements.length; i++) {
      const userElem = userElements[i];
      const userId = userElem.querySelector('[name=userId]').value;
      const rename = userElem.querySelector('[name=rename]').value;
      
      this.addList[i] = { key: userId, value: rename };
    }
  }

  addUser() {
    this.bindHtmlAddListToObj();
    this.addList.push({ key: '', value: '' });
    this.render();
  }

  edit(index) {
    const rename = this.renameList[index];
    const newRename = prompt('New name?', rename.value);

    if (newRename === null) return;

    this.renameList[index].value = newRename;
    localStorage.setItem('RENAMES_OBJECT', JSON.stringify(this.makeObjectFromList(this.renameList)));
    this.render();
  }

  save() {
    this.bindHtmlAddListToObj();
    const usedRenames = Object.keys(this.makeObjectFromList(this.renameList));
    
    for (const user of this.addList) {
      user.key = user.key.replace(/\//, '').toLowerCase();

      if (user.key.length > 0 && user.value.length > 0 && !usedRenames.includes(user.key)) this.renameList.push(Object.assign({}, user));
    }

    this.addList = [];

    localStorage.setItem('RENAMES_OBJECT', JSON.stringify(this.makeObjectFromList(this.renameList)));
    this.render();
  }
}

new OptionsPage();