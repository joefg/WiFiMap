import json

from flask import render_template

from app import app

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title='jfg-gis')

@app.route('/api/wifi')
def serve_wifi():
    features = {}
    with open('data/wifi.geojson', 'r') as f:
        features = json.load(f)
    return features

@app.route('/api/counties')
def serve_counties():
    features = {}
    with open('data/counties.topojson', 'r') as f:
        features = json.load(f)
    return features
