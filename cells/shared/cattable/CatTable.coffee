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
      numVisibleGroups = 0
      oddEven = do->
        isEven = false
        -> (isEven = !isEven) and 'even' or 'odd'

      """
      #{R @_categoryNames, (cat,gi)=> @_catToMembers[cat].length > 0 and "
        <div class='category #{cat}'>
          <div class='header'>#{@options.categories[cat]}</div>
          <div class='members'>
          #{R @_catToMembers[cat], (member)=>"
              <div class='member #{oddEven()}'>
              #{R ({c,f} for c,f of @options.columnMap), ({c,f})->"
                <div class='column #{c}'>#{f(member)}</div>
              "}
              </div>
          "}
          </div>
        </div>
      "}
      """