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

const ENTITY_ID = 'items';

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
//---Google maps
// Markers: https://developers.google.com/maps/documentation/javascript/markers#introduction
// Info window https://developers.google.com/maps/documentation/javascript/infowindows
// Style from https://snazzymaps.com/

function renderData(d) {
    return `
        <div id="content">
            <h6>${d.site}</h6>
            <p>${d.short_description}</p}
            <a href="${d.http_url}">Find out more<a>
        </div>
    `;
}

function initMap() {

    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33.134766
        },
        styles: [
            {
                "featureType": "all",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "hue": "#59ff00"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#00c6ff"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#00cfff"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#00fff5"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#46bcec"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ],
    });

    //---markers of sites by type

    let naturalSites = myData.items.filter(myData => myData.category === "Natural");
    document.getElementById("natural").value = naturalSites;

    let culturalSites = myData.items.filter(myData => myData.category === "Cultural");
    document.getElementById("cultural").value = culturalSites;

    let mixedSites = myData.items.filter(myData => myData.category === "Mixed");
    document.getElementById("mixed").value = mixedSites;

    let locationsNatural = [];
    let this_locationNatural = {};
    for (let i = 0; i < naturalSites.length; i++) {
        this_locationNatural = {
            loc: {
                lat: parseFloat(naturalSites[i].latitude),
            lng: parseFloat(naturalSites[i].longitude),
            },
            id: naturalSites[i].id_number
        }
        locationsNatural.push(this_locationNatural);
    };

    let locationsCultural = [];
    let this_locationCultural = {};
    for (let i = 0; i < culturalSites.length; i++) {
        this_locationCultural = {
            loc: {
                lat: parseFloat(culturalSites[i].latitude),
            lng: parseFloat(culturalSites[i].longitude)
            },
            id: culturalSites[i].id_number,
        }
        locationsCultural.push(this_locationCultural);
    };

    let locationsMixed = [];
    let this_locationMixed = {};
    for (let i = 0; i < mixedSites.length; i++) {
        this_locationMixed = {
            loc: {
                lat: parseFloat(mixedSites[i].latitude),
            lng: parseFloat(mixedSites[i].longitude),
            },
            id: mixedSites[i].id_number
        }
        locationsMixed.push(this_locationMixed);
    };

    let currentMarker;

    //---markers

    let locations = locationsMixed.concat(locationsCultural, locationsNatural);
    console.log(locations);

    const contentString = '';

      const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    let icon = "https://img.icons8.com/nolan/64/unesco.png";
    let markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location.loc,
            map: map,
            icon: icon,
            id: location.id
        });
    });

    markers.forEach((marker) => {
        marker.addListener("mouseover", (event) => {
            console.log(event);
            console.log(marker);
            currentMarker = marker;
            infowindow.open(map, marker);
            const item = myData.items.find((d) => d.id_number === marker.id);
            infowindow.setContent(renderData(item));
        });
        marker.addListener("click", (event) => {
            console.log(event);
            console.log(marker);
            currentMarker = marker;
            map.setZoom(10);
            map.setCenter(marker.getPosition());
        });
    });

    let markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

//---Radio buttons
    document.getElementById("natural").value = locationsNatural.loc;
    document.getElementById("cultural").value = locationsCultural.loc;
    document.getElementById("mixed").value = locationsMixed.loc;


   $("input").click(function(){
       if ('#natural'.checked == true) {
        $("markers.locations.locationsCultural", "markers.locations.locationsMixed").hide();
       };
      if ('#cultural'.checked == true) {
         $("markers.locations.locationsNatural", "markers.locations.locationsMixed").hide();
       };
       if ('#mixed'.checked == true) {
         $("markers.locations.locationsNatural", "markers.locations.locationsCultural").hide();
       };
    });
}
