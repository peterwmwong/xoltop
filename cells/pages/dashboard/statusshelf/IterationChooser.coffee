$?('head')
  .append "<link href='http://fonts.googleapis.com/css?family=Nunito&v1' rel='stylesheet' type='text/css'>"

define
  render: (R)-> [
    R '.iterNum',
      R 'a.prevIter', href:'#', '<'
      R 'span.num', @options.iterationNo
      R 'a.nextIter', href:'#', '>'

    R '.iterLabel', 'ITERATION'
  ]

  bind: do->
    changeIter = (addAmt)->
      ->
        if 0 < (newIter = @options.iterationNo + addAmt)
          @options.iterationNo = newIter
          @$('.num').html @options.iterationNo
          @$el.trigger type: 'iterationNoChanged', newIterationNo: @options.iterationNo

    'click .prevIter': changeIter -1
    'click .nextIter': changeIter 1

