import os
import spatialite

def connect_db(location):
    conn = spatialite.connect(location)
    return conn
