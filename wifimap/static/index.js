var gis = (function() {
    var district_style = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.05)'
        }),
        stroke: new ol.style.Stroke({
            color: '#319FD3',
            width: 1
        }),
        text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            fill: new ol.style.Fill({
                color: '#000'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 3
            })
        })
    }); 

    var hotspot_style = new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 1)'
        }),
        stroke: new ol.style.Stroke({
            color: '#FFFFFF',
            width: 1
        }),
        text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            fill: new ol.style.Fill({
                color: '#000'
            }),
            stroke: new ol.style.Stroke({
                color: '#fff',
                width: 3
            })
        })
    }); 

    var view = new ol.View({
        center: ol.proj.fromLonLat([0.04434399079215103,52.30404830548494]),
        zoom: 9
    });

    var popup = new ol.Overlay({
        element : document.getElementById('popup')
    });

    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            new ol.layer.Vector({
                name: "districts",
                source: new ol.source.Vector({
                    url: '/gis/api/districts',
                    format: new ol.format.GeoJSON()
                }),
                style: function(feature){
                    district_style.getText().setText(feature.get('district'))
                    return district_style
                }
            }),
            new ol.layer.Vector({
                name: "wifi",
                source: new ol.source.Vector({
                    url: '/gis/api/wifi',
                    format: new ol.format.GeoJSON()
                })
            })
        ],
        view: view,
        overlays: [
            popup
        ]
    });

    var select = new ol.interaction.Select({
        layers: function(layer){
            if(layer.values_.name == "wifi"){
                return true
            }
        },
        filter: function(feature, layer){
            return true;
        }
    });
    var select_interaction = function(){
        if (select == null){
            map.removeInteraction(select)
        } else {
            map.addInteraction(select);
            select.on('select', function(ev){
                if (ev.selected.length > 0){
                    let coord = ev.mapBrowserEvent.coordinate;

                    let address = ev.selected[0].values_.address;
                    let description = ev.selected[0].values_.description;
                    let status = ev.selected[0].values_.status;
                    let access = ev.selected[0].values_.access;

                    let content = `<b>Address: </b> ${address}<br>` +
                        `<b>Details: </b> ${description}<br>` +
                        `<b>Status: </b> ${status}<br>` +
                        `<b>Access: </b> ${access}<br>`
        
                    document.getElementById('popup-content').innerHTML = content;
                    popup.setPosition(coord);
                }
            })
        }
    };

    document.getElementById('popup-closer').onclick = function(){
        popup.setPosition(undefined);
        return false;
    };

    select_interaction();

    return {
        map : map,
        view : view,
        popup : popup
    }
})();
