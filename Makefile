SELENIUM_JAR		= tmp/selenium-server-standalone.3.1.0.jar
GECKO_DRIVER        = tmp/geckodriver/geckodriver
BOWER_COMPONENTS	= tests/integration/pages/components
NODE_MODULES		= node_modules
SELENIUM_URL        = https://goo.gl/sLTIW7

all: test dist_build

$(SELENIUM_JAR):
	wget $(SELENIUM_URL) -O $(SELENIUM_JAR)

$(GECKO_DRIVER):
	@echo 'Fetching gecko driver'
	@mkdir -p tmp/geckodriver
	@wget https://github.com/mozilla/geckodriver/releases/download/v0.13.0/geckodriver-v0.13.0-linux64.tar.gz -O /tmp/geckodriver.tar.gz
	@tar xvzf /tmp/geckodriver.tar.gz -C tmp/geckodriver
	@$(eval export PATH=$(shell pwd)/tmp/geckodriver:$(PATH))

prepare: $(SELENIUM_JAR) $(BOWER_COMPONENTS) $(NODE_MODULES) $(GECKO_DRIVER)

$(NODE_MODULES):
	npm install

$(BOWER_COMPONENTS):
	bower install

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
	@echo 'Starting selenium...'
	@java -jar $(SELENIUM_JAR) & # >> tmp/selenium.log 2>&1 &

kill_selenium: prepare
	@echo 'Stopping selenium...'
	@ps aux | grep $(SELENIUM_JAR) | grep -v grep | awk '{ print $$2 }' | xargs kill

run_integration: normal_build
	@./node_modules/.bin/gulp features

integration: selenium run_integration kill_selenium

test: prepare lint unit integration

watch:
	gulp watch

.PHONY: test unit prepare
