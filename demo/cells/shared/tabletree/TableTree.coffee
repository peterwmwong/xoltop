define [
  'cell!./NodeRow'
], (NodeRow)->
  
  render: (R)-> [
    if @options.title
      R '#titlebar', @options.title
    R '#rows',
      R '#headerrow',
        for text in @options.cols
          R '.headercol', text
      R NodeRow,
          class: 'ROOT'
          model:
            type: '_'
            expanded: true
          dataProviders: @options.dataProviders
  ]
