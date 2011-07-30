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


    render: (o)->
      numVisibleGroups = 0
      oddEven = do->
        isEven = false
        -> (isEven = !isEven) and 'even' or 'odd'

      for cat, gi in @_categoryNames when @_catToMembers[cat].length > 0
        o ".category.#{cat}",
          o '.header', innerHTML: @options.categories[cat]
          o '.members',
            for member in @_catToMembers[cat]
              o ".member.#{oddEven()}",
                for c,f of @options.columnMap
                  o ".column.#{c}", f(member)