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
        if (type = typeof funcOrProp) is 'string'
          cmap[col] = getPropFunc funcOrProp
        else if type is 'function'
          cmap[col] = funcOrProp
        else
          delete cmap[col]

      return


    render: (_)->
      numVisibleGroups = 0
      isEven = false
      oddEven = -> (isEven = !isEven) and 'even' or 'odd'

      for cat, gi in @_categoryNames when @_catToMembers[cat].length > 0
        _ ".category.#{cat}",
          _ '.header', @options.categories[cat]
          _ '.members',
            for member in @_catToMembers[cat]
              _ ".member.#{oddEven()}",
                for c,f of @options.columnMap
                  _ ".column.#{c}", f(member)
