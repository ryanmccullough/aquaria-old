#! /usr/bin/env python

import RPi.GPIO as gpio
import time, sys, tweet, datetime
import thermometer as temp
import ledcontrol as led
import datacontrol as dcontrol
import lightlevel as light

#Setup up pins for LEDs.
led.setup(18, 23, 25)

#Define the monitor function.
def monitor_():

	#Read temp and light level.
	mon_temp_c = temp.read_temp_c()
	mon_light = light.RCtime(22)
	mon_pH = 7.0
	mon_DO = 97
	timenow = datetime.datetime.now().time()
	datenow = datetime.date.today()

	#Write sensor data to csv file.
	dcontrol.datawrite(mon_temp_c, mon_pH, mon_DO, datenow, timenow, datenow + " " + timenow)

	#Blink LED based on temp.
	if mon_temp_c < 24:
		led.blink(25, 1)
	elif mon_temp_c <= 27:
		led.blink(23, 1)
	elif mon_temp_c > 27:
		led.blink(18, 1)
	else:
		pass
	print str(mon_temp_c) + str(mon_light)
	#Cleanup GPIO pins used.
	#led.reset()

#Define the tweet function.
def tweet_():
	
	#Read temp and light level.
	tw_temp_c = temp.read_temp_c()
	tw_light = light.RCtime(22)
	
	#Load the date and time.
	now = datetime.datetime.now()
	
	#Format time like bash shell.
	dateF = now.strftime("%a %b %d %H:%M CDT %Y")

	#Set Tweet contents.
	tweettext = "The lights are currently " + str(tw_light) + ".\nThe current water temperature is: " + str(tw_temp_c) + u'\xB0' + "C \nPrepared: " + str(dateF)
	
	#Send the Tweet.
	print tweet.tweet(tweettext.encode('UTF-8'))

	#Blink the Blue LED.
	led.blink(25, 1)

def setmode():
	
	#Load system arguments from shell.
	mode = sys.argv
	
	if len(mode) == 1:
		print "No argument. Use monitor or tweet."
	elif mode[1] == "monitor":
		monitor_()
		print "Monitor Mode"
		#Cleanup GPIO pins used.
        	led.reset()
	elif mode[1] == "tweet":
		tweet_()
		monitor_()
		print "Tweet Mode"
		#Cleanup GPIO pins used.
	        led.reset()
	else:	
		print "Argument invalid. Use monitor or tweet."

setmode()
#try:
#	while 1:
#		led.setup(18, 23, 25)
#		temp_c = temp.read_temp_c()
#		temp_f = temp_c * 9.0 / 5.0 + 32.0
#		
#		if temp_c < 24:
#			led.led_off(18)
#			led.led_off(23)
#			led.led_on(25)
#		else:
#			if temp_c <= 27:
#				led.led_off(18)
#				led.led_on(23)
#				led.led_off(25)
#			else:
#				if temp_c > 27:
#					led.led_on(18)
#					led.led_off(23)
#					led.led_off(25)
#		print (str(temp_c) + "*C " + str(temp_f) + "*F")
#		time.sleep(5)	
#except KeyboardInterrupt:
#	led.gpio.cleanup()


#i = 1
#while i < 10:
#	print temp.read_temp_c()
#	blink(18)
#	blink(23)
#	blink(25)
#	i = i + 1
#	time.sleep(.25)
	
#gpio.cleanup()
