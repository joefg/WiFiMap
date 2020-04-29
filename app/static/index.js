var gis = (function() {

    var generate_text_style = function(feature, key){
        return new ol.style.Text({
            font: '11px "sans-serif"',
            text: feature.get(key),
            stroke: new ol.style.Stroke({
                color: 'black'
            })
        })
    };

    var styles = {
        'Point' : function(feature, resolution) {
            return new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 5,
                    fill: null,
                    stroke: new ol.style.Stroke({
                        color: 'red',
                        width: 1
                    })
                }),
                text: generate_text_style(feature, 'Site Name')
            })
        }
    };

    var view = new ol.View({
        center: ol.proj.fromLonLat([0.04434399079215103,52.30404830548494]),
        zoom: 9
    });

    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    url: '/api/districts',
                    format: new ol.format.TopoJSON()
                }),
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    url: '/api/wifi',
                    format: new ol.format.GeoJSON()
                }),
                style: styles['Point']
            })
        ],
        view: view
    });

    return {
        map : map,
        view : view
    }
})();
