
#===================================================================
#--------------------------- Variables -----------------------------
#===================================================================
coffee = node_modules/.bin/coffee
stylus = node_modules/.bin/stylus
uglifyjs = node_modules/.bin/uglifyjs
express = node_modules/express/package.json

#-------------------------------------------------------------------
# BUILD
#------------------------------------------------------------------- 
ifneq (,$(findstring CYGWIN,$(shell uname -s)))
	requirejsBuild = ./vendor/requirejs/build/build.bat
else
	requirejsBuild = ./vendor/requirejs/build/build.sh
endif

#-------------------------------------------------------------------
# TEST
#------------------------------------------------------------------- 
ifndef TEST_BROWSER
	TEST_BROWSER := google-chrome
endif

ifndef TESTS
	TESTS := "**"
endif

ifdef TEST_DEBUG
	TEST_DEBUG_ = -d
endif


#===================================================================
#----------------------------- MACROS ------------------------------
#===================================================================


#===================================================================
#­--------------------------- TARGETS ------------------------------
#===================================================================
.PHONY : clean server

all: cells/bootstrap.js

#-------------------------------------------------------------------
# DEV 
#------------------------------------------------------------------- 
dev-stylus: $(stylus)
	find -name '*.styl' -type f | xargs $(stylus) --watch --compress

dev-mock-server: $(coffee) $(express)
	$(coffee) test/mock/data/mock-metrics-service.coffee

#-------------------------------------------------------------------
# BUILD
#------------------------------------------------------------------- 
cells/bootstrap.js: $(uglifyjs) cells/cell.js cells/cell-pluginBuilder.js
	$(requirejsBuild) name=cell!App out=cells/bootstrap-tmp.js baseUrl=cells includeRequire=true
	cat vendor/jquery.min.js cells/bootstrap-tmp.js | $(uglifyjs) > cells/bootstrap.js
	cat vendor/reset.css cells/bootstrap-tmp.css > cells/bootstrap.css
	rm cells/bootstrap-tmp.*

#-------------------------------------------------------------------
# Dependencies 
#------------------------------------------------------------------- 
$(stylus):
	npm install stylus

$(coffee):
	npm install coffee-script

$(express):
	npm install express

$(uglifyjs):
	npm install uglify-js

#-------------------------------------------------------------------
# TEST
#------------------------------------------------------------------- 

clean: 
	@@rm cells/bootstrap.*

