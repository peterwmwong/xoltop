define
  render: (R)->
    """
    #{R @options.title and "<div id='titlebar'>#{@options.title}</div>"}
    <div id='rows' #{@options.title and ' ' or 'style="top: 0;"'}>
      <div id='headerrow'>
        #{R @options.cols,(text)->"<span class='headercol'>#{text}</span>"}
      </div>
      #{R.cell './NodeRow',
          class: 'ROOT'
          model:
            type: '_'
            expanded: true
          dataProviders: @options.dataProviders}
    </div>
    """
