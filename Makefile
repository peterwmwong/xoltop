
#===================================================================
#--------------------------- Variables -----------------------------
#===================================================================
coffee = node_modules/.bin/coffee
stylus = node_modules/.bin/stylus
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

all: client/cells/bootstrap.js

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
client/cells/bootstrap.js: client/cells/cell.js client/cells/cell-pluginBuilder.js
	$(requirejsBuild) name=cell!App out=client/cells/bootstrap.js baseUrl=client/cells includeRequire=true

#-------------------------------------------------------------------
# Dependencies 
#------------------------------------------------------------------- 
$(stylus):
	npm install stylus

$(coffee):
	npm install coffee-script

$(express):
	npm install express

#-------------------------------------------------------------------
# TEST
#------------------------------------------------------------------- 

clean: 
	@@rm client/cells/bootstrap.*

