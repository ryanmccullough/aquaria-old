#! /usr/bin/env python

import csv

def createdatabase(*headers):
	with open('/home/pi/node_server/app/public/python/data.csv', 'wb') as csvfile:
		datawriter = csv.writer(csvfile)
		datawriter.writerow(headers)

def datawrite(*data):
	with open('/home/pi/node_server/app/public/python/data.csv', 'a') as csvfile:
		datawriter = csv.writer(csvfile)
		datawriter.writerow(data)
