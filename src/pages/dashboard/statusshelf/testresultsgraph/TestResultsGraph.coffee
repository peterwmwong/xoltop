define [
  'Services'
  'cell!shared/loadingindicator/LoadingIndicator'
], (S,LoadingIndicator)->
  _ = cell::$R
  passColor = '#62872C'
  failColor = '#992626'
  highlightCol = (col)->
    [color,colColor]= col.values[0] > 0 and ['#F88','#F00'] or ['#8F8','#090']
    col.attr fill: colColor, opacity: .15
    col.symbols.attr stroke: color, 'stroke-width': 2, 'stroke-opacity': 1

  offsetDayMap = ['Today','Yesterday'].concat (for i in [2...7] then "#{i} days ago"), "a week ago"
  today = new Date()
  mapDate = (o)-> today.getMonth() == o.getMonth() and offsetDayMap[today.getDate() - o.getDate()]

  getDate = (d)->
    mapDate(d = new Date(d)) or "#{d.getMonth()}-#{d.getDate()}"

  unhighlightCol = (col)->
    color = col.values[0] > 0 and failColor or passColor
    col.attr opacity: 0
    col.symbols[0].attr fill:color,'stroke-opacity': 0

  render: (_)-> 

    setTimeout (=>
      S.dashboard.getRecentTestResults @options.type, (results)=>
        @$('.LoadingIndicator').trigger 'disable'
        $el = @$el
        $ = (a)=> @$ a
        @results = results

        [w,h] = [125,64]
        r = Raphael 0,3, w,h
        lc = r.g.linechart 0,0, w,h,
          [[0...results.length]]
          [(failures for {testResult:{failures}} in results)]
          nostroke: false
          symbol: "o"
          colors: ['#4A1A1A']
        
        urlPrefix = @options.urlPrefix
        lc.clickColumn ->
          window.open urlPrefix + results[@axis].testResult.runid, "_blank"

        lc.hoverColumn.call lc,
          -> # Hover IN
            highlightCol this
            unhighlightCol lastCol if lastCol != this
            $('.labelRow').toggleClass 'fail', @values[0] > 0
            $('.count').html @values[0]
            $('.when').html getDate results[@axis].testResult.datetime

          -> # Hover OUT
            unhighlightCol this
            $('.labelRow').toggleClass 'fail', lastCol.values[0] > 0
            $('.count').html lastCol.values[0]
            $('.when').html ""

        for col,i in lc.columns
          col.symbols[0].attr fill: if col.values[0] == 0 then passColor else failColor
        highlightCol (lastCol = @lastCol = lc.columns[lc.columns.length-1])

        lc.symbols.attr r: 3
        r.canvas.class = 'graph'
        @$el.append [
          _ 'table',
            _ 'tr',
              _ 'td',
                _ '.graphContainer', r.canvas
              _ "td.labelRow#{@lastCol.values[0] and '.fail' or ''}",
                _ '.label', @options.label
                _ '.count', @lastCol.values[0]
                _ '.when'
        ]
    ), 50

    [_ LoadingIndicator, enable: true]

  on:
    'mouseout': -> highlightCol @lastCol