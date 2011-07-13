define [], do->
  getPropFunc = (prop)->
    (obj)->obj[prop]
  ->
    init: ->
      @_catToMembers = {}
      @_categoryNames =
        for k,v of @options.categories
          @_catToMembers[k] = []
          k

      for member in @options.members
        @_catToMembers[@options.mapMember member].push member

      @_numCols = 0
      for col,funcOrProp of cmap = @options.columnMap
        @_numCols++
        if (type = typeof funcOrProp) == 'string'
          cmap[col] = getPropFunc funcOrProp
        else if type == 'function'
          cmap[col] = funcOrProp
        else
          @_numCols--
          delete cmap[col]

      return


    render: (R)->
      numVisibleGroups=0
      oddEven = do->
        isEven = false
        -> (isEven = !isEven) and 'even' or 'odd'
      """
      <table><tbody>
        #{R @_categoryNames, (cat,gi)=>
            R (members = @_catToMembers[cat]).length != 0 and "
              #{R numVisibleGroups++ != 0 and "
                <tr class='categorySpacer'><td colspan='#{@_numCols}'> </td></tr>
              "}
              <tr class='#{oddEven()} #{cat} firstHolder'>
                <td rowspan='#{members.length+1}' class='category #{cat}'>
                  #{@options.categories[cat]}
                </td>
                <td class='categoryColumnSpacer'></td>
                #{R (c for c of @options.columnMap), -> "
                  <td class='column'></td>
                "}
              </tr>
              #{R members, (m,i)=> "
                <tr class='#{oddEven()} #{cat}'>
                    <td class='categoryColumnSpacer'>&nbsp;</td>
                    #{R ({c,f} for c,f of @options.columnMap), ({c,f})->"
                      <td class='column #{c}'>#{f(m)}</td>
                    "}
                </tr>
              "}
        "}
      </tbody></table>
      """
