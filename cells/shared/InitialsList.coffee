define ['Services'], (S)->
  tag: '<ul>'
  render: (_)->
    for initials in @options.initials
      _ "<li class='#{S.auth.getUser()?.initials is initials and 'currentUser' or ''}'>",
        initials
