# WiFiMap
This is a toy GIS application. It shows free council-provided WiFi hotspots in Cambridgeshire. 

## Dependencies
* Python 3; (contained in requirements.txt)
* Sqlite3 and Spatialite.

## Deployment
```
mkdir data && bash get_data.sh

export FLASK_APP=wifimap
export FLASK_ENV=development
python3 -m flask run
```

## Data used
[Public access WiFI locations in Cambridge](https://data.gov.uk/dataset/920bb16d-3811-4a40-b2d1-0bd4dae99089/public-access-wi-fi-locations)
[Districts data across England](https://martinjc.github.io/UK-GeoJSON/json/eng/topo_lad.json)
