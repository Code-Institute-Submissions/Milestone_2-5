
/* XML to JSON conversion
* Modified version from here: http://davidwalsh.name/convert-xml-json
* @param {string} xml XML DOM tree
*/
function xmlToJson(xml) {
    var obj = {};

    if (xml.nodeType == 1) {

        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) {
        obj = xml.nodeValue;
    }
    var textNodes = [].slice.call(xml.childNodes).filter(function (node) {
        return node.nodeType === 3;
    });
    if (xml.hasChildNodes() && xml.childNodes.length === textNodes.length) {
        obj = [].slice.call(xml.childNodes).reduce(function (text, node) {
            return text + node.nodeValue;
        }, "");
    } else if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof obj[nodeName] == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof obj[nodeName].push == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}

// Lowdb code example
// See https://github.com/typicode/lowdb

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

var sitesList = document.getElementById('sites');
sites.innerHTML = myData.items[0].site;
console.log(myData.items[0].site);

for (var i; i < myData.items.length; i++){
console.log(myData.items[i]);
}

var options;
for (options in myData.items){
    
}





const naturalSites = myData.items.filter(myData => myData.category === "Natural");
const culturalSites = myData.items.filter(myData => myData.category === "Cultural");
const mixedSites = myData.items.filter(myData=> myData.category === "Mixed");

/*function addCategoryNatural() {
    if (document.getElementById("natural").checked == true) {
        document.load(naturalSites);
    }
    else {
        document.getElementById("natural").checked == false
    }
};
addCategoryNatural();

function addCategoryCultural() {
    if (document.getElementById("cultural").checked == true) {
        document.load(culturalSites);
    }
    else {
        document.getElementById("cultural").checked == false
    }
};
addCategoryCultural();*/



// Google maps

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });

    var labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    var locations = [{
        lat: 40.785091,
        lng: -73.968285
    }, {
        lat: 41.084045,
        lng: -73.874256

    }];

    var markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });
var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
}
