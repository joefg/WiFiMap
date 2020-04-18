var gis = (function() {
    var styles = {
        'Point' : new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: null,
                stroke: new ol.style.Stroke({
                    color: 'red',
                    width: 1
                })
            })
        })
    }

    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    url: '/api',
                    format: new ol.format.GeoJSON()
                }),
                style: styles['Point']
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([37.41, 8.82]),
            zoom: 4
        })
    })

    return {
        map : map
    }
})();
