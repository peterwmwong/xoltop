define ->
  Count = cell.extend
    'render <span>': (R)-> [
      R 'span.countGroup'
        if @options.red?
          R 'span.badge-red.count', @options.red
        if @options.yellow?
          R 'span.badge-yellow.count', @options.yellow
        if @options.red? or @options.yellow?
          R "span.count.badge-#{@options.gray and 'green' or 'gray'}", @options.gray
    ]
    bind: do->
      trigger = ->
        $(@el).trigger 'selected'
        false
      'click :parent > .item': trigger
      'click :parent > .countGroup > .count': trigger

  getPkgName = do->
    suiteRegex = /([^\.]*)\.([^\.]*)$/
    (name)->
      match = suiteRegex.exec(name)
      pkg: match[1]
      name: match[2]

  init: ->
    @model = @model.data

  render: (R)->
    pkgName = getPkgName @model.suitename
    [
      R '#bar',
        R '#expando'
        R 'span#suiteName.gray',
          R 'span#package', pkgName.pkg
          R 'a.name', href:'#',
            ' '+pkgName.name
    ]
