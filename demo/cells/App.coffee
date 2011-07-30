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
    if $.browser.msie then @require './IEGTFO', (I)-> A [R I]
    else [
      R Bar,
        selectedItem:@options.selectedPage, items:(p for p of pages)
      R '#content',
        R @getPage @options.selectedPage
    ]

  bind:
    'selectedItemChanged :parent > .Bar': (e,{item})->
      @$('> #content')
        .html('')
        .append @getPage item

  getPage: (page)-> (p = pages[page]) and (new p.cell p.options).el

