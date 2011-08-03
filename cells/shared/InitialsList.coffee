define ['Services'], (S)->
  'render <ul>': (R)->
    curUserInitials = S.auth.getUser()?.initials
    [
      for initials in @options.initials
        R 'li', class: (curUserInitials is initials and 'currentUser' or ''),
          initials
    ]