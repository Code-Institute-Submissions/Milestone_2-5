import {xmlToJson} from './xmlToJSON.js';
import {filterData} from './dataFiltering.js';
import {db} from './localStorage.js';
import {initMap} from './map.js';

function main() {
    console.log(db.getState());
    const storedData = db.getState();
    if (_.isEmpty(storedData)) {
        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/https://whc.unesco.org/en/list/xml/"
        }).done((response) => {
            const data = xmlToJson(response);
            console.log(data);
            db.defaults({ items: data.query.row }).write();
            const sdata = db.getState();
            const filteredData = filterData(sdata);
            initMap(sdata, filteredData);
        });
    } else {
        const filteredData = filterData(storedData);
        initMap(storedData, filteredData);
    }
    
}
//exporting module contents to script.js
export{main};
