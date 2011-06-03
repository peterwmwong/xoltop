define
  render: -> "
    <span id='count'>#{@model.count or ''}</span>
    #{if @hideBar then "" else "
      <span id='barContainer'>
        <div id='bar' style='width:#{Math.min 100, @model.pct*100}%;'>&nbsp;</div>
      </span>
    "}
  "
