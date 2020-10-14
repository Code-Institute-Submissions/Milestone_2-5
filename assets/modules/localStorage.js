//--- Creating local storage for data
// Lowdb code example: see https://github.com/typicode/lowdb

const adapter = new LocalStorage('db');

const db = low(adapter);

const ENTITY_ID = 'items';

function reset() {
    db.set(ENTITY_ID, [])
        .write();
}
function clearState() {
    db.setState({});
}
function find(query) {
    return db.get(ENTITY_ID).find(query).value();
}
//exporting module contents to script.js
export{adapter, db, ENTITY_ID, reset, clearState, find};