import os
import spatialite
import geojson

def connect(location):
    conn = spatialite.connect(location)
    cursor = conn.cursor()

    def dict_factory(cursor, row):
        d = {}
        for index, column in enumerate(cursor.description):
            d[column[0]] = row[index]
        return d

    conn.row_factory = dict_factory

    return conn.cursor()

def to_geojson(result):
    feature_collection = []
    for row in result:
        geom = geojson.loads(row['geom'])
        row.pop('geom')
        feature = geojson.Feature(geometry=geom, properties=row)
        feature_collection.append(feature)

    feature_collection = geojson.FeatureCollection(feature_collection)
    return feature_collection
