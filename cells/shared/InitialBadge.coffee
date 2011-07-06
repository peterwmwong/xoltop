define ['Services'], (S)->
  init: ->
    Bus.bind 'auth.userLoggedIn', ({user})=>
      @$el.html(user.initials)
          .toggleClass 'loggedIn', true
    Bus.bind 'auth.userLoggedOut', ({user})=>
      @$el.html('')
          .toggleClass 'loggedIn', false

  'render <span>': (R,A)->
    S.auth.user (user)-> "#{R user?.initials}"