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

In a browser, visit `http://localhost:3000/index-dev.html`.  
You should see the Xoltop dashboard with mock data.

*The server is JUST for live.js, which uses XHR to automatically reload JavaScript and CSS.*  
Xoltop does not rely on a server for mock data, *see [Mock Data loaded by JavaScript](https://github.com/peterwmwong/xoltop/tree/master/cells/data/mock)*

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


Windows
======

**Go directly to jail. Do not pass go, do not collect $200.**

It is possible, but kind of a hassle.  
Windows is currently NOT a first-class citizen of Node.js/NPM.  
BUT with the [help](https://github.com/igorzi) [of](https://github.com/HenryRawas) [Microsoft](http://blog.nodejs.org/2011/06/23/porting-node-to-windows-with-microsoft%E2%80%99s-help/) and [Rackspace](https://github.com/piscisaureus), this will change... [soon](http://groups.google.com/group/nodejs/msg/ed5b0071fa011df7).