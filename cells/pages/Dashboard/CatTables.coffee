define
  init: ->
    @_categoryNames = (k for k,v in @config.categories)
    @_columnNames = (k for k,v in @config.columns)

  render: (R)->
    numRenderedGroups = 0
    oddEven = do->
      isEven = false
      -> (isEven = !isEven) and 'even' or 'odd'
    """
    <table>
      <tbody>
        #{R @_categoryNames, (status,cat)->
            catMembers = @config.getMembers cat, @model
            category = @config.categories[cat]
            R catMembers?.length > 0 and "
              #{R numRenderedGroups++ > 0 and "
                <tr class='categorySpacer'><td colspan='6'> </td></tr>"}
              #{R catMembers, (c,i)-> "
                <tr class='#{R i==0 and 'category '}#{oddEven()}'>
                  #{R i==0 and "
                    <td rowspan='#{@config.columns or 0}' id='header' class='#{cat}'>
                      #{category}
                    </td>
                  " or R @_columnNames, (col)->
                     "<td id='#{col}'>#{@config.getColumn c?[col], c, @model}</td>"
                  }
                </tr>
              "}
        "}
    """

