SELENIUM_JAR = tmp/selenium-server-standalone.52.0.jar

all: test dist_build

$(SELENIUM_JAR):
	wget http://goo.gl/qTy1IB -O $(SELENIUM_JAR)

prepare: $(SELENIUM_JAR)

unit:
	./node_modules/.bin/gulp test

lint:
	./node_modules/.bin/eslint lib tests

build: normal_build dist_build

normal_build:
	./node_modules/.bin/webpack

dist_build:
	NODE_ENV=production ./node_modules/.bin/webpack -p

selenium: prepare
	java -jar $(SELENIUM_JAR) >> tmp/selenium.log 2>&1 &

kill_selenium: prepare
	ps aux | grep java | grep -v grep | awk '{ print $$2 }' | xargs kill

run_integration: normal_build
	./node_modules/.bin/gulp features

integration: selenium run_integration kill_selenium

test: lint unit integration

.PHONY: test unit prepare
