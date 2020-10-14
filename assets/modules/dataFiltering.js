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
//exporting module contents to script.js
export{filterData};