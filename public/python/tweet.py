#!/usr/bin/env python
import tweepy
import datetime

CONSUMER_KEY = 'kI4Cu8XfQ4rh981SHCryg' #You'll have to make an application for your Twitter account
CONSUMER_SECRET = 'zz7m6KwG2fyPA1Z8zmld3XU69ke5WBQuQBSzkde6pI' #Configure your app to have read-write access and sign in capability
ACCESS_KEY = '1536880699-7f10PWlaA5tvdjuHMaEW2BP51aj9yR9BDb5JoyH'
ACCESS_SECRET = 'IOrjzgezYdS9qlYT68qyzKsI3YjI44MpRhNcTi2Mxs'

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
api = tweepy.API(auth)

def tweet(text):
	api.update_status(text)
	return text
