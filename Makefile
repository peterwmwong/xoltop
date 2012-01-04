#===================================================================
#--------------------------- Variables -----------------------------
#===================================================================
npmbin = node_modules/.bin
coffee = $(npmbin)/coffee
serve= $(npmbin)/serve
stylus = $(npmbin)/stylus
uglifyjs = $(npmbin)/uglifyjs

#-------------------------------------------------------------------
# BUILD
#------------------------------------------------------------------- 
requirejsBuild = node_modules/.bin/r.js


#===================================================================
#­--------------------------- TARGETS ------------------------------
#===================================================================
.PHONY : clean deps

#-------------------------------------------------------------------
# BUILD
#------------------------------------------------------------------- 
src/bootstrap.js: deps src/cell.js src/cell-pluginBuilder.js
	node $(requirejsBuild) \
		-o \
		paths.requireLib=../node_modules/requirejs/require \
		include=requireLib \
		name=cell!App \
		out=src/bootstrap-tmp.js \
		baseUrl=src includeRequire=true
	cat vendor/raphael.js \
			vendor/g.raphael.js \
			vendor/g.line.js \
			src/bootstrap-tmp.js | $(uglifyjs) -nc > src/bootstrap.js
	cat vendor/reset.css \
			src/bootstrap-tmp.css > src/bootstrap.css
	rm src/bootstrap-tmp.*

#-------------------------------------------------------------------
# DEV 
#------------------------------------------------------------------- 
dev-server: deps
	$(npmbin)/coffee dev-server.coffee ./

dev-stylus: deps
	find ./src ./mixins -name '*.styl' -type f | xargs $(stylus) --watch --compress

dev-coffee: deps
	find . -name '*.coffee' -type f | xargs $(coffee) -c -b --watch

#-------------------------------------------------------------------
# Dependencies 
#------------------------------------------------------------------- 
deps:
	npm install

#-------------------------------------------------------------------
# TEST
#------------------------------------------------------------------- 
clean: 
	@@rm src/bootstrap.*
