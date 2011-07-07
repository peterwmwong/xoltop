define ['Services'], (S)->
  'render <ul>': (R,A)->
    curUserInitials = S.auth.getUser()?.initials
    R @options.initials, (initials,i)->
      """
      <li #{R curUserInitials == initials and "class='currentUser'"}>#{initials}</li>
      """