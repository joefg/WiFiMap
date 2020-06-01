echo "Fetching data..."
wget https://data.cambridgeshireinsight.org.uk/sites/default/files/Site%20list.geojson -O data/wifi.geojson
wget https://martinjc.github.io/UK-GeoJSON/json/eng/topo_lad.json -O data/districts.topojson

echo "Converting data..."
ogr2ogr -f sqlite -dsco SPATIALITE=YES data/wifi.db data/wifi.geojson
ogr2ogr -f sqlite -dsco SPATIALITE=YES data/districts.db data/districts.topojson
