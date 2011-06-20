define ['data/DashboardService'], (DashboardService)->
  O = (o)->o
  render: (R,A)->
    DashboardService.getRecentTestResults @options.type, ({results})=>
      [w,h] = [125,55]
      r = Raphael 0,0, w,h
      xs = [[0...10]]
      ys = [(failures for {failures} in results)]

      lc = r.g.linechart 0,0, w,h, xs,ys, nostroke: false, symbol: "o"
      lines = lc.hoverColumn.call lc,
        ->
          @tags = r.set()
          [i,ii] = [-1,@y.length]
          while ++i < ii
            (tag = r.g.tag @x, @y[i], @values[i], 160, 10)
              .insertBefore(this)
              .attr [
                O fill: "#FFF"
                O fill: @symbols[i].attr 'fill'
              ]
            @tags.push tag
          return
        -> @tags and @tags.remove()

      lines.symbols.attr r: 3
      r.canvas.class = 'graph'
      A """
        #{R $("<div class='graphContainer'></div>").append(r.canvas)[0]}
        <div class='label'>#{@options.label}</div>
        """
