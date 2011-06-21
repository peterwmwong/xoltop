define ['data/DashboardService'], (DashboardService)->
  O = (o)->o
  passColor = '#62872C'
  failColor = '#992626'
  highlightCol = (col)->
    [color,colColor]= col.values[0] > 0 and ['#F88','#F00'] or ['#8F8','#090']
    col.attr fill: colColor, opacity: .15
    col.symbols.attr stroke: color, 'stroke-width': 2, 'stroke-opacity': 1

  unhighlightCol = (col)->
    color = col.values[0] > 0 and failColor or passColor
    col.attr opacity: 0
    col.symbols[0].attr fill:color,'stroke-opacity': 0

  render: (R,A)->
    self = this
    DashboardService.getRecentTestResults @options.type, (results)=>
      [w,h] = [125,64]
      r = Raphael 0,3, w,h
      lc = r.g.linechart 0,0, w,h,
        [[0...results.length]]
        [(failures for {testResult:{failures}} in results)]
        nostroke: false
        symbol: "o"
        colors:['#4A1A1A']

      lc.hoverColumn.call lc,
        -> # Hover IN
          highlightCol this
          if lastCol != this
            unhighlightCol lastCol
          self.$el.trigger type: 'resultHovered', column: this

        -> # Hover OUT
          unhighlightCol this
          self.$el.trigger type: 'resultUnhovered'

      for col,i in lc.columns
        col.symbols[0].attr fill: if col.values[0] == 0 then passColor else failColor
      highlightCol (lastCol = @lastCol = lc.columns[lc.columns.length-1])

      lc.symbols.attr r: 3
      r.canvas.class = 'graph'
      A """
        <table><tr>
          <td>
            #{R $("<div class='graphContainer'></div>").append(r.canvas)[0]}
          </td>
          <td class='labelRow #{R @lastCol.values[0] and "fail"}'>
            <div class='label'>#{@options.label}</div>
            <div class='count'>#{@lastCol.values[0]}</div>
          </td>
        </tr></table>
        """
  
  bind:
    'mouseout': ->
      highlightCol @lastCol

    'resultUnhovered': ->
      @$('.labelRow').toggleClass 'fail', @lastCol.values[0] > 0
      @$('.count').html "#{@lastCol.values[0]}"

    'resultHovered': (ev)->
      @$('.labelRow').toggleClass 'fail', ev.column.values[0] > 0
      @$('.count').html "#{ev.column.values[0]}"
