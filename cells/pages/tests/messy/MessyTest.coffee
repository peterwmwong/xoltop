define ->
  Count = cell.extend
    'render <span>': (R)-> [
      R 'span.countGroup',
        if @options.red?
          R 'span.badge-red.count', @options.red
        if @options.yellow?
          R 'span.badge-yellow.count', @options.yellow
        if not (@options.red? or @options.yellow?)
          R "span.badge-#{@options.gray and 'green' or 'gray'} count", @options.gray
    ]

    bind: do->
      trigger = ->
        $(@el).trigger 'selected'
        false
      'click :parent > .item': trigger
      'click :parent > .countGroup > .count': trigger

  init: ->
    @model = @model.data

  render: (R)-> [
    R '#bar',
      R '#nav',
        R Count, id: 'issues', label: 'Issues', red: @model.issuecount
      R '#expando'
      R 'span#testID.gray',
        R 'a.name', href:'#',
          @model.testname
  ]