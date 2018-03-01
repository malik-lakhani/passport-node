# node modules in executable path
PATH := node_modules/.bin:$(PATH)

# OSX requires this variable exported so that PATH is also exported.
SHELL := /bin/bash

AUTOPREFIXER_BROWSERS="> 10%"

JS_SRC = $(shell find . -type f -name '*.js' ! -path './node_modules/*' ! -path './.next/*' ! -path './static/*')
JSON_SRC = $(shell find . -type f -name '*.json' ! -path './node_modules/*' ! -path './.next/*' ! -path './static/*')

.PHONY: build clean lint

build:
	@[ -d static/dist/js ] || mkdir -p static/dist/js static/dist/css static/dist/fonts
	cp node_modules/bootstrap/dist/css/bootstrap.min.css static/dist/css/bootstrap.min.css
	cp node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot static/dist/fonts/glyphicons-halflings-regular.eot
	cp node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.svg static/dist/fonts/glyphicons-halflings-regular.svg
	cp node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf static/dist/fonts/glyphicons-halflings-regular.ttf
	cp node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff static/dist/fonts/glyphicons-halflings-regular.woff
	cp node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2 static/dist/fonts/glyphicons-halflings-regular.woff2
	cp node_modules/font-awesome/css/font-awesome.min.css static/dist/css/font-awesome.min.css
	cp node_modules/font-awesome/fonts/fontawesome-webfont.eot static/dist/fonts/fontawesome-webfont.eot
	cp node_modules/font-awesome/fonts/fontawesome-webfont.svg static/dist/fonts/fontawesome-webfont.svg
	cp node_modules/font-awesome/fonts/fontawesome-webfont.ttf static/dist/fonts/fontawesome-webfont.ttf
	cp node_modules/font-awesome/fonts/fontawesome-webfont.woff static/dist/fonts/fontawesome-webfont.woff
	cp node_modules/font-awesome/fonts/fontawesome-webfont.woff2 static/dist/fonts/fontawesome-webfont.woff2
	cp node_modules/font-awesome/fonts/FontAwesome.otf static/dist/fonts/FontAwesome.otf

	minify --clean --output static/dist/css/vendor.min.css \
		static/dist/css/bootstrap.min.css \
		static/dist/css/font-awesome.min.css

	postcss -u autoprefixer --browsers $(AUTOPREFIXER_BROWSERS) \
		./static/dist/css/vendor.min.css -o ./static/dist/css/vendor.min.css

clean:
	rm -r static/dist

lint:
	jsonlint -q -c ${JSON_SRC}
	eslint ${JS_SRC} ${ESLINT_ARGS}
