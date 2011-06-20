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

  init: ->
    @model = @model.data

  render: (R)->
    """
    <div id='bar'>
      <span id='nav'>
        #{R.cell Count,
            id: 'issues'
            label: 'Issues'
            red: @model.issuecount} 
      </span>
      <div id='expando'></div>
      <span id='testID' class='gray'>
        <a class='name' href="#">
          #{@model.testname}
        </a>
      </span>
    </div>
    """

