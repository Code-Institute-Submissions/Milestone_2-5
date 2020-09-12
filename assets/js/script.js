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
    }, {
        lat: 40.754932,
        lng: -73.984016
    }];

    var markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });
}
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("data").innerHTML = this.responseText;
    }
};
xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://whc.unesco.org/en/list/xml/");
xhr.send();