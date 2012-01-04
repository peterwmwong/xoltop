define
  render: (R)-> [
    R 'span#count', @model.count
    if not @hideBar
      R 'span#barContainer',
        $("<div id=bar style='width:#{Math.min 100, @model.pct*100}%;'></div>")[0]
  ]
