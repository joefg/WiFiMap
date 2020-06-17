#
# makefile
#

run_dev:
	export FLASK_APP=wifimap
	export FLASK_ENV=development
	python3 -m flask run
