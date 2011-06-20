define ['data/DashboardService'], (DashboardService)->
  O = (o)->o
  render: (R,A)->
    self = this
    DashboardService.getRecentTestResults @options.type, ({results})=>
      [w,h] = [125,55]

      r = Raphael 0,1, w,h
      xs = [[0...10]]
      ys = [(failures for {failures} in results)]

      lc = r.g.linechart 0,0, w,h, xs,ys, nostroke: false, symbol: "o"
      lines = lc.hoverColumn.call lc,
        -> # Hover IN
          @attr
            fill: '#F00'
            opacity: .2
          @origSymbolColor = @symbols[0].attr 'fill'
          @symbols[0].attr
            fill: '#F00'
          return
        -> # Hover OUT
          @attr opacity: 0
          @symbols[0].attr
            fill: @origSymbolColor

      lines.symbols.attr r: 3
      r.canvas.class = 'graph'
      A """
        #{R $("<div class='graphContainer'></div>").append(r.canvas)[0]}
        <div class='label'>#{@options.label}</div>
        """
