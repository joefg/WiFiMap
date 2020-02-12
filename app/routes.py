import json

from flask import render_template

from app import app

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title='jfg-gis')

@app.route('/api')
def serve_map():
    features = {}
    with open('data/wifi.geojson', 'r') as f:
        features = json.load(f)
    return features
