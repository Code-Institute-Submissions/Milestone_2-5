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

function filterData(data) {
 let naturalSites = [];
 let culturalSites = [];
 let mixedSites = [];
 let locationsNatural = [];
 let locationsCultural = [];
 let locationsMixed = [];
 data.items.forEach((d) => {
 if (d.category === 'Natural') {
 naturalSites.push(d);
 locationsNatural.push({ loc: { lat: parseFloat(d.latitude), lng: parseFloat(d.longitude) }, id: d.id_number });
 } else if (d.category === 'Cultural') {
 culturalSites.push(d);
 locationsCultural.push({ loc: { lat: parseFloat(d.latitude), lng: parseFloat(d.longitude) }, id: d.id_number });
 } else if (d.category === 'Mixed') {
 mixedSites.push(d);
 locationsMixed.push({ loc: { lat: parseFloat(d.latitude), lng: parseFloat(d.longitude) }, id: d.id_number });
 }
 });
 return {
 naturalSites,
 culturalSites,
 mixedSites,
 locationsNatural,
 locationsCultural,
 locationsMixed
 }
}

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

function renderData(d) {
 return `
 <div id="content">
 <h6>${d.site}</h6>
 <p>${d.short_description}</p}
 <p><a target="_blank "href="${d.http_url}">Find out more<a></p>
 </div>
 `;
}

function onSelectSite() {
 const sdata = db.getState();
 const filteredData = filterData(sdata);
 initMap(sdata, filteredData);

 if ($("#natural").is(":checked")) {
 locations = filteredData.locationsNatural;
 };
 if ($("#cultural").is(":checked")) {
 locations = filteredData.locationsCultural;
 };
 if ($("#mixed").is(":checked")) {
 locations = filteredData.locationsMixed;
 };
 if ($("#all").is(":checked")) {
 locations = filteredData.locationsMixed.concat(filteredData.locationsCultural, filteredData.locationsNatural);
 };
}

function initMap(data, filteredData) {
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
 "featureType": "administrative.country",
 "elementType": "geometry",
 "stylers": [
 {
 "visibility": "on"
 },
 {
 "color": "#0080ff"
 }
 ]
 },
 {
 "featureType": "administrative.country",
 "elementType": "labels.text",
 "stylers": [
 {
 "visibility": "on"
 },
 {
 "hue": "#f100ff"
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
 ]
 });

 //---creating content for markers 

 
 let currentMarker;
 let locations;

 //radio button functionality

 if ($("#natural").is(":checked")) {
 locations = filteredData.locationsNatural;
 };
 if ($("#cultural").is(":checked")) {
 locations = filteredData.locationsCultural;
 };
 if ($("#mixed").is(":checked")) {
 locations = filteredData.locationsMixed;
 };
 if ($("#all").is(":checked")) {
 locations = filteredData.locationsMixed.concat(filteredData.locationsCultural, filteredData.locationsNatural);
 };
 
 // Markers

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
 const item = data.items.find((d) => d.id_number === marker.id);
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

 // Clustering markers
 let markerCluster = new MarkerClusterer(map, markers, {
 imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
 });
}

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

//---Google maps
// Markers: https://developers.google.com/maps/documentation/javascript/markers#introduction
// Info window https://developers.google.com/maps/documentation/javascript/infowindows
// Style from https://snazzymaps.com/

$(document).ready(() => {
 $('.special-radio').change(onSelectSite);
 main();
});