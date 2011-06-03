define ->
  Count = cell.extend
    'render <span>': (R)->
      """
      <span class='countGroup'>
        #{R @options.red? and "
          <span class='badge-red count'>#{@options.red}</span>
        "}
        #{R @options.yellow? and "
          <span class='badge-yellow count'>#{@options.yellow}</span>
        "}
        #{R not (@options.red? or @options.yellow?) and "
          <span class='badge-#{@options.gray and 'green' or 'gray'} count'>#{@options.gray}</span>
        "}
      </span>
      """
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
    """
    <div id='bar'>
      <div id='expando'></div>
      <span id='suiteName' class='gray'>
        <span id='package'>#{pkgName.pkg}</span>
        <a class='name' href="#">
          #{pkgName.name}
        </a>
      </span>
    </div>
    """
