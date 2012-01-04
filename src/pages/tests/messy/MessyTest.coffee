define ->
  Count = cell.extend
    tag: '<span>'
    render: (_)-> [
      _ 'span.countGroup',
        if @options.red?
          _ 'span.badge-red.count', @options.red
        if @options.yellow?
          _ 'span.badge-yellow.count', @options.yellow
        if not (@options.red? or @options.yellow?)
          _ "span.badge-#{@options.gray and 'green' or 'gray'} count", @options.gray
    ]

    on: do->
      trigger = ->
        $(@el).trigger 'selected'
        false
      'click :parent > .item': trigger
      'click :parent > .countGroup > .count': trigger

  init: ->
    @model = @model.data

  render: (_)-> [
    _ '#bar',
      _ '#nav',
        _ Count, id: 'issues', label: 'Issues', red: @model.issuecount
      _ '#expando'
      _ 'span#testID.gray',
        _ 'a.name', href:'#',
          @model.testname
  ]