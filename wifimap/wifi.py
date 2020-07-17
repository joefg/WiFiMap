import json
import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from wifimap.db import connect, to_geojson

bp = Blueprint('gis', __name__, url_prefix='/gis')

@bp.route('/')
@bp.route('/index')
def index():
    return render_template('index.html', title='Cambridgeshire WiFi Map')

@bp.route('/api/wifi')
def serve_wifi():
    db = connect('data/wifi.db')

    sql = '''
        SELECT
            AsGeoJSON(geometry) as "geom",
            "site_name",
            "address",
            "access",
            "status",
            "description"
        FROM wifi;
    '''
    db.execute(sql)
    result = db.fetchall()
    feature_collection = to_geojson(result)

    return json.dumps(feature_collection)

@bp.route('/api/districts')
def serve_districts():
    db = connect('data/districts.db')

    sql = '''
        SELECT
            AsGeoJSON(geometry) as "geom",
            lad13nm as "district"
        FROM lad
        WHERE lad13nm in (
            'Huntingdonshire',
            'Fenland',
            'East Cambridgeshire',
            'South Cambridgeshire',
            'Cambridge'
        );
    '''
    db.execute(sql)
    result = db.fetchall()
    feature_collection = to_geojson(result)

    return json.dumps(feature_collection)
