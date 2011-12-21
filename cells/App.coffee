define [
  'cell!shared/page/Page'
  'cell!shared/ComingSoonPage'
  'cell!pages/dashboard/DashboardPage'
  'cell!Bar'
], (Page,ComingSoonPage,DashboardPage,Bar)->

  pages =
    Dashboard:
      cell: DashboardPage
    Tests:
      cell: Page
      options:
        baseurl: 'pages/tests'
        sections: ['Messy','Metrics']
        selectedSection: 'Metrics'
    Stories:
      cell: ComingSoonPage

  init: ->
    @options.selectedPage ?= 'Dashboard'

  render: (_)->
    if $.browser.msie
      @require './IEGTFO', (IEGTFO)=>
        @$el
          .html('')
          .append(_ IEGTFO)
    else [
      _ Bar, selectedItem:@options.selectedPage, items:(p for p of pages)
      _ '#content',
        @getPage @options.selectedPage
    ]

  on:
    'selectedItemChanged :parent > .Bar': (e,{item})->
      @$('> #content')
        .html('')
        .append @getPage item

  getPage: (page)->
    if p = pages[page]
      (new p.cell p.options).el

