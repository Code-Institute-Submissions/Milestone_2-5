import {filterData} from './dataFiltering.js';
import {db} from './localStorage.js';
import {initMap} from './map.js';

//marker infowindow structure

function renderData(d) {
    return `
        <div id="content">
            <h6>${d.site}</h6>
            <p>${d.short_description}</p}
            <p><a target="_blank "href="${d.http_url}">Find out more<a></p>
        </div>
    `;
}

//markers data

function onSelectSite() {
    const sdata = db.getState();
    const filteredData = filterData(sdata);
    initMap(sdata, filteredData);

    if ($("#natural").is(":checked")) {
        locations = filteredData.locationsNatural;
    }
    if ($("#cultural").is(":checked")) {
        locations = filteredData.locationsCultural;
    }
    if ($("#mixed").is(":checked")) {
        locations = filteredData.locationsMixed;
    }
    if ($("#all").is(":checked")) {
        locations = filteredData.locationsMixed.concat(filteredData.locationsCultural, filteredData.locationsNatural);
    }
}
//exporting module contents to script.js
export{renderData, onSelectSite};
