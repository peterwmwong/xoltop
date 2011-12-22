define [
  'cell!./NodeRow'
], (NodeRow)->
  
  render: (_)-> [
    if @options.title
      _ '#titlebar', @options.title
    _ '#rows',
      _ '#headerrow',
        for text in @options.cols
          _ '.headercol', text
      _ NodeRow,
          class: 'ROOT'
          model:
            type: '_'
            expanded: true
          dataProviders: @options.dataProviders
  ]
