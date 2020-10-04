
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
//---Adding data to dropdown options

    let Africa = myData.items.filter(myData=> myData.region === "Africa" );
    document.getElementById( "Africa-region").value = Africa;

    let Arab = myData.items.filter(myData=> myData.region === "Arab States" );
    document.getElementById( "Arab-region").value = Arab;

    let Asia = myData.items.filter(myData=> myData.region === "Asia and the Pacific" );
    document.getElementById( "Asia-Pacific-region" ).value = Asia;

    let EuNa = myData.items.filter(myData=> myData.region === "Europe and North America" );
    document.getElementById( "Eu-America-region" ).value = EuNa;

    let LaCa = myData.items.filter(myData=> myData.region === "Latin America and the Caribbean" );
    document.getElementById( "Latin-Caribbean-region" ).value= LaCa;
    

//---Checkboxes

    let naturalSites = myData.items.filter(myData => myData.category === "Natural");
    document.getElementById("natural").value = naturalSites;

    let culturalSites = myData.items.filter(myData => myData.category === "Cultural");
    document.getElementById("cultural").value = culturalSites;

    let mixedSites = myData.items.filter(myData=> myData.category === "Mixed");
    document.getElementById("mixed").value = mixedSites;

function myFunction() {
  var checkBox = document.getElementById("Natural");
  var naturalMarkers = document.getElementById("text");
  if (checkBox.checked == true){
    text.style.display = "block";
  } else {
     text.style.display = "none";
  }
}

//---Google maps
// Nearby search from https://developers.google.com/maps/documentation/javascript/examples/place-search#maps_place_search-javascript
// Markers: https://developers.google.com/maps/documentation/javascript/markers#introduction
// Info window https://developers.google.com/maps/documentation/javascript/infowindows

function initMap() {
    let contentString ={};
        for (let i = 0; i < myData.items.length; i++){
           contentString = myData.items[i].site;
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

    let locationsInAfrica = [];
    let this_locationAfrica={};

    for (let i=0; i< Africa.length ; i++){
        this_locationAfrica= {
            lat: parseFloat(Africa[i].latitude),
            lng: parseFloat(Africa[i].longitude),
        }
        locationsInAfrica.push(this_locationAfrica);
    };


    let locationsInArab = [];
    let this_locationArab={};

    for (let i=0; i< Arab.length ; i++){
        this_locationArab= {
            lat: parseFloat(Arab[i].latitude),
            lng: parseFloat(Arab[i].longitude),
        }
        locationsInArab.push(this_locationArab);
    };


    let locationsInAsia = [];
    let this_locationAsia={};

    for (let i=0; i< Asia.length ; i++){
        this_locationAsia= {
            lat: parseFloat(Asia[i].latitude),
            lng: parseFloat(Asia[i].longitude),
        }
        locationsInAsia.push(this_locationAsia);
    };
    
    let locationsInEuNa = [];
    let this_locationEuNa={};

    for (let i=0; i< EuNa.length ; i++){
        this_locationEuNa= {
            lat: parseFloat(EuNa[i].latitude),
            lng: parseFloat(EuNa[i].longitude),
        }
        locationsInEuNa.push(this_locationEuNa);
    };

    let locationsInLaCa = [];
    let this_locationLaCa={};

    for (let i=0; i< LaCa.length ; i++){
        this_locationLaCa= {
            lat: parseFloat(LaCa[i].latitude),
            lng: parseFloat(LaCa[i].longitude),
        }
        locationsInLaCa.push(this_locationLaCa);
    };

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

//---Search button

//https://mkyong.com/javascript/javascript-get-selected-value-from-dropdown-list/
/*function search(){
				let e = document.getElementById("regions");
				let result = e.options[e.selectedIndex].value;
				document.getElementById("result").innerHTML = result;
            }
document.getElementById("search-button").addEventListener("click", search());*/

$('#Africa-region option').each(function() {
    if(this.selected == true){
       $("#Asia-region").hide()
    };
})

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
            map.setZoom(10);
            map.setCenter(marker.getPosition());
            infowindow.open(map, marker);
        });
    });

    let markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
}
    
//---table 
//source: https://www.w3schools.com/howto/howto_js_filter_table.asp
/*function myFunction() {
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

function getTableHeaders(obj) {
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

function writeToDocument(url) {
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