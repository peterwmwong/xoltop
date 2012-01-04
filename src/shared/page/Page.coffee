define ['require','cell!./Nav'], (require,Nav)->
  defer = (f)-> setTimeout f,0

  init: ->
    @options.baseurl ?= ''
    @options.selectedSection ?= @options.sections[0]

  loadSection: (section)->
    @options.selectedSection = section.replace ' ','-'
    content = @$ '> #content'
    content.html ''
    require ["cell!#{@options.baseurl}/#{section.toLowerCase()}/#{section}Section"], (NewSection)=>
      if @options.selectedSection == section
        content.html ''
        content.append new NewSection().el

  render: (_)->
    defer => @loadSection @options.selectedSection
    [
      _ Nav, tabs: @options.sections, selectedTab: @options.selectedSection
      _ '#content'
    ]

  on:
    'changed :parent > .Nav': (e,{selectedTab})-> @loadSection selectedTab
