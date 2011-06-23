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

      for col,funcOrProp of cmap = @options.columnMap
        if (type = typeof funcOrProp) == 'string'
          cmap[col] = getPropFunc funcOrProp
        else if type == 'function'
          cmap[col] = funcOrProp
        else
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
                <tr class='categorySpacer'><td colspan='6'> </td></tr>
              "}
              <tr class='#{oddEven()} #{cat}'>
                <td rowspan='#{members.length}' class='category #{cat}'>
                  #{@options.categories[cat]}
                </td>
                #{R members, (m,i)=> "
                  #{R i!=0 and "<tr class='#{oddEven()} #{cat}'>"}
                  <td class='categoryColumnSpacer'>&nbsp;</td>
                  #{R ({c,f} for c,f of @options.columnMap), ({c,f})->"
                    <td class='column #{c}'>#{f(m)}</td>
                  "}
              </tr>
                "}
        "}
      </tbody></table>
      """
