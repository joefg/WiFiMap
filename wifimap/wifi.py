import json
import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

bp = Blueprint('gis', __name__, url_prefix='/gis')

@bp.route('/')
@bp.route('/index')
def index():
    return render_template('index.html', title='Cambs WiFi Map')

@bp.route('/api/wifi')
def serve_wifi():
    features = {}
    with open('data/wifi.geojson', 'r') as f:
        features = json.load(f)
    return features

@bp.route('/api/districts')
def serve_counties():
    features = {}
    with open('data/districts.topojson', 'r') as f:
        features = json.load(f)
    return features
