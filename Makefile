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
requirejsBuild = ./vendor/requirejs/r.js


#===================================================================
#­--------------------------- TARGETS ------------------------------
#===================================================================
.PHONY : clean deps

#-------------------------------------------------------------------
# BUILD
#------------------------------------------------------------------- 
cells/bootstrap.js: deps cells/cell.js cells/cell-pluginBuilder.js
	node $(requirejsBuild) \
		-o \
		paths.requireLib=../vendor/requirejs/require \
		include=requireLib \
		name=cell!App \
		out=cells/bootstrap-tmp.js \
		baseUrl=cells includeRequire=true
	cat vendor/raphael.js \
			vendor/g.raphael.js \
			vendor/g.line.js \
			cells/bootstrap-tmp.js | $(uglifyjs) -nc > cells/bootstrap.js
	cat vendor/reset.css \
			cells/bootstrap-tmp.css > cells/bootstrap.css
	rm cells/bootstrap-tmp.*

#-------------------------------------------------------------------
# DEV 
#------------------------------------------------------------------- 
dev-server: deps
	$(serve) -D -L -I

dev-stylus: deps
	find ./cells ./mixins -name '*.styl' -type f | xargs $(stylus) --watch --compress

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
	@@rm cells/bootstrap.*
