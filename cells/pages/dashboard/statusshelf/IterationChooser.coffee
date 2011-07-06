$?('head')
  .append "<link href='http://fonts.googleapis.com/css?family=Nunito&v1' rel='stylesheet' type='text/css'>"

define
  render: ->
    """
    <div class='iterNum'>
      <a href='#' class='prevIter'>&lt;</a>
      <span class='num'>#{@options.iterationNo}</span>
      <a href='#' class='nextIter'>&gt;</a>
    </div>
    <div class='iterLabel'>ITERATION</div>
    """

  bind: do->
    changeIter = (addAmt)->
      ->
        if 0 < (newIter = @options.iterationNo + addAmt) < 238
          @options.iterationNo = newIter
          @$('.num').html @options.iterationNo
          @$el.trigger type: 'iterationNoChanged', newIterationNo: @options.iterationNo

    'click .prevIter': changeIter -1
    'click .nextIter': changeIter 1

