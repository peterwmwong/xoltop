define ['cell!shared/page/Page','cell!shared/ComingSoonPage','cell!pages/dashboard/DashboardPage','cell!Bar'], (Page, ComingSoonPage,DashboardPage,Bar)->
  defer = (f)-> setTimeout f,0
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

  render: (R)->
    if $.browser.msie then R.cell 'IEGTFO'
    else
      defer => @loadPage @options.selectedPage
      """
      #{R.cell Bar, selectedItem:@options.selectedPage, items:(p for p of pages)}
      <div id='content'></div>
      """

  bind:
    'selectedItemChanged :parent > .Bar': (e,{item})->
      @loadPage item

  loadPage: (page)->
    content = @$ '> #content'
    content.html ''
    if p = pages[page]
      content.append(new(p.cell)(p.options or {}).el)

