import {xmlToJson} from './modules/xmlToJSON.js';
import {filterData} from './modules/dataFiltering.js';
import {adapter, db, ENTITY_ID, reset, clearState, find} from './modules/localStorage.js';
import {renderData, onSelectSite} from './modules/renderData.js';
import {initMap} from './modules/map.js';
import {main} from './modules/mainFunction.js';

$(document).ready(() => {
    $('.special-radio').change(onSelectSite);
    main();
});
