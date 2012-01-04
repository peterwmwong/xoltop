$?('head')
  .append "<link href='http://fonts.googleapis.com/css?family=Nunito&v1' rel='stylesheet' type='text/css'>"

define
  render: (_)-> [
    _ '.iterNum',
      _ 'a.prevIter', href:'#', '<'
      _ 'span.num', @options.iterationNo
      _ 'a.nextIter', href:'#', '>'

    _ '.iterLabel', 'ITERATION'
  ]

  on: do->
    changeIter = (addAmt)->
      ->
        if 0 < (newIter = @options.iterationNo + addAmt)
          @options.iterationNo = newIter
          @$('.num').html @options.iterationNo
          @$el.trigger type: 'iterationNoChanged', newIterationNo: @options.iterationNo

    'click .prevIter': changeIter -1
    'click .nextIter': changeIter 1

