#! /usr/bin/env python
import RPi.GPIO as gpio
import time

def setup(*pins):
        gpio.setmode(gpio.BCM)
        for pin in pins:
                gpio.setup(pin, gpio.OUT)

def blink(pin, speed):
	i = 0
	while i < 30:
		gpio.output(pin, True)
                time.sleep(speed / 1.5)
                gpio.output(pin, False)
		time.sleep(speed)
                i = i + 1

def led_on(pin):
        gpio.output(pin, True)

def led_off(pin):
        gpio.output(pin, False)

def reset():
	gpio.cleanup()

# blue=25 green=23 red=18

