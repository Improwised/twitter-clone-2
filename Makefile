# node modules in executable path
PATH := node_modules/.bin:$(PATH)

# OSX requires this variable exported so that PATH is also exported.
SHELL := /bin/bash

JS_SRC = $(shell find . -type f -name '*.js' ! -path './node_modules/*')
JSON_SRC = $(shell find . -type f -name '*.json' ! -path './node_modules/*')

.PHONY: lint test

lint:
	jsonlint -q -c ${JSON_SRC}
	eslint ${JS_SRC} ${ESLINT_ARGS}

<<<<<<< HEAD
test:
	PGDB_DB=testingdb mocha
=======
test: lint
>>>>>>> f52bfabe6bb09ac5ccf82c636dfcbdeb192d0c3c
