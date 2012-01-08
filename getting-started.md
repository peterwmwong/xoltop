Getting Started
===============

In 6 steps, you'll have Xoltop up and running in your browser from scratch.

Linux / Mac OS X
================

## 1 - [Installing Git](http://book.git-scm.com/2_installing_git.html)

## 2 - [Installing node.js and NPM](https://github.com/joyent/node/wiki/Installation)

## 3 - Get the code

    > git clone git://github.com/peterwmwong/xoltop.git
    > cd xoltop

## 4 - Run Stylus/CoffeeScript compilers

    > make dev-stylus
    > make dev-coffee

This will compile `.styl` *to* `.css` and `.coffee` *to* `.js`.  
File changes will **automatically** be recompiled.

## 5 - Run development server

    > make dev-server

In a browser, visit `http://localhost:3000/index-dev.html?usemockdata=true`.  
You should see the Xoltop dashboard with mock data.

### Why a server?

**The development server is JUST for live.js and Chrome**. live.js uses XHR to automatically reload JavaScript and CSS, Chrome does not allow XHR over the `file://` protocol ([issue 41024](http://code.google.com/p/chromium/issues/detail?id=41024)).

### Where's the mock data coming from?
Xoltop is completely client side (JavaScript/HTML/CSS) and only communicates with a server for data (via JSONP).  
For **fast prototyping, testing and development**, data can easily be [mocked](https://github.com/peterwmwong/xoltop/tree/master/src/data/mock) and [loaded](https://github.com/peterwmwong/xoltop/blob/master/src/data/JSONPService.coffee) so *NO* server is necessary.


## 6 - Pimp your editor for Stylus and CoffeeScript

* [Vim](http://www.vim.org/) or [MacVim](http://code.google.com/p/macvim/)
  * [vim-stylus](https://github.com/wavded/vim-stylus)
  * [vim-coffee-script](https://github.com/kchmck/vim-coffee-script)
* [TextMate](http://macromates.com/)
  * [Stylus TextMate Bundle](https://github.com/LearnBoost/stylus/blob/master/docs/textmate.md)
    * The `Stylus.tmbundle` directory can be found in Xoltop here: `{Xoltop Project Directory}/node_modules/stylus/editors`
  * [CoffeeScript TextMate Bundle](https://github.com/jashkenas/coffee-script-tmbundle)
* [Sublime Text 2](http://www.sublimetext.com/2)
  * Use the TextMate bundles above.

Changing a `.styl` or `.coffee` file, the browser will **automatically** refresh or restyle.  
No need to `Alt-Tab` and `F5`. Cool, yah?

Thank you [live.js](http://livejs.com/)!


Deploying Checklist
===================

## 1 - Compile Stylus/CoffeeScript

    > make dev-stylus
    > make dev-coffee

## 2 - Rebuild bootstrap.js and bootstrap.css

    > make clean; make

## 3 - Manual Browser Test

    > make dev-server

In a browser, go to [http://localhost:3000] and spotcheck functionality hasn't regressed.

## 4 - Deploy

    > scp -r /p/xoltop root@{XPTool IP address}:/usr/local/follett/jboss-web/webapps/


Changing XPTool Service Source
==============================

Xoltop relies on XPTool RESTful services for all iteration, story, task, and test information.
Currently, JSONP is used for communications and is managed by [JSONP.coffee](https://github.com/peterwmwong/xoltop/blob/master/src/data/JSONP.coffee).
The URL of the XPTool can be configured in this file, by modifying IP/Host in the following line:

    getXPToolBaseUrl: (relPath)-> "http://172.16.0.230/xptool/#{relPath}"

