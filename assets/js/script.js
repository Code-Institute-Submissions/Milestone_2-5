
//---XML to JSON conversion
/* Modified version from here: http://davidwalsh.name/convert-xml-json
* @param {string} xml XML DOM tree
*/
function xmlToJson(xml) {
    let obj = {};

    if (xml.nodeType == 1) {

        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (let j = 0; j < xml.attributes.length; j++) {
                let attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) {
        obj = xml.nodeValue;
    }
    let textNodes = [].slice.call(xml.childNodes).filter(function (node) {
        return node.nodeType === 3;
    });
    if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
        obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
            return text + node.nodeValue;
        }, "");
    } else if (xml.hasChildNodes()) {
        for (let i = 0; i < xml.childNodes.length; i++) {
            let item = xml.childNodes.item(i);
            let nodeName = item.nodeName;
            if (typeof obj[nodeName] == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof obj[nodeName].push == "undefined") {
                    let old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}

//--- Creating local storage for data

// Lowdb code example: see https://github.com/typicode/lowdb

const adapter = new LocalStorage('db');

const db = low(adapter);

ENTITY_ID = 'items';

// Set default state
// db.defaults({ items: [] })
//   .write()

function add() {
    db.get(ENTITY_ID)
        .push({ time: Date.now() })
        .write();
}
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
console.log(db.getState());

const myData = db.getState();

if (_.isEmpty(myData)) {
    $.ajax({
        url: "https://cors-anywhere.herokuapp.com/https://whc.unesco.org/en/list/xml/"
    }).done((response) => {
        const data = xmlToJson(response);
        console.log(data);
        db.defaults({ items: data.query.row }).write();
    });
}

//---Adding data to dropdown
function dropdownFunction(){
    let Africa = myData.items.filter(myData=> myData.region === "Africa" );
    let Arab = myData.items.filter(myData=> myData.region === "Arab States" );
    let Asia = myData.items.filter(myData=> myData.region === "Asia" );
    let EuNa = myData.items.filter(myData=> myData.region === "Europe and North America" );
    let EuNaAsPaLaCa = myData.items.filter(myData=> myData.region === "Europe and North America,Asia and the Pacific,Latin America and the Caribbean" );
    let EuNaAsPa = myData.items.filter(myData=> myData.region === "Europe and North America,Asia and the Pacific" );
    let LaCa = myData.items.filter(myData=> myData.region === "Latin America and the Caribbean" );

    document.getElementById( "Africa-region").value = Africa;
    document.getElementById( "Arab-region").value = Arab;
    document.getElementById( "Asia-Pacific-region" ).value = Asia;
    document.getElementById( "Eu-America-region" ).value = EuNa;
    document.getElementById( "World-region" ).value = EuNaAsPaLaCa;
    document.getElementById( "Eu-America-Asia-Pacific-region" ).value = EuNaAsPa;
    document.getElementById( "Latin-Caribbean-region" ).value= LaCa;

    checkboxFunction();
}

//---Checkbox functionality

function checkboxFunction() {
    let naturalSites = myData.items.filter(myData => myData.category === "Natural");
    let culturalSites = myData.items.filter(myData => myData.category === "Cultural");
    let mixedSites = myData.items.filter(myData=> myData.category === "Mixed");

    document.getElementById("natural").value = naturalSites;
    document.getElementById("cultural").value = culturalSites;
    document.getElementById("mixed").value = mixedSites;
}

//---Search button

document.getElementById("search-button").addEventListener("click", dropdownFunction); 

//---Google maps
// Nearby search from https://developers.google.com/maps/documentation/javascript/examples/place-search#maps_place_search-javascript
// Markers: https://developers.google.com/maps/documentation/javascript/markers#introduction
// Info window https://developers.google.com/maps/documentation/javascript/infowindows
// Zoom tha map when marker is clicked https://developers.google.com/maps/documentation/javascript/examples/event-simple

function initMap() {
    let contentString ={};
        for (let i = 0; i < myData.items.length ; i++){
           contentString = myData.items[i].http_url;
        };
    let infowindow = new google.maps.InfoWindow({
        content: contentString
        });
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });

    map.addListener("center_changed", () => {
        if (currentMarker) {
            window.setTimeout(() => {
                map.panTo(currentMarker.getPosition());
            }, 3000);
        }
    });

    let currentMarker;

    let locations = [];

    let this_location= {};

    for (let i=0; i<myData.items.length ; i++){
        this_location = {
            lat: parseFloat(myData.items[i].latitude),
            lng: parseFloat(myData.items[i].longitude),
        }
        locations.push(this_location);
    };

    let icon="https://img.icons8.com/nolan/64/unesco.png";
    let markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            map: map,
            icon: icon,          
        });
    }); 

    markers.forEach((marker) => {
        marker.addListener("click", (event) => {
            console.log(event);
            console.log(marker);
            currentMarker = marker;
            map.setZoom(8);
            map.setCenter(marker.getPosition());
            infowindow.open(map, marker);
        });
    });

    let markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

    const request = {
        query: "Museum of Contemporary Art",
        fields: ["name", "geometry"],
    };

    let service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (let i = 0; i < results.length; i++) {
                createMarker(results[i]);
                }
                map.setCenter(results[0].geometry.location);
            }
    });
    }

    function createMarker(place) {
        const marker = new google.maps.Marker({
            map,
            position: place.geometry.location,
        });
        google.maps.event.addListener(marker, "click", () => {
            infowindow.setContent(place.name);
            infowindow.open(map);
            });
    }



//---table 
//source: https://www.w3schools.com/howto/howto_js_filter_table.asp
function myFunction() {
  // Declare letiables
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

//let sitesList = document.getElementById('sites');
//sites.innerHTML = myData.items[0].site;
//console.log(myData.items[0].site)

/*function getTableHeaders(obj) {
    let tableHeaders = [];

    Object.keys(obj).forEach(function(key) {
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function generatePaginationButtons(next, prev) {
    if (next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>
                <button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (next && !prev) {
        return `<button onclick="writeToDocument('${next}')">Next</button>`;
    } else if (!next && prev) {
        return `<button onclick="writeToDocument('${prev}')">Previous</button>`;
    }
}

/*function writeToDocument(url) {
    let tableRows = [];
    let el = document.getElementById("data");

    getData(url, function(data) {
        let pagination = "";

        if (data.next || data.previous) {
            pagination = generatePaginationButtons(data.next, data.previous);
        }
        data = data.results;
        let tableHeaders = getTableHeaders(data[0]);

        data.forEach(function(item) {
            let dataRow = [];

            Object.keys(item).forEach(function(key) {
                let rowData = item[key].toString();
                let truncatedData = rowData.substring(0, 15);
                dataRow.push(`<td>${truncatedData}</td>`);
            });
            tableRows.push(`<tr>${dataRow}</tr>`);
        });

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>${pagination}`.replace(/,/g, "");
    });
}*/


//spinner
let mylet;

function timeout() {
  mylet = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("myTable").style.display = "block";
}