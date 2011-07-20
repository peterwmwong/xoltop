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

  render: (R,A)->
    if $.browser.msie
      @require './IEGTFO', (IEGTFO)->
        A [R IEGTFO]
    else [
      R Bar,
        selectedItem:@options.selectedPage, items:(p for p of pages)
      R '#content',
        R (p = pages[@options.selectedPage]).cell, p.options
    ]

  bind:
    'selectedItemChanged :parent > .Bar': (e,{item})->
      @loadPage item

  loadPage: (page)->
    content = @$ '> #content'
    content.html ''
    if p = pages[page]
      content.append (new p.cell (p.options or {})).el

